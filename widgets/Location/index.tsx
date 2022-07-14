import React, { useContext, useEffect, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import { widgetContext } from '../WidgetExpand'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { ICountyData } from '../../api/prod'
import { ITownData } from '../../api/prod'
import County from './County'
import Address from './Address'
import api from '../../api'

const Location = () => {
  const { show } = useContext(widgetContext)
  const [tabPage, settabPage] = useState<string>('1')

  useEffect(() => {
    if (!show) {
      settabPage('1')
    }
  }, [show])

  return (
    <div className={classNames({
      [style.locationWidget]: true,
      [style.show]: show,
      [style.hide]: !show
    })}>

      <TabContext value={tabPage}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(event: React.SyntheticEvent, newValue: string) => {
            settabPage(newValue)
          }}
          >
            <Tab label="行政區" value="1" />
            <Tab label="門牌" value="2" />
            <Tab label="地號" value="3" disabled />
            <Tab label="座標" value="4" disabled />
          </TabList>
        </Box>

        <TabPanel value="1" sx={{ padding: '0px' }}>
          <County />
        </TabPanel>

        <TabPanel value="2" sx={{ padding: '0px' }}>
          <Address />
        </TabPanel>

        <TabPanel value="3" sx={{ padding: '0px' }}>
          <p>地號</p>
        </TabPanel>

        <TabPanel value="4" sx={{ padding: '0px' }}>
          <p>座標</p>
        </TabPanel>

      </TabContext>

    </div>
  )
}

export default Location
