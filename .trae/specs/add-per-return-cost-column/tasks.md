# Tasks

- [x] Task 1: 插入单次退货成本列
  - [x] SubTask 1.1: 在「商品管理」索引 12（L 列之后、原退货成本之前）before 插入 1 列
  - [x] SubTask 1.2: M 列表头写入「单次退货成本」（注：用户自行在第 1 行加了颜色说明，表头实际位于第 2 行）

- [x] Task 2: 填写护腰带单次退货成本
  - [x] SubTask 2.1: 第 3–5 行 M 列写入 3

- [x] Task 3: 改写退货成本公式
  - [x] SubTask 3.1: 第 3–51 行 N 列写入 `=IF($E{r}="","",$L{r}*$M{r})`
  - [x] SubTask 3.2: 校验 P 所得税、R 单件净利、S 净利率公式已随列偏移指向正确列（N=退货成本、Q=其他成本、O=所得税率）
  - [x] SubTask 3.3: 偏移正确，无需重写 P/R/S

- [x] Task 4: 同步颜色分区
  - [x] SubTask 4.1: M 列第 2–51 行设浅黄 `#FFF2CC`
  - [x] SubTask 4.2: 确认 N 列第 2–51 行仍为浅蓝 `#CFE2F3`

- [x] Task 5: 回读校验
  - [x] SubTask 5.1: 读 A1:S5，确认表头顺序与第 3 行数值（M=3、退货成本 1.5、所得税 0.1925、净利 3.6575、净利率 17.42%）
  - [x] SubTask 5.2: 确认第 4–5 行商品信息、M=3、J/O 费率完整

# Task Dependencies
- Task 2、Task 3 依赖 Task 1
- Task 4 依赖 Task 1
- Task 5 依赖 Task 2、Task 3、Task 4
