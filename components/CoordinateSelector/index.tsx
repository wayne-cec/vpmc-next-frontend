import React, { useState } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import { IconButton, Tooltip } from '@mui/material'
import ExtensionIcon from '@mui/icons-material/Extension'

export interface ICoordinateSelector {
  longitude: number | null
  latitude: number | null
  locatedCounty: string | null
  locatedTown: string | null
  active: boolean
  enabled: boolean
  thirdParty?: boolean
  onClick: () => void
}

const CoordinateSelector = ({
  longitude,
  latitude,
  locatedCounty,
  locatedTown,
  active,
  enabled,
  thirdParty = false,
  onClick
}: ICoordinateSelector) => {

  return (
    <>
      <div className={classNames({
        [style.coordinateSelector]: true,
        [style.active]: active,
        [style.enabled]: enabled
      })}
        onClick={() => {
          if (enabled) {
            onClick()
          }
        }}
      >
        <div className={style.titleContainer}>
          <Image src={enabled ? '/aprRegion/gps.png' : '/aprRegion/gps-disabled.png'} width='25px' height='25px' />
          <div>
            <p>
              {
                longitude === null || latitude === null
                  ? '請定位座標'
                  : `經度: ${Math.round(longitude * 1000) / 1000}`
              }
            </p>
            <p>
              {
                longitude === null || latitude === null
                  ? ''
                  : `緯度: ${Math.round(latitude * 1000) / 1000}`
              }
            </p>
          </div>
        </div>
        {
          thirdParty
            ? <Tooltip title='第三方插件'>
              <IconButton color='info' aria-label="upload picture" component="span">
                <ExtensionIcon />
              </IconButton>
            </Tooltip>
            : <p className={style.regionTitle}>
              {
                locatedCounty === null || locatedTown === null
                  ? '無區域資料'
                  : `${locatedCounty},\xa0 ${locatedTown}`
              }
            </p>
        }

        {/* <Image src={'/aprRegion/expand.png'} width='25px' height='25px' /> */}
      </div>

      {/* <Dialog
        open={msgOpen}
        onClose={handleErrorDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {errorTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errorContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose}>
            確認
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  )
}

export default CoordinateSelector