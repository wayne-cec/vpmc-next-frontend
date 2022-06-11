import React, { useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

const CountySelector = () => {
  const [open, setopen] = useState<boolean>(false)
  return (
    <div>
      <div className={style.countySelector}
        onClick={() => {
          setopen(prev => !prev)
        }}
      >


      </div>

      <div className={classNames({
        [style.popPanel]: true,
        [style.show]: open
      })} onClick={() => { }}>
      </div>
    </div>

  )
}

export default CountySelector