import React from 'react'
import style from './index.module.scss'
import dynamic from 'next/dynamic'
import {
  FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, Grid, TextField
} from '@mui/material'
import AddressResult from './AddressResult'

const PluginMapContainer = dynamic(
  () => import('../../MapContainer/PluginMap'),
  { ssr: false }
)

const PluginPanel = () => {


  return (
    <div className={style.PluginPanel}>

      <div className={style.Manipulate}>
        <div className={style.Action}>
          <div className={style.Input}>

            <FormControl sx={{ justifyContent: 'space-around' }}>
              <RadioGroup row>
                <FormControlLabel value="address" control={<Radio />}
                  label="地址" sx={{ marginRight: '15px' }}
                />
                <FormControlLabel value="parcel" control={<Radio />}
                  label="地號" sx={{ marginRight: '15px' }} disabled
                />
                <FormControlLabel value="ccis" control={<Radio />}
                  label="CCIS案件編號" sx={{ marginRight: '15px' }} disabled
                />
              </RadioGroup>
            </FormControl>

            <FormControl >
              <TextField size='small' />
            </FormControl>

          </div>
          <div className={style.Submit}>
            查詢
          </div>
        </div>
        <div className={style.Result}>
          <AddressResult />
          <AddressResult />
          <AddressResult />
          <AddressResult />

          <AddressResult />
          <AddressResult />
          <AddressResult />
          <AddressResult />
          <AddressResult />
          <AddressResult />
          <AddressResult />
          <AddressResult />
          <AddressResult />
        </div>
      </div>

      <div className={style.MapContainer}>
        <PluginMapContainer />
      </div>
    </div>
  )
}

export default PluginPanel