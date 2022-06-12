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

            const meanPriceOption = {
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
                    return newVlaue
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
              ]
            }

            const meanUnitPriceOption = {
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
                    return newVlaue
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

            const meanAgeOption = {
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

            const countOption = {
              xAxis: {
                type: 'category',
                data: years
              },
              yAxis: {
                type: 'value',
                name: "交易數量(千)",
                axisLabel: {
                  formatter: (function (value: string) {
                    return Number(value) / 1000
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
        }
      </TabContext>
    </Box>
  )
}

export default TabsPanel
