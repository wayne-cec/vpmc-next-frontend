import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import style from './index.module.scss'
import { IResult, IResultStatistics } from '../../api/prod'
import { buildingTypeDecode } from '../CommiteeCard'
import ReactEcharts from 'echarts-for-react'
// import { square } from '../MapContainer/AprRegionMap'
import { EChartsOption } from 'echarts'

export interface ITabsPanel {
  displayData: {
    [key: string]: {
      [key: string]: IResult[] | IResultStatistics
    }
  }
}

const TabsPanel = (props: ITabsPanel) => {
  const [value, setValue] = React.useState('0')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant='scrollable'
          >
            {
              Object.keys(props.displayData).map((buildingType, index) => {
                return <Tab label={buildingTypeDecode[Number(buildingType)]} value={buildingType} key={index} />
              })
            }
          </TabList>
        </Box>
        {
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
                name: "??????(??????)",
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
                    return `${Math.floor(newVlaue / 10)}???${newVlaue % 10}??????`
                  } else {
                    return `${newVlaue % 10}??????`
                  }
                  
                }
              }
            }

            const meanUnitPriceOption : EChartsOption = {
              xAxis: {
                type: 'category',
                data: years
              },
              yAxis: {
                type: 'value',
                name: "??????(???/???)",
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
                name: "???"
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
                name: "????????????(???)",
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
                <p className={style.title}>??????????????????</p>
                <ReactEcharts option={meanPriceOption} />
                <p className={style.title}>??????????????????</p>
                <ReactEcharts option={meanUnitPriceOption} />
                <p className={style.title}>??????????????????</p>
                <ReactEcharts option={meanAgeOption} />
                <p className={style.title}>??????????????????</p>
                <ReactEcharts option={countOption} />
              </div>
            </TabPanel>
          })
        }
      </TabContext>
    </Box>
  )
}

export default TabsPanel
