import React, { useState, useEffect, useContext } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import { IMarketCompareResult } from '../../../../api/prod'
import MarketCompareResultCard from '../../../../components/MarketCompareResultCard'
import { IGraphData } from '../../../../api/prod'
import { IResultStatistics, IResult } from '../../../../api/prod'
import ReactEcharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'
import ResultTable from './ResultTable'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import MarketCompareContext from '../MarketCompareContext'

const square = 3.305785

export interface IResultPanel {
  show: boolean
  filteredResults: IMarketCompareResult[]
  graphData: IGraphData
  onClose: () => void
}

const ResultPanel = () => {
  const marketCompareContext = useContext(MarketCompareContext)
  const [tabPage, settabPage] = useState<string>('1')

  return (
    <div className={classNames({
      [style.resultPanel]: true,
      [style.slideIn]: marketCompareContext.resultPanelShow,//marketCompareContext.filteredResults && marketCompareContext.filteredResults.length !== 0,
      [style.slideOut]: !marketCompareContext.resultPanelShow//!(marketCompareContext.filteredResults && marketCompareContext.filteredResults.length !== 0)
    })}>
      {
        marketCompareContext.filteredResults && marketCompareContext.filteredResults.length !== 0
          ?
          <>
            <div className={style.resultHeader}>
              <span className={style.resultStatus}>共有
                <span className={style.count}>{marketCompareContext.filteredResults.length}</span>
                筆實價登陸紀錄
              </span>
              {/* <span className={style.closeBtn}
                onClick={marketCompareContext.onClose}
              >✖</span> */}
            </div>

            <TabContext value={tabPage}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(event: React.SyntheticEvent, newValue: string) => {
                  settabPage(newValue)
                }}
                >
                  <Tab label="交易紀錄" value="1" />
                  <Tab label="統計圖表" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ padding: '0px' }}>
                <ResultTable data={marketCompareContext.filteredResults} />
              </TabPanel>

              <TabPanel value="2" sx={{ padding: '0px' }}>
                {
                  marketCompareContext.graphData
                    ? <div className={style.chartsGroup}>
                      {
                        Object.keys(marketCompareContext.graphData!).map((buildingType, index) => {
                          const typeData = marketCompareContext.graphData![buildingType]
                          const years = Object.keys(typeData)
                          const meanUnitPriceValues: number[] = []

                          years.forEach((year) => {
                            const yearD = typeData[year] as IResultStatistics
                            meanUnitPriceValues.push(yearD.unitPrice_MEAN)
                          })

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
                            ],
                            tooltip: {
                              trigger: 'axis',
                              formatter: function (param: any, value) {
                                const newValue = Math.round((param[0].value * square) / 1000) / 10
                                return `${newValue}萬`
                              }
                            }
                          }

                          return <div className={style.chartsContainer} key={index}>
                            <p className={style.title}>平均成交單價</p>
                            <ReactEcharts option={meanUnitPriceOption} />
                          </div>
                        })
                      }

                    </div>
                    : <></>
                }
              </TabPanel>

            </TabContext>
          </>
          : <div>
            尚未有查詢結果
          </div>
      }
    </div>
  )
}

export default ResultPanel