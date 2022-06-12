import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import style from './index.module.scss'
import { IResult, IResultStatistics } from '../../api/prod'
import { buildingTypeDecode } from '../CommiteeCard'

export interface ITabsPanel {
  displayData: {
    [key: string]: {
      [key: string]: IResult[] | IResultStatistics
    }
  }
}

const TabsPanel = (props: ITabsPanel) => {
  const [value, setValue] = React.useState('1')

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
        {/* <TabPanel value="1"></TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel> */}
        {
          Object.keys(props.displayData).map((buildingType, index) => {
            return <TabPanel value={buildingType} key={index}>
              {buildingTypeDecode[Number(buildingType)]}
            </TabPanel>
          })
        }
      </TabContext>
    </Box>
  )
}

export default TabsPanel
