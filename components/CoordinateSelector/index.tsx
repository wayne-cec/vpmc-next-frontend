import React, { useContext, useState } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import {
  IconButton, Tooltip, Dialog,
  DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material'
import ExtensionIcon from '@mui/icons-material/Extension'
import PluginPanel from './PluginPanel'
import MarketCompareContext from '../../pages/appraisalAnalysis/marketCompare/MarketCompareContext'

export interface ICoordinateSelector {
  longitude: number | undefined
  latitude: number | undefined
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
  const { onCoordinateSelect } = useContext(MarketCompareContext)
  const [pluginPanelOpen, setpluginPanelOpen] = useState<boolean>(false)
  const [pluginLongitude, setpluginLongitude] = useState<number | undefined>(undefined)
  const [pluginLatitude, setpluginLatitude] = useState<number | undefined>(undefined)

  const renderPluginButton = () => {
    return <Tooltip title='第三方插件'>
      <IconButton
        color='info'
        aria-label="upload picture"
        component="span"
        onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
          setpluginPanelOpen(true)
          event.stopPropagation()
        }}
      >
        <ExtensionIcon />
      </IconButton>
    </Tooltip>
  }

  const renderRegionCaption = () => {
    return <p className={style.regionTitle}>
      {
        locatedCounty === null || locatedTown === null
          ? '無區域資料'
          : `${locatedCounty},\xa0 ${locatedTown}`
      }
    </p>
  }

  const handlePluginPointSelect = (longitude: number, latitude: number) => {
    setpluginLongitude(longitude)
    setpluginLatitude(latitude)
  }

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
                longitude === undefined || latitude === undefined
                  ? '請定位座標'
                  : `經度: ${Math.round(longitude * 1000) / 1000}`
              }
            </p>
            <p>
              {
                longitude === undefined || latitude === undefined
                  ? ''
                  : `緯度: ${Math.round(latitude * 1000) / 1000}`
              }
            </p>
          </div>
        </div>
        {
          thirdParty
            ? renderPluginButton()
            : renderRegionCaption()
        }
      </div>

      <Dialog
        open={pluginPanelOpen}
        onClose={() => { setpluginPanelOpen(false) }}
        aria-labelledby="plugin-dialog-title"
      >
        <DialogTitle id="plugin-dialog-title">第三方插件</DialogTitle>
        <DialogContent>
          <PluginPanel
            longitude={pluginLongitude}
            latitude={pluginLatitude}
            handlePluginPointSelect={handlePluginPointSelect}
          />
        </DialogContent>
        <DialogActions>
          {
            pluginLongitude && pluginLatitude && <Button onClick={() => {
              onCoordinateSelect(pluginLongitude, pluginLatitude)
              setpluginPanelOpen(false)
            }}>
              確認
            </Button>
          }
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CoordinateSelector