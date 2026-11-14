(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var baseText = { color: muted, fontSize: 12, fontFamily: style.getPropertyValue('--font').trim() };

  // --- Chart: channel structure ---
  var ch = echarts.init(document.getElementById('chart-channel'), null, { renderer: 'svg' });
  ch.setOption({
    animation: false,
    color: [accent, accent2, muted],
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c}%' },
    legend: { bottom: 0, textStyle: baseText, itemWidth: 10, itemHeight: 10 },
    series: [{
      type: 'pie',
      radius: ['48%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: true,
      itemStyle: { borderColor: '#FAF6F1', borderWidth: 2 },
      label: { show: true, formatter: '{b}\n{c}%', color: ink, fontSize: 12, fontWeight: 600 },
      labelLine: { lineStyle: { color: rule } },
      data: [
        { name: '直播', value: 54.67 },
        { name: '短视频', value: 31.49 },
        { name: '商品卡', value: 13.84 }
      ]
    }]
  });
  window.addEventListener('resize', function () { ch.resize(); });

  // --- Chart: audience age ---
  var age = echarts.init(document.getElementById('chart-age'), null, { renderer: 'svg' });
  age.setOption({
    animation: false,
    grid: { left: 8, right: 16, top: 20, bottom: 8, containLabel: true },
    tooltip: { trigger: 'axis', appendToBody: true, formatter: '{b}: {c}%' },
    xAxis: {
      type: 'value',
      axisLabel: { ...baseText, formatter: '{value}%' },
      splitLine: { lineStyle: { color: rule } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: ['18-23 岁', '24-30 岁', '31-40 岁', '41-50 岁', '50 岁以上'],
      axisLabel: baseText,
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      barWidth: '52%',
      itemStyle: { color: accent2, borderRadius: [0, 3, 3, 0] },
      label: { show: true, position: 'right', color: ink, fontSize: 12, formatter: '{c}%' },
      data: [8.01, 31.93, 33.62, 12.07, 14.36]
    }]
  });
  window.addEventListener('resize', function () { age.resize(); });

  // --- Chart: weekly trend ---
  var wk = echarts.init(document.getElementById('chart-week'), null, { renderer: 'svg' });
  wk.setOption({
    animation: false,
    grid: { left: 12, right: 24, top: 24, bottom: 8, containLabel: true },
    tooltip: { trigger: 'axis', appendToBody: true, formatter: '{b}<br/>销售额指数: {c} 百万' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['10/15-10/18', '10/19-10/25', '10/26-11/01', '11/02-11/08', '11/09-11/13'],
      axisLabel: { ...baseText, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '百万',
      nameTextStyle: baseText,
      axisLabel: baseText,
      splitLine: { lineStyle: { color: rule } },
      axisLine: { show: false }
    },
    series: [{
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: { color: accent, width: 3 },
      itemStyle: { color: accent, borderColor: '#FAF6F1', borderWidth: 2 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(178,74,43,0.22)' },
            { offset: 1, color: 'rgba(178,74,43,0.02)' }
          ]
        }
      },
      data: [53.0, 102.2, 87.8, 118.2, 106.3]
    }]
  });
  window.addEventListener('resize', function () { wk.resize(); });
})();
