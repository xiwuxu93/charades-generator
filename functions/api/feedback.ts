// Cloudflare Pages Functions API for feedback collection
export interface FeedbackSubmission {
  id: string;
  timestamp: string;
  usage_purpose: string;
  primary_scenario: string;
  word_count_preference: string;
  missing_features: string;
  user_type: string;
  satisfaction: string;
  improvement_suggestions: string;
  contact_email: string;
  user_agent: string;
  ip_address: string;
}

// Cloudflare Pages Environment interface
interface Env {
  FEEDBACK_KV: KVNamespace;
}

// 验证必填字段
function validateFeedback(data: Record<string, unknown>): string[] {
  const errors: string[] = [];
  
  if (!data.usage_purpose || typeof data.usage_purpose !== 'string' || data.usage_purpose.trim() === '') {
    errors.push('Usage purpose is required');
  }
  
  if (!data.primary_scenario || typeof data.primary_scenario !== 'string' || data.primary_scenario.trim() === '') {
    errors.push('Primary scenario is required');
  }
  
  if (!data.word_count_preference || typeof data.word_count_preference !== 'string' || data.word_count_preference.trim() === '') {
    errors.push('Word count preference is required');
  }
  
  // 验证邮箱格式（如果提供了邮箱）
  if (data.contact_email && typeof data.contact_email === 'string' && data.contact_email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contact_email)) {
      errors.push('Invalid email format');
    }
  }
  
  return errors;
}

// POST请求处理 - 提交反馈
export async function onRequestPost(context: EventContext<Env, any, any>): Promise<Response> {
  try {
    const { request, env } = context;
    
    // 解析请求体
    const body = await request.json() as Record<string, unknown>;
    
    // 验证数据
    const validationErrors = validateFeedback(body);
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Validation failed', 
          details: validationErrors 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 创建反馈记录
    const feedback: FeedbackSubmission = {
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      usage_purpose: String(body.usage_purpose || ''),
      primary_scenario: String(body.primary_scenario || ''),
      word_count_preference: String(body.word_count_preference || ''),
      missing_features: String(body.missing_features || ''),
      user_type: String(body.user_type || ''),
      satisfaction: String(body.satisfaction || ''),
      improvement_suggestions: String(body.improvement_suggestions || ''),
      contact_email: String(body.contact_email || ''),
      user_agent: request.headers.get('user-agent') || '',
      ip_address: request.headers.get('cf-connecting-ip') || 
                  request.headers.get('x-forwarded-for') || 
                  'unknown'
    };
    
    // 存储到KV
    await env.FEEDBACK_KV.put(feedback.id, JSON.stringify(feedback));
    
    // 同时存储到日期索引中用于管理
    const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const dailyKey = `daily_${dateStr}`;
    
    try {
      // 获取当日已有的反馈列表
      const existingDaily = await env.FEEDBACK_KV.get(dailyKey);
      let dailyIds = existingDaily ? JSON.parse(existingDaily) : [];
      dailyIds.push(feedback.id);
      
      // 更新日期索引（保留最近30天）
      if (dailyIds.length > 1000) { // 防止单日数据过大
        dailyIds = dailyIds.slice(-1000);
      }
      
      await env.FEEDBACK_KV.put(dailyKey, JSON.stringify(dailyIds));
    } catch (indexError) {
      // 索引更新失败不应影响主要功能
      console.error('Failed to update daily index:', indexError);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Feedback submitted successfully',
        id: feedback.id
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    console.error('Error processing feedback:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        details: 'Failed to process feedback submission'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// GET请求处理 - 获取反馈统计（管理用途）
export async function onRequestGet(context: EventContext<Env, any, any>): Promise<Response> {
  try {
    const { env } = context;
    
    // 获取最近7天的统计
    const recentStats = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const dailyKey = `daily_${dateStr}`;
      
      try {
        const dailyData = await env.FEEDBACK_KV.get(dailyKey);
        const count = dailyData ? JSON.parse(dailyData).length : 0;
        recentStats.push({
          date: dateStr,
          count: count
        });
      } catch {
        recentStats.push({
          date: dateStr,
          count: 0
        });
      }
    }
    
    const totalCount = recentStats.reduce((sum, day) => sum + day.count, 0);
    
    return new Response(
      JSON.stringify({
        success: true,
        totalRecentFeedbacks: totalCount,
        dailyStats: recentStats
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    console.error('Error fetching feedback stats:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to fetch feedback stats' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// OPTIONS请求处理 - CORS支持
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}