# Tasks

- [x] Task 1: 备份并确认现状
  - [x] SubTask 1.1: 读取「数据登记」子表当前表头与已用范围，确认除第 1 行外无数据
  - [x] SubTask 1.2: 记录其余 4 个子表的表头/首行快照，用于变更后对比

- [x] Task 2: 扩展表格尺寸
  - [x] SubTask 2.1: 通过 sheet 工具将列数从 26 扩展到 44
  - [x] SubTask 2.2: 将行数从 200 扩展到 400，保证日报区（365 天）+ 月度汇总区可容纳

- [x] Task 3: 写入双层表头
  - [x] SubTask 3.1: 第 1 行写入 5 个分组标题并合并 A1:D1、E1:K1、L1:Z1、AA1:AI1、AJ1:AR1
  - [x] SubTask 3.2: 第 2 行写入 44 个字段名，核对与 spec 字段清单一致

- [x] Task 4: 写入公式列并向下填充
  - [x] SubTask 4.1: 在 C、J、K、Q、W、X、Y、Z、AL、AP 列第 3 行写入对应公式
  - [x] SubTask 4.2: 将公式批量填充至第 367 行（365 个日报行）
  - [x] SubTask 4.3: 抽查空行，确认返回空值且无 #DIV/0! / #VALUE! 报错

- [x] Task 5: 构建月度汇总区
  - [x] SubTask 5.1: 在日报区下方写入「月度汇总（2026）」标题及 12 个月份行
  - [x] SubTask 5.2: 可加总字段写入 SUMIFS（按日期区间匹配日报区）
  - [x] SubTask 5.3: 比率字段按汇总量重新计算（非平均值）

- [x] Task 6: 设置格式、校验与冻结
  - [x] SubTask 6.1: 设置日期/金额/百分比/数量格式与列宽、表头加粗底色
  - [x] SubTask 6.2: 冻结第 1–2 行及 A、B 列
  - [x] SubTask 6.3: B 列「数据类型」下拉校验（日报/月汇总）
  - [x] SubTask 6.4: X 列净利为负的条件格式标红

- [x] Task 7: 回读验证并确认未影响其他子表
  - [x] SubTask 7.1: 回读表头、公式、样例区，核对 spec 要求
  - [x] SubTask 7.2: 对比其余 4 个子表快照，确认无改动

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 2
- Task 4 依赖 Task 3
- Task 5 依赖 Task 4
- Task 6 依赖 Task 3（可与 Task 4/5 并行）
- Task 7 依赖 Task 3、4、5、6
