import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Widget from "@arcgis/core/widgets/Widget"
import * as decorators from "@arcgis/core/core/accessorSupport/decorators"

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

export class Car extends React.Component {
  render () {
    return (
      <button className={style.testWidget}
        onClick={() => {
          alert('aaaaaa')
        }}
      >
        My Button 1
      </button>
    )
  }
}

@decorators.subclass('esri.widgets.Car2')
export class Car2 extends Widget {
  render () {
    return (
      // <button className={style.testWidget}
      //   onClick={() => {
      //     alert('aaaaaa')
      //   }}
      // >
      //   My Button 2
      // </button>
      <div>
        asdasdads
      </div>
    )
  }
}
