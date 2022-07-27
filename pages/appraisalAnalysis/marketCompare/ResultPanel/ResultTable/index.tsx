import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import style from './index.module.scss'
import api from '../../../../../api'
import EnhancedTableHead from './EnhancedTableHead'
import MarketCompareContext from '../../MarketCompareContext'
import { IMarketCompareResult } from '../../../../../api/prod'
import {
  getComparator,
  stableSort
} from '../../../../../lib/tableHelper'
import {
  Paper, TableContainer, TableBody
} from '@mui/material'
import EnhancedTableFoot from './EnhancedTableFoot'
import EnhancedTableRow, { IEnhancedTableRow } from './EnhancedTableRow'

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
  const [simple, setsimple] = useState(true)
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

  const renderMatchingCommitee = () => {
    return (
      <div className={style.loadingSection}>
        <div className={style.loader}></div>
        <span>匹配管委會資料中</span>
      </div>
    )
  }

  const renderTableRow = () => {
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
              simple={simple}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {
                pending
                  ? renderMatchingCommitee()
                  : renderRows.map((row, index) => {
                    const enhancedTableRowProps: IEnhancedTableRow = {
                      simple: simple,
                      row: row,
                      labelId: `enhanced-table-checkbox-${index}`,
                      isItemSelected: isSelected(row.id),
                      onHover: () => {
                        onZoomIdChange({ id: row.id })
                      },
                      onLeave: () => {
                        onZoomIdChange(null)
                      },
                      onSelect: (event) => {
                        handleRowClick(event, row.id)
                        event.stopPropagation()
                      },
                      onDetailOpen: () => {
                        onDetailAprChange(row.id)
                      }
                    }
                    return (
                      <EnhancedTableRow {...enhancedTableRowProps} />
                    )
                  })
              }
            </TableBody>
          </Table>
          <EnhancedTableFoot
            dense={dense}
            simple={simple}
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            onDense={() => {
              setDense(prev => !prev)
            }}
            onSimple={() => {
              setsimple(prev => !prev)
            }}
            onPageChange={(event: unknown, newPage: number) => {
              setPage(newPage)
            }}
          />
        </TableContainer>

      </Paper>
    </Box>
  )
}

export default ResultTable
