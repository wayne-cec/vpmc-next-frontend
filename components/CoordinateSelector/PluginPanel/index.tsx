import React, { createContext, useState } from 'react'
import style from './index.module.scss'
import dynamic from 'next/dynamic'
import {
  FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, Grid, TextField
} from '@mui/material'
import AddressResult from './AddressResult'
import api from '../../../api'
import { IAddressInfo } from '../../../widgets/Location/Address'

export const PluginContext = createContext<{
  latitude: number | undefined
  longitude: number | undefined,
  handlePointSelect: (longitude: number, latitude: number) => void
}>({ latitude: undefined, longitude: undefined, handlePointSelect: () => { } })

const PluginMapContainer = dynamic(
  () => import('../../MapContainer/PluginMap'),
  { ssr: false }
)

type PluginType = 'address' | 'parcel' | 'ccis'

interface IPluginPanel {
  longitude: number | undefined
  latitude: number | undefined
  handlePluginPointSelect: (longitude: number, latitude: number) => void
}

const PluginPanel = ({
  longitude,
  latitude,
  handlePluginPointSelect
}: IPluginPanel) => {
  const [pluginType, setpluginType] = useState<PluginType>('address')
  const [queryString, setqueryString] = useState<string>('')
  const [pending, setpending] = useState<boolean>(false)
  const [resultList, setresultList] = useState<IAddressInfo[]>([])
  const [selectedAddress, setselectedAddress] = useState<string>('none')
  // const [latitude, setlatitude] = useState<number | undefined>(undefined)
  // const [longitude, setlongitude] = useState<number | undefined>(undefined)

  const handleSubmit = async () => {
    setpending(true)
    const response = await api.prod.getGeoinfoFromAddr({ oAddress: queryString })
    setpending(false)
    const newAddressList: IAddressInfo[] = []
    response.AddressList.forEach((addressInfo: IAddressInfo) => {
      newAddressList.push(addressInfo)
    })
    setresultList([...newAddressList])
  }

  // const handlePointSelect = (longitude: number, latitude: number) => {
  //   setlongitude(longitude)
  //   setlatitude(latitude)
  // }

  return (
    <div className={style.PluginPanel}>

      <PluginContext.Provider value={{
        latitude: latitude,
        longitude: longitude,
        handlePointSelect: handlePluginPointSelect
      }}>
        <div className={style.Manipulate}>
          <div className={style.Action}>
            <div className={style.Input}>

              <FormControl sx={{ justifyContent: 'space-around' }}>
                <RadioGroup row>
                  <FormControlLabel value="address" control={<Radio />}
                    label="地址" sx={{ marginRight: '15px' }}
                    checked={pluginType === 'address'}
                    onClick={() => { setpluginType('address') }}
                  />
                  <FormControlLabel value="parcel" control={<Radio />}
                    label="地號" sx={{ marginRight: '15px' }}
                    checked={pluginType === 'parcel'}
                    onClick={() => { setpluginType('parcel') }} disabled
                  />
                  <FormControlLabel value="ccis" control={<Radio />}
                    label="CCIS案件編號" sx={{ marginRight: '15px' }}
                    checked={pluginType === 'ccis'}
                    onClick={() => { setpluginType('ccis') }} disabled
                  />
                </RadioGroup>
              </FormControl>

              <FormControl >
                <TextField
                  size='small'
                  label={pluginType === 'address' ? '請輸入門牌' : pluginType === 'parcel' ? '請輸入地號' : '請輸入CCIS案件編號'}
                  value={queryString}
                  onChange={(event) => {
                    setqueryString(event.target.value)
                  }}
                />
              </FormControl>

            </div>
            <div className={style.Submit} onClick={handleSubmit}>
              {
                pending
                  ? <div className={style.loader}></div>
                  : <span>查詢</span>
              }
            </div>
          </div>
          <div className={style.Result}>
            {
              resultList.length === 0 && <span>尚無查詢結果</span>
            }
            {
              resultList.map((result, index) => {
                return <AddressResult
                  key={index}
                  {...result}
                  selectedAddress={selectedAddress}
                  onClick={(value) => { setselectedAddress(value) }}
                />
              })
            }
          </div>
        </div>

        <div className={style.MapContainer}>
          <PluginMapContainer />
        </div>
      </PluginContext.Provider>
    </div >
  )
}

export default PluginPanel