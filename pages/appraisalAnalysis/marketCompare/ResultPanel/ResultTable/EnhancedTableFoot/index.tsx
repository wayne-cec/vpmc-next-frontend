import React from 'react'
import {
  Grid, Switch, TablePagination
} from '@mui/material'
import { Order, Data } from '../index'

interface IEnhancedTableFoot {
  dense: boolean
  simple: boolean
  rows: Data[]
  rowsPerPage: number
  page: number
  onDense: () => void
  onSimple: () => void
  onPageChange: (event: unknown, newPage: number) => void
}

const EnhancedTableFoot = ({
  dense,
  simple,
  rows,
  rowsPerPage,
  page,
  onDense,
  onSimple,
  onPageChange
}: IEnhancedTableFoot) => {

  return (
    <Grid container spacing={0}>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Switch
          value={dense}
          onChange={() => {
            onDense()
            onSimple()
          }}
          defaultChecked
        />
        <span>縮小模式</span>
        {/* <Grid container spacing={2}>
          <Grid item xs={4}>
            <Switch
              value={simple}
              onChange={onSimple}
              defaultChecked
            />
            <span>簡易模式</span>
          </Grid>
          <Grid item xs={4}>
            <Switch
              value={dense}
              onChange={onDense}
              defaultChecked
            />
            <span>縮小模式</span>
          </Grid>
        </Grid> */}
      </Grid>
      <Grid item xs={6}>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
        />
      </Grid>
    </Grid>
  )
}

export default EnhancedTableFoot
