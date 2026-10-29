(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var axisCommon = {
    axisLine: { lineStyle: { color: rule } },
    axisTick: { show: false },
    axisLabel: { color: muted, fontSize: 11 },
    splitLine: { lineStyle: { color: rule, type: 'dashed' } }
  };

  var tooltipCommon = {
    backgroundColor: '#FFFFFF',
    borderColor: rule,
    borderWidth: 1,
    textStyle: { color: ink, fontSize: 12 },
    appendToBody: true
  };

  // --- Chart 1: GMV scale + growth ---
  var chartScale = echarts.init(document.getElementById('chart-scale'), null, { renderer: 'svg' });
  chartScale.setOption({
    animation: false,
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, tooltipCommon),
    legend: {
      top: 0,
      right: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: muted, fontSize: 11 }
    },
    grid: { left: 8, right: 8, top: 42, bottom: 8, containLabel: true },
    xAxis: Object.assign({
      type: 'category',
      data: ['美国', '印尼', '泰国', '越南', '英国'],
      axisLabel: { color: ink, fontSize: 12 }
    }, axisCommon),
    yAxis: [
      Object.assign({
        type: 'value',
        name: 'GMV（亿美元）',
        nameTextStyle: { color: muted, fontSize: 11 },
        splitNumber: 4
      }, axisCommon),
      Object.assign({
        type: 'value',
        name: '同比增速',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' },
        splitLine: { show: false }
      }, axisCommon)
    ],
    series: [
      {
        name: '2026H1 GMV',
        type: 'bar',
        barWidth: '42%',
        data: [131.9, 135.8, 58.2, 44.0, 21.4],
        itemStyle: { color: accent, borderRadius: [2, 2, 0, 0] },
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 11,
          formatter: '{c}'
        }
      },
      {
        name: '同比增速',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbolSize: 7,
        data: [139, 107, 44, 27, 114],
        itemStyle: { color: accent2 },
        lineStyle: { color: accent2, width: 2 },
        label: {
          show: true,
          position: 'top',
          color: accent2,
          fontSize: 11,
          formatter: '{c}%'
        }
      }
    ]
  });
  window.addEventListener('resize', function () { chartScale.resize(); });

  // --- Chart 2: top category share ---
  var chartCategory = echarts.init(document.getElementById('chart-category'), null, { renderer: 'svg' });
  chartCategory.setOption({
    animation: false,
    tooltip: Object.assign({
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (p) {
        return p[0].name + '<br/>' + p[0].marker + p[0].data.label + '：' + p[0].value + '%';
      }
    }, tooltipCommon),
    grid: { left: 8, right: 40, top: 20, bottom: 8, containLabel: true },
    xAxis: Object.assign({
      type: 'value',
      name: '占站点 GMV',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' }
    }, axisCommon),
    yAxis: Object.assign({
      type: 'category',
      data: ['美国', '印尼', '泰国', '越南'],
      axisLabel: { color: ink, fontSize: 12 }
    }, axisCommon),
    series: [{
      type: 'bar',
      barWidth: '46%',
      data: [
        { value: 17.1, label: '美妆个护' },
        { value: 14.5, label: '美妆个护' },
        { value: 29.0, label: '美妆个护' },
        { value: 22.0, label: '女装与内衣' }
      ],
      itemStyle: {
        color: function (params) {
          return params.dataIndex === 3 ? accent2 : accent;
        },
        borderRadius: [0, 2, 2, 0]
      },
      label: {
        show: true,
        position: 'right',
        color: muted,
        fontSize: 11,
        formatter: function (p) { return p.data.label + ' ' + p.value + '%'; }
      }
    }]
  });
  window.addEventListener('resize', function () { chartCategory.resize(); });

  // --- Chart 3: platform fee stack ---
  var chartFee = echarts.init(document.getElementById('chart-fee'), null, { renderer: 'svg' });
  chartFee.setOption({
    animation: false,
    tooltip: Object.assign({
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      valueFormatter: function (v) { return v + '%'; }
    }, tooltipCommon),
    legend: { top: 0, right: 0, itemWidth: 10, itemHeight: 10, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 8, right: 24, top: 42, bottom: 8, containLabel: true },
    xAxis: Object.assign({
      type: 'category',
      data: ['美国', '英国', '印尼', '泰国', '越南'],
      axisLabel: { color: ink, fontSize: 12 }
    }, axisCommon),
    yAxis: Object.assign({
      type: 'value',
      name: '综合费率',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' }
    }, axisCommon),
    series: [
      {
        name: '平台佣金',
        type: 'bar',
        stack: 'fee',
        barWidth: '44%',
        data: [6, 9, 8, 9.1, 14],
        itemStyle: { color: accent },
        label: {
          show: true,
          color: '#ffffff',
          fontSize: 11,
          formatter: function (p) { return p.value >= 6 ? p.value : ''; }
        }
      },
      {
        name: '交易/处理费',
        type: 'bar',
        stack: 'fee',
        data: [0, 0, 1, 3.21, 6],
        itemStyle: { color: accent2 },
        label: {
          show: true,
          color: '#ffffff',
          fontSize: 11,
          formatter: function (p) { return p.value > 0 ? p.value : ''; }
        }
      }
    ]
  });
  window.addEventListener('resize', function () { chartFee.resize(); });

  // --- Chart 4: score heatmap ---
  var dims = ['市场规模', '增速', '客单价/毛利', '费率友好', '竞争可控', '合规门槛低', '本地化容易'];
  var markets = ['美国', '印尼', '英国', '泰国', '越南'];
  var raw = [
    [5, 5, 5, 5, 2, 3, 4],
    [5, 5, 2, 3, 3, 2, 2],
    [2, 5, 3, 3, 4, 4, 4],
    [4, 3, 2, 3, 4, 3, 4],
    [3, 2, 2, 1, 3, 3, 3]
  ];
  var data = [];
  raw.forEach(function (row, y) {
    row.forEach(function (v, x) { data.push([x, y, v]); });
  });

  var chartScore = echarts.init(document.getElementById('chart-score'), null, { renderer: 'svg' });
  chartScore.setOption({
    animation: false,
    tooltip: Object.assign({
      position: 'top',
      formatter: function (p) {
        return markets[p.value[1]] + ' · ' + dims[p.value[0]] + '<br/>得分：' + p.value[2] + ' / 5';
      }
    }, tooltipCommon),
    grid: { left: 8, right: 8, top: 34, bottom: 60, containLabel: true },
    xAxis: Object.assign({
      type: 'category',
      data: dims,
      splitArea: { show: false },
      axisLabel: { color: ink, fontSize: 11, interval: 0 }
    }, axisCommon),
    yAxis: Object.assign({
      type: 'category',
      data: markets,
      splitArea: { show: false },
      axisLabel: { color: ink, fontSize: 12 }
    }, axisCommon),
    visualMap: {
      min: 1,
      max: 5,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      itemWidth: 10,
      itemHeight: 60,
      textStyle: { color: muted, fontSize: 11 },
      inRange: { color: [bg2, accent + '55', accent] },
      outOfRange: { color: 'transparent' }
    },
    series: [{
      type: 'heatmap',
      data: data,
      itemStyle: { borderColor: '#FFFFFF', borderWidth: 3 },
      label: {
        show: true,
        color: ink,
        fontSize: 12,
        formatter: function (p) { return p.value[2]; }
      },
      emphasis: { itemStyle: { shadowBlur: 6, shadowColor: 'rgba(0,0,0,0.12)' } }
    }]
  });
  window.addEventListener('resize', function () { chartScore.resize(); });
})();
