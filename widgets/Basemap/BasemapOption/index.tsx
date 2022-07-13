import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import OpacityIcon from '@mui/icons-material/Opacity'
import {
  IconButton, Tooltip, Slider
} from '@mui/material'
import WebTileLayer from '@arcgis/core/layers/WebTileLayer'

export interface IBasemapOption {
  id: string
  icon: string
  title: string
  layer: WebTileLayer
  active: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const BasemapOption = (props: IBasemapOption) => {
  const [isSettingOpacity, setisSettingOpacity] = useState<boolean>(false)

  const handleOpacityChange = (value: number | number[]) => {
    if (typeof value === 'number')
      props.layer.opacity = value / 100
  }

  const renderAction = () => {
    return <div>
      <Tooltip title='透明度'>
        <IconButton
          color={props.active ? 'primary' : 'inherit'}
          disabled={!props.active}
          onClick={(event) => {
            setisSettingOpacity(prev => !prev)
            event.stopPropagation()
          }}
        >
          <OpacityIcon />
        </IconButton>
      </Tooltip>
    </div>
  }

  useEffect(() => {
    if (props.active === false) {
      setisSettingOpacity(false)
    }
  }, [props.active])

  return (
    <div className={classNames({
      [style.basemapOption]: true,
      [style.active]: props.active
    })}
      onClick={props.onClick}
    >
      <div className={style.mainContainer}>
        <div className={style.infoContainer}>
          <div className={style.mapImg}>
            <Image
              src={props.icon}
              className={style.img}
              width='60px' height='60px'
            />
          </div>
          <span>{props.title}</span>
        </div>

        {
          props.id !== 'DEFAULT'
            ? renderAction()
            : null
        }
      </div>

      {
        isSettingOpacity
          ? <Slider
            size="small"
            defaultValue={props.layer.opacity * 100}
            onChange={(event, value) => {
              handleOpacityChange(value)
              event.stopPropagation()
            }}
            onClick={(event) => {
              event.stopPropagation()
            }}
          />
          : null
      }
    </div>
  )
}

export default BasemapOption
