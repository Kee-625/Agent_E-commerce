# Tasks

- [x] Task 1: 在最前面插入图片列
  - [x] SubTask 1.1: 在「商品管理」索引 0 处 before 插入 1 列
  - [x] SubTask 1.2: A1 写入表头「商品图片」
  - [x] SubTask 1.3: 加宽 A 列至适合图片的宽度（120px）

- [x] Task 2: 校验并修正公式引用
  - [x] SubTask 2.1: 回读第 2 行与第 50 行 I/K/M/O/Q/R 的公式
  - [x] SubTask 2.2: 插入列后公式引用已自动迁移到新列（I=$E*$H、K=$E*$J、M=$L*3、O=毛利*$N、Q=净利、R=净利/售价），无需重写
  - [x] SubTask 2.3: 确认 J 平台扣点率、N 所得税率仍为 0.05

- [x] Task 3: 手动填写列上浅黄底
  - [x] SubTask 3.1: 对 B/C/D/E/F/G/H 列第 1–50 行设置背景 `#FFF2CC`
  - [x] SubTask 3.2: 对 J/L/N/P 列第 1–50 行设置背景 `#FFF2CC`

- [x] Task 4: 自动计算列上浅蓝底
  - [x] SubTask 4.1: 对 I/K/M 列第 1–50 行设置背景 `#CFE2F3`
  - [x] SubTask 4.2: 对 O/Q/R 列第 1–50 行设置背景 `#CFE2F3`

- [x] Task 5: 回读校验
  - [x] SubTask 5.1: 读 A1:R4，确认表头顺序、商品数据、费率、公式均正确
  - [x] SubTask 5.2: 抽样检查 A 列无底色、I 列（蓝）与 J 列（黄）底色不同

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3、Task 4 依赖 Task 1、Task 2
- Task 5 依赖 Task 2、Task 3、Task 4
