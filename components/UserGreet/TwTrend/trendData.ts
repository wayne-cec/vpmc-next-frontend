
const trendData: { [key: number]: { name: string, xdata: string[], ydata: number[][] } } = {
  0: {
    name: '經濟成長（yoy）',
    xdata: [
      "100_Q1",
      "100_Q2",
      "100_Q3",
      "100_Q4",
      "101_Q1",
      "101_Q2",
      "101_Q3",
      "101_Q4",
      "102_Q1",
      "102_Q2",
      "102_Q3",
      "102_Q4",
      "103_Q1",
      "103_Q2",
      "103_Q3",
      "103_Q4",
      "104_Q1",
      "104_Q2",
      "104_Q3",
      "104_Q4",
      "105_Q1",
      "105_Q2",
      "105_Q3",
      "105_Q4",
      "106_Q1",
      "106_Q2",
      "106_Q3",
      "106_Q4",
      "107_Q1",
      "107_Q2",
      "107_Q3",
      "107_Q4",
      "108_Q1",
      "108_Q2",
      "108_Q3",
      "108_Q4",
      "109_Q1",
      "109_Q2",
      "109_Q3",
      "109_Q4",
      "110_Q1",
      "110_Q2",
      "110_Q3",
      "110_Q4"
    ],
    ydata: [[
      3.67,
      3.67,
      3.67,
      3.67,
      2.22,
      2.22,
      2.22,
      2.22,
      2.48,
      2.48,
      2.48,
      2.48,
      4.69,
      4.92,
      4.90,
      4.38,
      4.80,
      1.89,
      -0.28,
      -0.20,
      -0.09,
      1.69,
      3.00,
      3.92,
      3.24,
      2.64,
      3.61,
      3.71,
      3.41,
      3.42,
      2.29,
      2.12,
      2.05,
      2.99,
      3.43,
      3.70,
      2.99,
      0.63,
      4.31,
      5.30,
      9.20,
      7.76,
      4.37,
      4.86
    ]]
  },
  1: {
    name: '中央銀行利率',
    xdata: [
      "2011-04-01",
      "2011-07-01",
      "2015-09-25",
      "2015-12-18",
      "2016-03-25",
      "2016-07-01",
      "2020-03-20"
    ],
    ydata: [[
      1.75,
      1.875,
      1.75,
      1.625,
      1.5,
      1.375,
      1.125
    ], [
      2.125,
      2.25,
      2.125,
      2,
      1.875,
      1.75,
      1.5
    ], [
      4,
      4.125,
      4,
      3.875,
      3.75,
      3.625,
      3.375
    ]]
  },
  2: {
    name: '消費者信心指數',
    xdata: [
      "100/1",
      "100/10",
      "100/11",
      "100/12",
      "100/2",
      "100/3",
      "100/4",
      "100/5",
      "100/6",
      "100/7",
      "100/8",
      "100/9",
      "101/1",
      "101/10",
      "101/11",
      "101/12",
      "101/2",
      "101/3",
      "101/4",
      "101/5",
      "101/6",
      "101/7",
      "101/8",
      "101/9",
      "102/1",
      "102/10",
      "102/11",
      "102/12",
      "102/2",
      "102/3",
      "102/4",
      "102/5",
      "102/6",
      "102/7",
      "102/8",
      "102/9",
      "103/1",
      "103/10",
      "103/11",
      "103/12",
      "103/2",
      "103/3",
      "103/4",
      "103/5",
      "103/6",
      "103/7",
      "103/8",
      "103/9",
      "104/1",
      "104/10",
      "104/11",
      "104/12",
      "104/2",
      "104/3",
      "104/4",
      "104/5",
      "104/6",
      "104/7",
      "104/8",
      "104/9",
      "105/1",
      "105/10",
      "105/11",
      "105/12",
      "105/2",
      "105/3",
      "105/4",
      "105/5",
      "105/6",
      "105/7",
      "105/8",
      "105/9",
      "106/1",
      "106/10",
      "106/11",
      "106/12",
      "106/2",
      "106/3",
      "106/4",
      "106/5",
      "106/6",
      "106/7",
      "106/8",
      "106/9",
      "107/1"
    ],
    ydata: [[
      86.78,
      85.89,
      83.66,
      85.78,
      85.4,
      85.28,
      86.84,
      86.89,
      85.58,
      84.04,
      79.88,
      77.58,
      78.55,
      79.73,
      81.26,
      78.92,
      77.61,
      76.36,
      75.08,
      75.18,
      74.35,
      72.73,
      72.12,
      71.06,
      72.82,
      75.24,
      76.01,
      77.29,
      78.25,
      75.08,
      76.08,
      75.33,
      76.5,
      78.47,
      78.43,
      78.22,
      80.83,
      82.93,
      80.96,
      83.73,
      85.59,
      87.58,
      88.17,
      83.06,
      83.16,
      82.98,
      83.41,
      86.36,
      88.23,
      89.44,
      91.13,
      92.93,
      91.64,
      90.58,
      89.58,
      86.15,
      85.32,
      84.6,
      84.2,
      81.61,
      80.89,
      82.09,
      81.34,
      80.37,
      79.82,
      78.36,
      80.18,
      79.56,
      78.66,
      78.95,
      77.71,
      77.22,
      74.35,
      77.63,
      78.12,
      78.2,
      78.11,
      77.76,
      78.19,
      79.95,
      82.2,
      83.34,
      86.16,
      86.05,
      87.69
    ]]
  },
  3: {
    name: '批發、零售及餐飲業營業額',
    xdata: [
      "110/2",
      "110/3",
      "110/4",
      "110/5",
      "110/6",
      "110/7",
      "110/8",
      "110/9",
      "110/10",
      "110/11",
      "110/12",
      "111/1"
    ],
    ydata: [[
      8093,
      10103,
      10067,
      9881,
      9873,
      10063,
      10315,
      10747,
      10205,
      10790,
      1142,
      11131
    ], [
      3142,
      3250,
      3286,
      3096,
      2664,
      3015,
      3198,
      3254,
      3730,
      3754,
      3684,
      3922
    ], [
      718,
      652,
      658,
      502,
      502,
      426,
      548,
      573,
      676,
      662,
      770,
      762
    ]]
  },
  4: {
    name: '工業生產指數',
    xdata: [
      "101/1",
      "101/2",
      "101/3",
      "101/4",
      "101/5",
      "101/6",
      "101/7",
      "101/8",
      "101/9",
      "101/10",
      "101/11",
      "101/12",
      "102/1",
      "102/2",
      "102/3",
      "102/4",
      "102/5",
      "102/6",
      "102/7",
      "102/8",
      "102/9",
      "102/10",
      "102/11",
      "102/12",
      "103/1",
      "103/2",
      "103/3",
      "103/4",
      "103/5",
      "103/6",
      "103/7",
      "103/8",
      "103/9",
      "103/10",
      "103/11",
      "103/12",
      "104/1",
      "104/2",
      "104/3",
      "104/4",
      "104/5",
      "104/6",
      "104/7",
      "104/8",
      "104/9",
      "104/10",
      "104/11",
      "104/12",
      "105/1",
      "105/2",
      "105/3",
      "105/4",
      "105/5",
      "105/6",
      "105/7",
      "105/8",
      "105/9",
      "105/10",
      "105/11",
      "105/12",
      "106/1",
      "106/2",
      "106/3",
      "106/4",
      "106/5",
      "106/6",
      "106/7",
      "106/8",
      "106/9",
      "106/10",
      "106/11",
      "106/12",
      "107/1",
      "107/2",
      "107/3",
      "107/4",
      "107/5",
      "107/6",
      "107/7",
      "107/8",
      "107/9",
      "107/10",
      "107/11",
      "107/12",
      "108/1",
      "108/2",
      "108/3",
      "108/4",
      "108/5",
      "108/6",
      "108/7",
      "108/8",
      "108/9",
      "108/10",
      "108/11",
      "108/12",
      "109/1",
      "109/2",
      "109/3",
      "109/4",
      "109/5",
      "109/6",
      "109/7",
      "109/8",
      "109/9",
      "109/10",
      "109/11",
      "109/12",
      "110/1",
      "110/2",
      "110/3",
      "110/4",
      "110/5",
      "110/6",
      "110/7",
      "110/8",
      "110/9",
      "110/10",
      "110/11",
      "110/12",
      "111/1"
    ],
    ydata: [[
      78.08,
      84.12,
      94.57,
      91.46,
      94.52,
      89.29,
      93.73,
      94.56,
      90.79,
      93.24,
      91.5,
      89.69,
      93.72,
      76.99,
      94.27,
      92.27,
      96.85,
      93.53,
      98.68,
      96.79,
      92.74,
      95.18,
      93.03,
      96.24,
      92.29,
      82.7,
      97.33,
      96.54,
      100.65,
      100.25,
      104.17,
      103.99,
      102.47,
      105.4,
      101.28,
      105,
      102.46,
      85.42,
      104.93,
      99.56,
      100.39,
      100.46,
      101.18,
      96.97,
      96.57,
      97.97,
      93.45,
      97.45,
      93.4,
      78.78,
      100.25,
      93.95,
      100.46,
      102.05,
      102.06,
      105.48,
      104.38,
      104.71,
      107.29,
      107.2,
      99.26,
      92.09,
      108.82,
      94.85,
      103.78,
      107.42,
      104.38,
      111.48,
      109.73,
      107.51,
      109.02,
      111.67,
      108.57,
      87.73,
      115.2,
      102.74,
      111.42,
      107.44,
      109.26,
      112.72,
      111.55,
      116.95,
      111.84,
      110.49,
      107.2,
      85.59,
      104.23,
      103.66,
      108.54,
      106.64,
      113.69,
      115.57,
      110.85,
      113.95,
      114.05,
      117.44,
      105.55,
      103.76,
      116.6,
      108.08,
      110.4,
      114.32,
      117.08,
      120.29,
      123.81,
      121.29,
      122.88,
      129.52,
      126.34,
      106.8,
      136.1,
      123.64,
      129.48,
      135.06,
      134.39,
      136.55,
      138.76,
      135.6,
      137.05,
      140.78,
      138.97
    ]]
  }
}

export default trendData