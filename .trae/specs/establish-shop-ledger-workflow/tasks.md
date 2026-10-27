# Tasks

- [x] Task 1: 固化台账基线并校验权限
  - [x] SubTask 1.1: 读取「商品管理」「数据登记」「营销管理」的 SheetInfo，记录表头所在行、已用区域末行
  - [x] SubTask 1.2: 用 `manage.get_privilege` 查询该文档权限，确认当前账号具备编辑权
  - [x] SubTask 1.3: 把 file_id、三个 sheet_id、表头行位置记录到本规范（已在 spec.md Impact 中固化）

- [x] Task 2: 补齐「数据登记」表头
  - [x] SubTask 2.1: 在第 1 行写入 A1:D1 = 登记日期 / 数据项 / 数值 / 备注
  - [x] SubTask 2.2: 回读 A1:D1 校验写入结果
  - 注：该表当前完全空白，写入前需用户确认字段口径

- [x] Task 3: 形成可复用执行清单
  - [x] SubTask 3.1: 将三表写入规则整理为日常执行清单（见 checklist.md）
  - [x] SubTask 3.2: 明确「先读结构 → 唯一键定位 → 最小写入 → 回读校验 → 回执」固定流程

- [x] Task 4: 端到端演练一次商品追加
  - [x] SubTask 4.1: 按规范在「商品管理」末尾追加 3 行（护腰带 / 12345678909876 / 一条装·俩条装·三条装）
  - [x] SubTask 4.2: 回读该区域并输出变更回执

# Task Dependencies
- Task 2 依赖 Task 1
- Task 4 依赖 Task 1、Task 3
- Task 3 与 Task 1 可并行
