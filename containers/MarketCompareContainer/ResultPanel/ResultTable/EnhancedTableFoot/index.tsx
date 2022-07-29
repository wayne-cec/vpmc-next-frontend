import React from 'react'
import DescriptionIcon from '@mui/icons-material/Description'
import {
  Grid, Switch, TablePagination, Button
} from '@mui/material'
import { Data } from '../index'

interface IEnhancedTableFoot {
  dense: boolean
  simple: boolean
  rows: Data[]
  rowsPerPage: number
  page: number
  selected: readonly string[]
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
  selected,
  onDense,
  onSimple,
  onPageChange
}: IEnhancedTableFoot) => {

  return (
    <Grid container spacing={0}>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={4}>
            <Switch
              value={dense && simple}
              onChange={() => {
                onDense()
                onSimple()
              }}
              defaultChecked
            />
            <span>縮小模式</span>
          </Grid>
          <Grid item xs={4}>
            {
              selected.length !== 0 && <Button
                size='small'
                variant='outlined'
                startIcon={<DescriptionIcon />}
              >
                產製文件
              </Button>
            }
          </Grid>
        </Grid>
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
