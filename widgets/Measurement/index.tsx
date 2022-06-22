import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

export interface IMeasurement {
}

const Measurement = (props: IMeasurement) => {
  return (
    <button className={style.testWidget}
      onClick={() => {
        alert('aaaaaa')
      }}
    >
      measurement
    </button>
  )
}

export default Measurement
