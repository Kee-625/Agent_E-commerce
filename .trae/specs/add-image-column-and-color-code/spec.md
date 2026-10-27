# 商品管理表头图片列与颜色分区 Spec

## Why
「商品管理」现在有 17 列，手动填写列与自动计算列混在一起，视觉上无法区分“哪些要我填、哪些不用管”，容易误填或漏填；同时缺少商品图片位，看图找货不方便。

## What Changes
- 在「商品管理」最前面插入 1 列，A 列作为商品图片位，其余 17 列整体右移为 B:R
- A1 写入表头「商品图片」，并加宽 A 列以适配图片显示
- 插入列后校验并修正所有公式引用（列号整体右移一位）
- 手动填写列统一浅黄底 `#FFF2CC`，自动计算列统一浅蓝底 `#CFE2F3`，覆盖第 1 行表头 + 第 2–50 行数据区
- A 列（图片列）不上底色，避免影响图片显示

**BREAKING**：列位置变化——原 A:C 变为 B:D，原 D:Q 变为 E:R。外部若按列字母引用需同步更新。

## Impact
- Affected specs: `add-sku-cost-profit-columns`（列结构右移）、`establish-shop-ledger-workflow`（商品管理唯一键列由 A:C 变为 B:D）
- Affected code: 无业务代码；使用腾讯文档 sheet-mcp（insert_dimension / set_cell_style / set_range_value / set_dimension_size）
- 涉及资源：文档 file_id `HGHIXNuwfGoa`，子表 `商品管理` sheet_id `BB08J2`

## ADDED Requirements

### Requirement: 最前列图片位
「商品管理」SHALL 在 A 列提供商品图片位。

- A1 表头 SHALL 为「商品图片」
- A 列 SHALL 加宽至适合浏览缩略图的宽度
- A 列 SHALL 不设置底色，避免干扰图片观感

#### Scenario: 查看表头
- **WHEN** 用户打开「商品管理」
- **THEN** 第一列显示「商品图片」，且宽度明显大于其他列

### Requirement: 插入列后的公式迁移
插入 A 列导致原有列整体右移一位，所有公式 SHALL 按新列位置生效。

| 新列 | 字段 | 公式（第 r 行） |
|---|---|---|
| I | 达人佣金 | `=IF($E{r}="","",$E{r}*$H{r})` |
| K | 平台扣点 | `=IF($E{r}="","",$E{r}*$J{r})` |
| M | 退货成本 | `=IF($E{r}="","",$L{r}*3)` |
| O | 所得税 | `=IF($E{r}="","",($E{r}-$F{r}-$G{r}-$I{r}-$K{r}-$M{r}-$P{r})*$N{r})` |
| Q | 单件净利 | `=IF($E{r}="","",$E{r}-$F{r}-$G{r}-$I{r}-$K{r}-$M{r}-$P{r}-$O{r})` |
| R | 净利率 | `=IF($E{r}="","",IFERROR($Q{r}/$E{r},0))` |

插入后 SHALL 回读公式；若引用仍指向旧列（如 `$D{r}`），SHALL 按上表重写。

#### Scenario: 插入后检查
- **WHEN** A 列插入完成
- **THEN** 第 2–50 行的 I/K/M/O/Q/R 公式均引用 E（售价）、H（佣金率）、J（扣点率）、L（退货率）、N（所得税率）、P（其他成本）等新列位置

### Requirement: 颜色分区
表头与数据区 SHALL 按“填 / 不填”分成两种底色，覆盖第 1 行至第 50 行。

- 手动填写列 SHALL 为浅黄 `#FFF2CC`：B 产品简称、C 产品ID、D SKU名称、E 最终售卖价、F 商品成本、G 运费险、H 达人佣金率、J 平台扣点率、L 退货率、N 所得税率、P 其他成本
- 自动计算列 SHALL 为浅蓝 `#CFE2F3`：I 达人佣金、K 平台扣点、M 退货成本、O 所得税、Q 单件净利、R 净利率
- 平台扣点率与所得税率虽已预置 0.05，仍属可改参数，SHALL 归入手动填写色
- A 列图片位 SHALL 保持无底色

#### Scenario: 识别该填哪列
- **WHEN** 用户新增一个 SKU
- **THEN** 只需往黄色列填数，蓝色列自动出结果

### Requirement: 既有数据与参数保留
插入列 SHALL 不丢失任何已有内容：B:D 三行商品数据、J/N 两列的 0.05 费率、I/K/M/O/Q/R 的公式均保留。

#### Scenario: 插入后核对
- **WHEN** 插入列与着色完成
- **THEN** 第 2–4 行的产品简称、产品ID、SKU名称完整，J/N 仍为 0.05

## MODIFIED Requirements
### Requirement: 成本利润列结构
列结构由 A:Q 调整为 A:R：新增 A 商品图片，原 A 产品简称→B、B 产品ID→C、C SKU名称→D、D 最终售卖价→E、E 商品成本→F、F 运费险→G、G 达人佣金率→H、H 达人佣金→I、I 平台扣点率→J、J 平台扣点→K、K 退货率→L、L 退货成本→M、M 所得税率→N、N 所得税→O、O 其他成本→P、P 单件净利→Q、Q 净利率→R。

## REMOVED Requirements
无。
