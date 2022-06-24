import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import style from './index.module.scss'
import {
  IconButton, Checkbox, Paper, TableSortLabel,
  TableRow, TablePagination, TableHead, TableContainer,
  TableCell, TableBody, Menu, MenuItem, ListItemIcon,
  ListItemText
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { IMarketCompareResult } from '../../../../../api/prod'
import {
  Order, descendingComparator,
  getComparator, stableSort, Data, HeadCell, headCells
} from './helper'
import moment from 'moment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { ZoomContext } from '../..'

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export interface IResultTable {
  data: IMarketCompareResult[]
}

const square = 3.305785

export const ResultTable = (props: IResultTable) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('price')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setrows] = useState<Data[]>([])
  const { onZoomIdChange } = useContext(ZoomContext)

  useEffect(() => {
    const newRows: Data[] = []
    props.data.forEach((d) => {
      const row: Data = { ...d }
      newRows.push(row)
    })
    setrows([...newRows])
  }, [props.data])

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
    if (event.type === 'click') {
      handleSelect(id)
    } else if (event.type === 'contextmenu') {
      console.log('Right click');
    }
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

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
                stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                            onClick={(event) => handleRowClick(event, row.id)}
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
                        <TableCell align="right">
                          {row.transferFloor}樓
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
                              : `${Math.round(row.parkingSpacePrice / 10000)}萬`
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
                            onClick={() => {
                              onZoomIdChange(row.id)
                            }}
                          >
                            <ZoomInIcon fontSize="small" />
                          </IconButton>
                        </TableCell>

                        {/* <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={menuOpen}
                          onClose={handleMenuClose}
                          sx={{ boxShadow: 'none' }}
                        >
                          <MenuItem onClick={() => {
                            handleMenuClose()
                            onZoomIdChange(row.id)
                            console.log(row.id)
                          }}>
                            <ListItemIcon>
                              <ZoomInIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Zoom to</ListItemText>
                          </MenuItem>
                        </Menu> */}
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
            </TableBody>
          </Table>
        </TableContainer>

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
      </Paper>
    </Box>
  );
}