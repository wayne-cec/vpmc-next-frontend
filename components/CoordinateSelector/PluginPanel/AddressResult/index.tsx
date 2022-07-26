import React, { useContext } from 'react'
import style from './index.module.scss'
import { IAddressResult } from '../../../../widgets/Location/Address/AddressResult'
import classNames from 'classnames'
import { PluginContext } from '..'
import MarketCompareContext from '../../../../pages/appraisalAnalysis/marketCompare/MarketCompareContext'

const AddressResult = (props: IAddressResult) => {
  // const { handleCoordinateSelect } = useContext(MarketCompareContext)
  const { handlePointSelect } = useContext(PluginContext)

  return (
    <div className={classNames({
      [style.AddressResult]: true,
      [style.selected]: props.selectedAddress === props.FULL_ADDR
    })}
      onClick={() => {
        // handleCoordinateSelect(props.X, props.Y)
        handlePointSelect(props.X, props.Y)
        props.onClick(props.FULL_ADDR)
      }}
    >
      <span>{props.FULL_ADDR}</span>
    </div>
  )
}

export default AddressResult