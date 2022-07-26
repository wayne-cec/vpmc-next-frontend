import React, { useContext, useState, useEffect } from 'react'
import style from './index.module.scss'
import { widgetContext } from '../../WidgetExpand'
import { TextField, Grid } from '@mui/material'
import api from '../../../api'
import classNames from 'classnames'
import AddressResult, { AddressPointLayer } from './AddressResult'

export interface IAddressInfo {
  FULL_ADDR: string,
  X: number,
  Y: number
}

const Address = () => {
  const { map } = useContext(widgetContext)
  const [address, setaddress] = useState<string>('')
  const [pending, setpending] = useState<boolean>(false)
  const [selectedAddress, setselectedAddress] = useState<string>('none')
  const [addressList, setaddressList] = useState<IAddressInfo[]>([])

  const handleSubmit = async () => {
    setpending(true)
    const response = await api.prod.getGeoinfoFromAddr({ oAddress: address })
    setpending(false)
    const newAddressList: IAddressInfo[] = []
    response.AddressList.forEach((addressInfo: IAddressInfo) => {
      newAddressList.push(addressInfo)
    })
    setaddressList([...newAddressList])
  }

  useEffect(() => {
    return () => {
      if (!map) return
      map.remove(AddressPointLayer)
      setselectedAddress('none')
    }
  }, [])


  return (
    <div className={style.addressQuery}>

      <Grid container spacing={0}>
        <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px' }}>
          <TextField
            size='small'
            label='請輸入門牌'
            onChange={(event) => {
              setaddress(event.target.value)
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <div className={classNames({
            [style.queryBtn]: true,
            [style.loading]: pending
          })}
            onClick={() => {
              if (!pending) handleSubmit()
            }}
          >
            {
              pending
                ? <div className={style.loader}></div>
                : <span>查詢</span>
            }
          </div>
        </Grid>
      </Grid>

      {
        addressList.length === 0
          ? null
          : <div className={style.addressList}>
            {
              addressList.map((addressInfo, index) => {
                return <AddressResult
                  key={index}
                  {...addressInfo}
                  selectedAddress={selectedAddress}
                  onClick={(value) => { setselectedAddress(value) }}
                />
              })
            }
          </div>
      }

    </div>
  )
}

export default Address
