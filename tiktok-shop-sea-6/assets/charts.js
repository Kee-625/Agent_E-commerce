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
    legend: { top: 0, right: 0, itemWidth: 10, itemHeight: 10, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 8, right: 8, top: 42, bottom: 8, containLabel: true },
    xAxis: Object.assign({
      type: 'category',
      data: ['印尼', '泰国', '菲律宾', '马来西亚', '越南', '新加坡'],
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
        data: [135.8, 58.2, 44.1, 40.6, 44.0, 5.5],
        itemStyle: { color: accent, borderRadius: [2, 2, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontSize: 11, formatter: '{c}' }
      },
      {
        name: '同比增速',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbolSize: 7,
        data: [107, 44, 86, 77, 27, 403],
        itemStyle: { color: accent2 },
        lineStyle: { color: accent2, width: 2 },
        label: {
          show: true,
          position: 'top',
          color: accent2,
          fontSize: 11,
          formatter: function (p) { return p.value > 120 ? '' : p.value + '%'; }
        }
      }
    ]
  });
  window.addEventListener('resize', function () { chartScale.resize(); });

  // --- Chart 2: top3 category share (100% stacked) ---
  var chartCategory = echarts.init(document.getElementById('chart-category'), null, { renderer: 'svg' });
  chartCategory.setOption({
    animation: false,
    tooltip: Object.assign({
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params) {
        var lines = [params[0].name];
        params.forEach(function (p) {
          if (p.value) { lines.push(p.marker + p.data.name + '：' + p.value + '%'); }
        });
        return lines.join('<br/>');
      }
    }, tooltipCommon),
    legend: { top: 0, right: 0, itemWidth: 10, itemHeight: 10, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 8, right: 20, top: 42, bottom: 8, containLabel: true },
    xAxis: Object.assign({
      type: 'value',
      name: '占本站 GMV',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' }
    }, axisCommon),
    yAxis: Object.assign({
      type: 'category',
      inverse: true,
      data: ['印尼', '泰国', '菲律宾', '马来西亚', '越南'],
      axisLabel: { color: ink, fontSize: 12 }
    }, axisCommon),
    series: [
      {
        name: '第一类目',
        type: 'bar',
        stack: 'cat',
        barWidth: '52%',
        data: [
          { value: 14.5, name: '美妆个护' },
          { value: 29.0, name: '美妆个护' },
          { value: 17.1, name: '美妆个护' },
          { value: 14.6, name: '美妆个护' },
          { value: 22.0, name: '女装与内衣' }
        ],
        itemStyle: { color: accent },
        label: {
          show: true, color: '#ffffff', fontSize: 10,
          formatter: function (p) { return p.data.name; }
        }
      },
      {
        name: '第二类目',
        type: 'bar',
        stack: 'cat',
        data: [
          { value: 9.1, name: '手机数码' },
          { value: 23.0, name: '服饰' },
          { value: 10.0, name: '女装与内衣' },
          { value: 13.1, name: '穆斯林时尚' },
          { value: 8.4, name: '手机数码' }
        ],
        itemStyle: { color: accent + 'B3' },
        label: {
          show: true, color: ink, fontSize: 10,
          formatter: function (p) { return p.data.name; }
        }
      },
      {
        name: '第三类目',
        type: 'bar',
        stack: 'cat',
        data: [
          { value: 7.9, name: '女装' },
          { value: 10.0, name: '保健' },
          { value: 8.2, name: '手机数码' },
          { value: 7.0, name: '手机数码' },
          { value: 7.9, name: '电脑办公' }
        ],
        itemStyle: { color: bg2 },
        label: {
          show: true, color: muted, fontSize: 10,
          formatter: function (p) { return p.data.name; }
        }
      }
    ]
  });
  window.addEventListener('resize', function () { chartCategory.resize(); });

  // --- Chart 3: seller-side take rate (stacked, horizontal ascending) ---
  var chartFee = echarts.init(document.getElementById('chart-fee'), null, { renderer: 'svg' });
  chartFee.setOption({
    animation: false,
    tooltip: Object.assign({
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params) {
        var lines = [params[0].name];
        params.forEach(function (p) {
          lines.push(p.marker + p.seriesName + '：' + p.value + '%');
        });
        return lines.join('<br/>');
      }
    }, tooltipCommon),
    legend: { top: 0, right: 0, itemWidth: 10, itemHeight: 10, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 8, right: 34, top: 42, bottom: 8, containLabel: true },
    xAxis: Object.assign({
      type: 'value',
      name: '综合费率',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' },
      max: 22
    }, axisCommon),
    yAxis: Object.assign({
      type: 'category',
      inverse: true,
      data: ['菲律宾', '印尼', '新加坡', '泰国', '马来西亚', '越南'],
      axisLabel: { color: ink, fontSize: 12 }
    }, axisCommon),
    series: [
      {
        name: '平台佣金',
        type: 'bar',
        stack: 'fee',
        barWidth: '50%',
        data: [6.7, 8.7, 7.08, 10.4, 11.34, 14],
        itemStyle: { color: accent },
        label: { show: true, color: '#ffffff', fontSize: 11 }
      },
      {
        name: '交易费',
        type: 'bar',
        stack: 'fee',
        data: [2.24, 0.3, 3.27, 3.21, 3.78, 6],
        itemStyle: { color: accent2 },
        label: { show: true, color: '#ffffff', fontSize: 11, formatter: '{c}%' }
      }
    ]
  });
  window.addEventListener('resize', function () { chartFee.resize(); });

  // --- Chart 4: score heatmap ---
  var dims = ['市场规模', '增速', '客单价/毛利', '费率友好', '竞争可控', '合规门槛低', '本地化容易'];
  var markets = ['印尼', '泰国', '菲律宾', '马来西亚', '新加坡', '越南'];
  var raw = [
    [5, 5, 2, 2, 3, 2, 2],
    [5, 3, 2, 3, 4, 3, 4],
    [4, 4, 2, 4, 4, 3, 4],
    [4, 4, 2, 3, 4, 4, 4],
    [1, 5, 5, 3, 4, 5, 5],
    [4, 2, 2, 1, 3, 3, 3]
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
    grid: { left: 8, right: 8, top: 34, bottom: 66, containLabel: true },
    xAxis: Object.assign({
      type: 'category',
      data: dims,
      splitArea: { show: false },
      axisLabel: { color: ink, fontSize: 11, interval: 0 }
    }, axisCommon),
    yAxis: Object.assign({
      type: 'category',
      inverse: true,
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
      label: { show: true, color: ink, fontSize: 12, formatter: function (p) { return p.value[2]; } },
      emphasis: { itemStyle: { shadowBlur: 6, shadowColor: 'rgba(0,0,0,0.12)' } }
    }]
  });
  window.addEventListener('resize', function () { chartScore.resize(); });
})();
