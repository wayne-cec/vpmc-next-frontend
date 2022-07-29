import React, { useContext } from 'react'
import { IAddressResult } from '../../../../widgets/Location/Address/AddressResult'
import { PluginContext } from '..'
import style from './index.module.scss'
import classNames from 'classnames'

const AddressResult = (props: IAddressResult) => {
  const { handlePointSelect } = useContext(PluginContext)
  return (
    <div className={classNames({
      [style.AddressResult]: true,
      [style.selected]: props.selectedAddress === props.FULL_ADDR
    })}
      onClick={() => {
        handlePointSelect(props.X, props.Y)
        props.onClick(props.FULL_ADDR)
      }}
    >
      <span>{props.FULL_ADDR}</span>
    </div>
  )
}

export default AddressResult