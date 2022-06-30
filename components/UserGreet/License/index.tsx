import React, { useState } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import {
  Tooltip, Dialog, DialogTitle,
  DialogContent, Button, DialogActions
} from '@mui/material'

const License = () => {
  const [twStatisticHover, settwStatisticHover] = useState<boolean>(false)
  const [twStatisticDialogOpen, settwStatisticDialogOpen] = useState<boolean>(false)

  return (
    <>
      <Tooltip title='使照建照統計'>
        <div className={classNames({
          [style.lawBtn]: true
        })}
          onMouseOver={() => { settwStatisticHover(true) }}
          onMouseLeave={() => { settwStatisticHover(false) }}
          onClick={() => { settwStatisticDialogOpen(true) }}
        >
          <Image src={twStatisticHover ? '/law/license-hover.png' : '/law/license.png'} width='32px' height='32px' />
        </div>
      </Tooltip>

      <Dialog
        open={twStatisticDialogOpen}
        onClose={() => { settwStatisticDialogOpen(false) }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">使照建照統計</DialogTitle>

        <DialogContent>
          此功能尚未移植完畢
        </DialogContent>

        <DialogActions>
          <Button onClick={() => { settwStatisticDialogOpen(false) }}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default License