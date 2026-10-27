# 表头配色替换 Spec

## Why
当前浅黄 `#FFF2CC` + 浅蓝 `#CFE2F3` 饱和度偏高，长时间查看视觉疲劳。换成一降低饱和的莫兰迪灰调，保持“该填 / 不用填”的区分度，同时更耐看。

## What Changes
- 手动填写列底色由 `#FFF2CC` 改为 `#F5F0EA`（米白）
- 自动计算列底色由 `#CFE2F3` 改为 `#E8EDF2`（雾蓝灰）
- 覆盖范围不变：第 2–51 行（表头 + 数据区）
- 第 1 行的颜色说明文字同步改为新配色描述
- 不改动任何数值、公式与列结构

**BREAKING**：无。

## Impact
- Affected specs: `add-image-column-and-color-code`（颜色分区）、`add-per-return-cost-column`（M 列底色）
- Affected code: 无业务代码；使用腾讯文档 sheet-mcp `set_cell_style`
- 涉及资源：文档 file_id `HGHIXNuwfGoa`，子表 `商品管理` sheet_id `BB08J2`

## ADDED Requirements

### Requirement: 新配色分区
「商品管理」的列底色 SHALL 替换为以下配色，范围仍为第 2–51 行：

- 手动填写列 SHALL 为 `#F5F0EA`：B 产品简称、C 产品ID、D SKU名称、E 最终售卖价、F 商品成本、G 运费险、H 达人佣金率、J 平台扣点率、L 退货率、M 单次退货成本、O 所得税率、Q 其他成本
- 自动计算列 SHALL 为 `#E8EDF2`：I 达人佣金、K 平台扣点、N 退货成本、P 所得税、R 单件净利、S 净利率
- A 列商品图片与第 1 行说明行 SHALL 保持原样

#### Scenario: 查看配色
- **WHEN** 用户打开「商品管理」
- **THEN** 手填列为米白、自动列为雾蓝灰，两者仍可区分且不刺眼

### Requirement: 说明文字同步
第 1 行 A 列的颜色说明 SHALL 更新为新配色描述，避免与实际颜色不符。

#### Scenario: 对照图例
- **WHEN** 用户看第 1 行说明
- **THEN** 文字描述的颜色与列底色一致

### Requirement: 数据与公式不变
换色 SHALL 只影响单元格背景色，不改变任何值、公式、边框与列宽。

#### Scenario: 换色后核对
- **WHEN** 配色替换完成
- **THEN** 第 3 行净利仍为 3.6575，N 列仍为 `退货率 × 单次退货成本`

## MODIFIED Requirements
### Requirement: 颜色分区
原 `#FFF2CC` / `#CFE2F3` 的组合被替换为 `#F5F0EA` / `#E8EDF2`，列与行的归属规则保持不变。

## REMOVED Requirements
无。
