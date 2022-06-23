import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

export interface ITestWidget {
}

const TestWidget = (props: ITestWidget) => {
  return (
    <button className={style.testWidget}
      onClick={() => {
        alert('aaaaaa')
      }}
    >
      My Button
    </button>
  )
}

export default TestWidget
