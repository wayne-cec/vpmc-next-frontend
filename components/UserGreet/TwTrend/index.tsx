import React, { useState } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import {
  Tooltip, Dialog, DialogTitle,
  DialogContent, Button, DialogActions, Tab, Box
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import trendData from './trendData'
import ReactEcharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'

const economicGrowOption: EChartsOption = {
  xAxis: {
    type: 'category',
    data: trendData[0].xdata
  },
  yAxis: {
    type: 'value',
    name: "",
    axisLabel: {
      formatter: (function (value: string) {
        return value
      }),
      align: 'center'
    }
  },
  series: [
    {
      data: trendData[0].ydata[0],
      type: 'line',
      smooth: true
    }
  ],
  tooltip: {
    trigger: 'axis',
    formatter: function (param: any, value) {
      return value
    }
  }
}

const ratioOption: EChartsOption = {
  xAxis: {
    type: 'category',
    data: trendData[1].xdata
  },
  yAxis: {
    type: 'value',
    name: "",
    axisLabel: {
      formatter: (function (value: string) {
        return value
      }),
      align: 'center'
    }
  },
  series: [
    {
      data: trendData[1].ydata[0],
      type: 'line',
      smooth: true
    }
  ],
  tooltip: {
    trigger: 'axis',
    formatter: function (param: any, value) {
      return value
    }
  }
}

const confidenceOption: EChartsOption = {
  xAxis: {
    type: 'category',
    data: trendData[2].xdata
  },
  yAxis: {
    type: 'value',
    name: "",
    axisLabel: {
      formatter: (function (value: string) {
        return value
      }),
      align: 'center'
    }
  },
  series: [
    {
      data: trendData[2].ydata[0],
      type: 'line',
      smooth: true
    }
  ],
  tooltip: {
    trigger: 'axis',
    formatter: function (param: any, value) {
      return value
    }
  }
}

const salesOption: EChartsOption = {
  xAxis: {
    type: 'category',
    data: trendData[3].xdata
  },
  yAxis: {
    type: 'value',
    name: "",
    axisLabel: {
      formatter: (function (value: string) {
        return value
      }),
      align: 'center'
    }
  },
  series: [
    {
      name: '批發(億)',
      data: trendData[3].ydata[0],
      type: 'line',
      smooth: true
    },
    {
      name: '零售(億)',
      data: trendData[3].ydata[1],
      type: 'line',
      smooth: true
    },
    {
      name: '餐飲業(億)',
      data: trendData[3].ydata[2],
      type: 'line',
      smooth: true
    }
  ],
  tooltip: {
    trigger: 'axis'
  }
}

const industryOption: EChartsOption = {
  xAxis: {
    type: 'category',
    data: trendData[4].xdata
  },
  yAxis: {
    type: 'value',
    name: "",
    axisLabel: {
      formatter: (function (value: string) {
        return value
      }),
      align: 'center'
    }
  },
  series: [
    {
      data: trendData[4].ydata[0],
      type: 'line',
      smooth: true
    }
  ],
  tooltip: {
    trigger: 'axis'
  }
}

const TwTrend = () => {
  const [value, setValue] = useState('0')
  const [twStatisticHover, settwStatisticHover] = useState<boolean>(false)
  const [twStatisticDialogOpen, settwStatisticDialogOpen] = useState<boolean>(false)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <Tooltip title='臺灣總經概覽'>
        <div className={classNames({
          [style.lawBtn]: true
        })}
          onMouseOver={() => { settwStatisticHover(true) }}
          onMouseLeave={() => { settwStatisticHover(false) }}
          onClick={() => { settwStatisticDialogOpen(true) }}
        >
          <Image src={twStatisticHover ? '/law/trend-hover.png' : '/law/trend.png'} width='32px' height='32px' />
        </div>
      </Tooltip>

      <Dialog
        open={twStatisticDialogOpen}
        onClose={() => { settwStatisticDialogOpen(false) }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"
        >臺灣總經概覽</DialogTitle>

        <DialogContent sx={{ width: '900px' }}>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant='scrollable'
              >
                <Tab label={'經濟成長（yoy）'} value={'0'} />
                <Tab label={'中央銀行利率'} value={'1'} />
                <Tab label={'消費者信心指數'} value={'2'} />
                <Tab label={'批發、零售及餐飲業營業額'} value={'3'} />
                <Tab label={'工業生產指數'} value={'4'} />
              </TabList>
            </Box>

            <TabPanel
              value={'0'}
            >
              <ReactEcharts option={economicGrowOption} />
            </TabPanel>

            <TabPanel
              value={'1'}
            >
              <ReactEcharts option={ratioOption} />
            </TabPanel>

            <TabPanel
              value={'2'}
            >
              <ReactEcharts option={confidenceOption} />
            </TabPanel>

            <TabPanel
              value={'3'}
            >
              <ReactEcharts option={salesOption} />
            </TabPanel>

            <TabPanel
              value={'4'}
            >
              <ReactEcharts option={industryOption} />
            </TabPanel>

            {/* {
              Object.keys(props.displayData).map((buildingType, index) => {
                const typeData = props.displayData[buildingType]
                const years = Object.keys(typeData)
                const meanPriceValues: number[] = []
                const meanUnitPriceValues: number[] = []
                const meanAgeValues: number[] = []
                const countValues: number[] = []

                years.forEach((year) => {
                  const yearD = typeData[year] as IResultStatistics
                  meanPriceValues.push(yearD.priceWithoutParking_MEAN)
                  meanUnitPriceValues.push(yearD.unitPrice_MEAN)
                  meanAgeValues.push(yearD.age_MEAN)
                  countValues.push(yearD.count)
                })

                const meanPriceOption: EChartsOption = {
                  xAxis: {
                    type: 'category',
                    data: years
                  },
                  yAxis: {
                    type: 'value',
                    name: "單位(百萬)",
                    axisLabel: {
                      formatter: (function (value: string) {
                        const newVlaue = Math.round(Number(value) / 1000000)
                        return newVlaue.toString()
                      }),
                      align: 'center'
                    }
                  },
                  series: [
                    {
                      data: meanPriceValues,
                      type: 'line',
                      smooth: true
                    }
                  ],
                  tooltip: {
                    trigger: 'axis',
                    formatter: function (param: any, value) {
                      // console.log(param[0].value)
                      const newVlaue = Math.round(Number(param[0].value) / 1000000)
                      if (Math.floor(newVlaue / 10) !== 0) {
                        return `${Math.floor(newVlaue / 10)}千${newVlaue % 10}百萬`
                      } else {
                        return `${newVlaue % 10}百萬`
                      }

                    }
                  }
                }

                const meanUnitPriceOption: EChartsOption = {
                  xAxis: {
                    type: 'category',
                    data: years
                  },
                  yAxis: {
                    type: 'value',
                    name: "單位(萬/坪)",
                    axisLabel: {
                      formatter: (function (value: string) {
                        const newVlaue = Math.round(Math.round(Number(value) * 3.305785 / 1000) / 10)
                        return newVlaue.toString()
                      }),
                      align: 'center'
                    }
                  },
                  series: [
                    {
                      data: meanUnitPriceValues,
                      type: 'line',
                      smooth: true
                    }
                  ]
                }

                const meanAgeOption: EChartsOption = {
                  xAxis: {
                    type: 'category',
                    data: years
                  },
                  yAxis: {
                    type: 'value',
                    name: "年"
                  },
                  series: [
                    {
                      data: meanAgeValues,
                      type: 'line',
                      smooth: true
                    }
                  ]
                }

                const countOption: EChartsOption = {
                  xAxis: {
                    type: 'category',
                    data: years
                  },
                  yAxis: {
                    type: 'value',
                    name: "交易數量(千)",
                    axisLabel: {
                      formatter: (function (value: string) {
                        return (Number(value) / 1000).toString()
                      }),
                      align: 'center'
                    }
                  },
                  series: [
                    {
                      data: countValues,
                      type: 'line',
                      smooth: true
                    }
                  ]
                }

                return <TabPanel
                  className={style.containerWrap}
                  value={buildingType}
                  key={index}
                >
                  <div className={style.chartsContainer}>
                    <p className={style.title}>平均成交價格</p>
                    <ReactEcharts option={meanPriceOption} />
                    <p className={style.title}>平均成交單價</p>
                    <ReactEcharts option={meanUnitPriceOption} />
                    <p className={style.title}>平均成交屋齡</p>
                    <ReactEcharts option={meanAgeOption} />
                    <p className={style.title}>平均成交數量</p>
                    <ReactEcharts option={countOption} />
                  </div>
                </TabPanel>
              })
            } */}
          </TabContext>

        </DialogContent>

        <DialogActions>
          <Button onClick={() => { settwStatisticDialogOpen(false) }}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TwTrend