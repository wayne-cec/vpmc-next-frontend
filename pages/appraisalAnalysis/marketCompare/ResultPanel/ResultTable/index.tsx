import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import style from './index.module.scss'
import moment from 'moment'
import api from '../../../../../api'
import classNames from 'classnames'
import ArticleIcon from '@mui/icons-material/Article'
import EnhancedTableHead from './EnhancedTableHead'
import MarketCompareContext from '../../MarketCompareContext'
import calculateArea from '../../../../../lib/calculateArea'
import { IMarketCompareResult } from '../../../../../api/prod'
import { parseCommitee } from '../../../../../lib/parseCommitee'
import { getAge } from '../../../../../lib/calculateAge'
import { parkSpaceSet } from '../../../../../lib/marketComapreConst'
import {
  getComparator,
  stableSort
} from '../../../../../lib/tableHelper'
import {
  IconButton, Checkbox, Paper, TableRow,
  TablePagination, TableContainer, TableCell,
  TableBody, Switch, Grid
} from '@mui/material'

export type Order = 'asc' | 'desc'

export interface Data {
  id: string
  transactiontime: string
  transferFloor: number
  unitPrice: number
  parkingSpacePrice: number
  price: number
  organization: string
  buildingTransferArea: number
  completiontime: string
  parkingSpaceTransferArea: number
  landAmount: number
  buildingAmount: number
  parkAmount: number
  buildingType: number
  floor: number
  urbanLandUse: number
  buildingArea: number
  subBuildingArea: number
  landTransferArea: number
  belconyArea: number
  parkingSpaceType: number
}

export interface IResultTable {
  data: IMarketCompareResult[]
}

const square = 3.305785

const ResultTable = (props: IResultTable) => {
  const { onZoomIdChange, onDetailAprChange } = useContext(MarketCompareContext)
  const [selected, setSelected] = useState<readonly string[]>([])
  const [orderBy, setOrderBy] = useState<keyof Data>('price')
  const [renderRows, setrenderRows] = useState<Data[]>([])
  const [pending, setpending] = useState<boolean>(false)
  const [order, setOrder] = useState<Order>('desc')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setrows] = useState<Data[]>([])
  const [dense, setDense] = useState(true)
  const [page, setPage] = useState(0)
  const isSelected = (name: string) => selected.indexOf(name) !== -1
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleSelect = (name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const handleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    handleSelect(id)
  }

  const handleGetCommiteeByAprId = async (id: string) => {
    const { statusCode, responseContent } = await api.prod.getCommiteeByAprId(id)
    if (statusCode === 200) {
      return responseContent.organization
    }
    return undefined
  }

  const handleLoadingData = async () => {
    setpending(true)
    const newRows: Data[] = []
    for (let i = 0; i < props.data.length; i++) {
      const row: Data = { ...props.data[i], organization: 'a' }
      newRows.push(row)
    }
    setrows([...newRows])
    const firstRows = stableSort(newRows, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    if (firstRows.length !== 0) {
      for (let i = 0; i < firstRows.length; i++) {
        const organization = await handleGetCommiteeByAprId(firstRows[i].id)
        firstRows[i].organization = organization ? organization : '無管委會'
      }
      setrenderRows(firstRows)
    }
    setrenderRows(firstRows)
    setpending(false)
  }

  const handleChangPage = async () => {
    const filteredRows = stableSort(rows, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    if (filteredRows.length !== 0) {
      for (let i = 0; i < filteredRows.length; i++) {
        const organization = await handleGetCommiteeByAprId(filteredRows[i].id)
        filteredRows[i].organization = organization ? organization : '無管委會'
      }
      setrenderRows(filteredRows)
    }
  }

  useEffect(() => {
    handleLoadingData()
  }, [props.data])

  useEffect(() => {
    handleChangPage()
  }, [page, order, orderBy])


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {
                pending ? null : renderRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className={style.tableRow}
                      // onClick={() => {
                      //   onZoomIdChange({ id: row.id })
                      // }}
                      onMouseEnter={() => {
                        onZoomIdChange({ id: row.id })
                      }}
                      onMouseLeave={() => {
                        onZoomIdChange(null)
                      }}
                    >

                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(event) => {
                            handleRowClick(event, row.id)
                            event.stopPropagation()
                          }}
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

                      {/* <TableCell align="right">
                        <IconButton size="small"
                          onClick={() => {
                            onZoomIdChange({ id: row.id })
                          }}
                        >
                          <ZoomInIcon fontSize="small" />
                        </IconButton>
                      </TableCell> */}

                      <TableCell align="right">
                        <IconButton size="small"
                          onClick={() => {
                            onDetailAprChange(row.id)
                            // onShow(true)
                          }}
                        >
                          <ArticleIcon fontSize="small" />
                        </IconButton>
                      </TableCell>

                    </TableRow>
                  )
                })
              }
              {
                emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )
              }
              {
                pending
                  ? <div className={style.loadingSection}>
                    <div className={style.loader}></div>
                    <span>匹配管委會資料中</span>
                  </div>
                  : null
              }
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={0}>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              value={dense}
              onChange={() => {
                setDense(prev => !prev)
              }}
              defaultChecked
            />
            <span>縮小模式</span>
          </Grid>
          <Grid item xs={6}>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event: unknown, newPage: number) => {
                setPage(newPage)
              }}
              onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRowsPerPage(parseInt(event.target.value, 10))
                setPage(0)
              }}
            />
          </Grid>
        </Grid>

      </Paper>
    </Box>
  )
}

export default ResultTable
