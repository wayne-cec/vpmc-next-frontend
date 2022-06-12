import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import style from './index.module.scss'
import { IResult, IResultStatistics } from '../../api/prod'
import { buildingTypeDecode } from '../CommiteeCard'
import { ECharts } from 'echarts'
import ReactEcharts from 'echarts-for-react'

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

  // useEffect(() => {
  //   ECharts.
  // }, [])

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
            const option = {
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
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
                <ReactEcharts option={option} />
                <ReactEcharts option={option} />
                <ReactEcharts option={option} />
              </div>
            </TabPanel>
          })
        }
      </TabContext>
    </Box>
  )
}

export default TabsPanel
