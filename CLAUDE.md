# 代码风格
- 使用 ES 模块（`import`/`export`）语法，而不是 CommonJS（`require`）
- 尽可能解构导入（例如 import { foo } from 'bar'）

# 工作流
- 完成一系列代码更改后，务必运行类型检查
- 出于性能考虑，优先运行单个测试，而不是整个测试套件