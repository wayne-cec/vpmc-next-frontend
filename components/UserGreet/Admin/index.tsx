import React, { useState } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import Router from 'next/router'
import {
  Tooltip
} from '@mui/material'

const Admin = () => {
  const [twStatisticHover, settwStatisticHover] = useState<boolean>(false)

  return (
    <>
      <Tooltip title='後台管理系統'>
        <div className={classNames({
          [style.lawBtn]: true
        })}
          onMouseOver={() => { settwStatisticHover(true) }}
          onMouseLeave={() => { settwStatisticHover(false) }}
          onClick={() => { Router.push('/admin') }}
        >
          <Image src={twStatisticHover ? '/law/admin-hover.png' : '/law/admin.png'} width='32px' height='32px' />
        </div>
      </Tooltip>
    </>
  )
}

export default Admin