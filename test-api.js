// Simple test script for feedback API
const testFeedback = {
  usage_purpose: "Get multiple words for offline charades game",
  primary_scenario: "family_home",
  word_count_preference: "5-10 words for multiple rounds",
  missing_features: "Timer function would be great",
  user_type: "parent",
  satisfaction: "4",
  improvement_suggestions: "Add difficulty levels",
  contact_email: "test@example.com"
};

async function testAPI() {
  try {
    console.log('Testing feedback API...');
    
    const response = await fetch('http://localhost:8788/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testFeedback)
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', result);

    if (result.success) {
      console.log('✅ API test successful!');
    } else {
      console.log('❌ API test failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

// Run test if this file is executed directly
if (typeof window === 'undefined') {
  testAPI();
}