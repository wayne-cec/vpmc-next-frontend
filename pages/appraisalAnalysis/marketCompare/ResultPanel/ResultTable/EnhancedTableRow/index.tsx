import React from 'react'
import {
  TableRow, TableCell, Checkbox, IconButton
} from '@mui/material'
import { Order, Data } from '../index'
import moment from 'moment'
import ArticleIcon from '@mui/icons-material/Article'
import style from './index.module.scss'
import classNames from 'classnames'
import { parseCommitee } from '../../../../../../lib/parseCommitee'
import { getAge } from '../../../../../../lib/calculateAge'
import calculateArea from '../../../../../../lib/calculateArea'
import { parkSpaceSet } from '../../../../../../lib/marketComapreConst'

const square = 3.305785

export interface IEnhancedTableRow {
  labelId: string
  isItemSelected: boolean
  row: Data
  onHover: () => void
  onLeave: () => void
  onSelect: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onDetailOpen: () => void
}

const EnhancedTableRow = ({
  labelId,
  isItemSelected,
  row,
  onHover,
  onLeave,
  onSelect,
  onDetailOpen
}: IEnhancedTableRow) => {

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      className={style.tableRow}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >

      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
          onClick={onSelect}
        />
      </TableCell>

      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {moment(new Date(row.transactiontime)).format('YYYY-MM-DD')}
      </TableCell>

      <TableCell
        align="right"
      >
        <span>
          {'暫無資料'}
        </span>
      </TableCell>

      <TableCell
        align="right"
      >
        <span
          className={classNames({
            [style.organization]: true,
            [style.disable]: row.organization === '無管委會'
          })}
        >{parseCommitee(row.organization)}
        </span>
      </TableCell>

      <TableCell
        component="th"
        scope="row"
        padding="none"
        align="right"
      >
        <span className={classNames({
          [style.age]: true,
          [style.green]: getAge(row.completiontime) <= 5,
          [style.yellow]: getAge(row.completiontime) > 5 && getAge(row.completiontime) <= 20,
          [style.red]: getAge(row.completiontime) > 20
        })}>
          {getAge(row.completiontime)}年
        </span>
      </TableCell>

      <TableCell align="right">
        {row.transferFloor}/{row.floor}樓
      </TableCell>

      <TableCell align="right">
        <span>
          {calculateArea(row.landTransferArea)}坪
          {/* {Math.round((row.buildingTransferArea - row.parkingSpaceTransferArea) / square * 10) / 10}坪 */}
        </span>
      </TableCell>

      <TableCell align="right">
        <span>
          {calculateArea(row.buildingTransferArea - row.parkingSpaceTransferArea)}坪
          {/* {Math.round((row.buildingTransferArea - row.parkingSpaceTransferArea) / square * 10) / 10}坪 */}
        </span>
      </TableCell>

      <TableCell align="right">
        <span>
          {
            Math.round(row.buildingArea / row.buildingTransferArea * 1000) / 10
          }%
        </span>
      </TableCell>

      <TableCell align="right">
        <span className={style.unitPrice}>
          {Math.round((row.unitPrice * square) / 1000) / 10}
        </span>
        <span className={style.unit}>萬</span>
      </TableCell>

      <TableCell align="right">
        {
          row.parkingSpacePrice === 0
            ? '無車位'
            : <>
              <p>{`${Math.round(row.parkingSpacePrice / 10000)}萬`}</p>
              <div>
                <span className={style.parkCount}>{row.parkAmount}</span>
                {parkSpaceSet[row.parkingSpaceType]}
              </div>
            </>
        }
      </TableCell>

      <TableCell align="right">
        <p className={style.totalPrice}>
          {Math.round(row.price / 10000)}
          <span className={style.smtext}>萬</span>
        </p>
      </TableCell>

      <TableCell align="right">
        <IconButton size="small"
          onClick={onDetailOpen}
        >
          <ArticleIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default EnhancedTableRow
