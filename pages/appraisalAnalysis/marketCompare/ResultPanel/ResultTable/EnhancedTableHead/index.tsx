import { useEffect } from 'react'
import {
  Checkbox, TableSortLabel, TableRow,
  TableHead, TableCell, Tooltip, Box
} from '@mui/material'
import { Order, Data } from '../index'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { visuallyHidden } from '@mui/utils'

export interface HeadCell {
  disablePadding: boolean
  id: keyof Data | string
  label: string
  numeric: boolean
}

export let headCells: HeadCell[] = [
  {
    id: 'transactiontime',
    numeric: false,
    disablePadding: true,
    label: '交易日期'
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: '門牌道路'
  },
  {
    id: 'organization',
    numeric: true,
    disablePadding: false,
    label: '社區名稱'
  },
  {
    id: 'completiontime',
    numeric: true,
    disablePadding: true,
    label: '屋齡'
  },
  {
    id: 'transferFloor',
    numeric: true,
    disablePadding: false,
    label: '樓層'
  },
  {
    id: 'landTransferArea',
    numeric: true,
    disablePadding: false,
    label: '土地'
  },
  {
    id: 'buildingTransferArea',
    numeric: true,
    disablePadding: false,
    label: '建物'
  },
  {
    id: 'areaRatio',
    numeric: true,
    disablePadding: false,
    label: '主建比'
  },
  {
    id: 'unitPrice',
    numeric: true,
    disablePadding: false,
    label: '單價(萬/坪)'
  },
  {
    id: 'parkingSpacePrice',
    numeric: true,
    disablePadding: false,
    label: '車位價格'
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: '總價(萬)'
  },
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: ''
  }
]

const simpleExclude = ['landTransferArea', 'buildingTransferArea', 'areaRatio']

export interface IEnhancedTableHead {
  simple: boolean
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

const EnhancedTableHead = (props: IEnhancedTableHead) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    }

  useEffect(() => {
    if (props.simple) {
      headCells = [
        {
          id: 'transactiontime',
          numeric: false,
          disablePadding: true,
          label: '交易日期'
        },
        {
          id: 'address',
          numeric: true,
          disablePadding: false,
          label: '門牌道路'
        },
        {
          id: 'organization',
          numeric: true,
          disablePadding: false,
          label: '社區名稱'
        },
        {
          id: 'completiontime',
          numeric: true,
          disablePadding: true,
          label: '屋齡'
        },
        {
          id: 'transferFloor',
          numeric: true,
          disablePadding: false,
          label: '樓層'
        },
        {
          id: 'unitPrice',
          numeric: true,
          disablePadding: false,
          label: '單價(萬/坪)'
        },
        {
          id: 'parkingSpacePrice',
          numeric: true,
          disablePadding: false,
          label: '車位價格'
        },
        {
          id: 'price',
          numeric: true,
          disablePadding: false,
          label: '總價(萬)'
        },
        {
          id: 'id',
          numeric: false,
          disablePadding: true,
          label: ''
        }
      ]
    } else {
      headCells = [
        {
          id: 'transactiontime',
          numeric: false,
          disablePadding: true,
          label: '交易日期'
        },
        {
          id: 'address',
          numeric: true,
          disablePadding: false,
          label: '門牌道路'
        },
        {
          id: 'organization',
          numeric: true,
          disablePadding: false,
          label: '社區名稱'
        },
        {
          id: 'completiontime',
          numeric: true,
          disablePadding: true,
          label: '屋齡'
        },
        {
          id: 'transferFloor',
          numeric: true,
          disablePadding: false,
          label: '樓層'
        },
        {
          id: 'landTransferArea',
          numeric: true,
          disablePadding: false,
          label: '土地'
        },
        {
          id: 'buildingTransferArea',
          numeric: true,
          disablePadding: false,
          label: '建物'
        },
        {
          id: 'areaRatio',
          numeric: true,
          disablePadding: false,
          label: '主建比'
        },
        {
          id: 'unitPrice',
          numeric: true,
          disablePadding: false,
          label: '單價(萬/坪)'
        },
        {
          id: 'parkingSpacePrice',
          numeric: true,
          disablePadding: false,
          label: '車位價格'
        },
        {
          id: 'price',
          numeric: true,
          disablePadding: false,
          label: '總價(萬)'
        },
        {
          id: 'id',
          numeric: false,
          disablePadding: true,
          label: ''
        }
      ]
    }
  }, [props.simple])

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

        <TableCell
          key='transactiontime'
          align='left'
          padding='none'
          sortDirection={orderBy === 'transactiontime' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'transactiontime'}
            direction={orderBy === 'transactiontime' ? order : 'asc'}
            onClick={createSortHandler(('transactiontime' as keyof Data))}
          >
            {'交易日期'}
            {orderBy === 'transactiontime' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='address'
          align='right'
          padding='normal'
          sortDirection={orderBy === 'address' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'address'}
            direction={orderBy === 'address' ? order : 'asc'}
            onClick={createSortHandler(('address' as keyof Data))}
          >
            {'門牌道路'}
            {orderBy === 'address' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='organization'
          align='right'
          padding='normal'
          sortDirection={orderBy === 'organization' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'organization'}
            direction={orderBy === 'organization' ? order : 'asc'}
            onClick={createSortHandler(('organization' as keyof Data))}
          >
            {'社區名稱'}
            {orderBy === 'organization' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='completiontime'
          align='right'
          padding='none'
          sortDirection={orderBy === 'completiontime' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'completiontime'}
            direction={orderBy === 'completiontime' ? order : 'asc'}
            onClick={createSortHandler(('completiontime' as keyof Data))}
          >
            {'屋齡'}
            {orderBy === 'completiontime' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='transferFloor'
          align='right'
          padding='normal'
          sortDirection={orderBy === 'transferFloor' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'transferFloor'}
            direction={orderBy === 'transferFloor' ? order : 'asc'}
            onClick={createSortHandler(('transferFloor' as keyof Data))}
          >
            {'樓層'}
            {orderBy === 'transferFloor' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        {
          !props.simple && <>
            <TableCell
              key='landTransferArea'
              align='right'
              padding='normal'
              sortDirection={orderBy === 'landTransferArea' ? order : false}
            >
              <TableSortLabel
                active={orderBy === 'landTransferArea'}
                direction={orderBy === 'landTransferArea' ? order : 'asc'}
                onClick={createSortHandler(('landTransferArea' as keyof Data))}
              >
                {'土地'}
                {orderBy === 'landTransferArea' ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>

            <TableCell
              key='buildingTransferArea'
              align='right'
              padding='normal'
              sortDirection={orderBy === 'buildingTransferArea' ? order : false}
            >
              <TableSortLabel
                active={orderBy === 'buildingTransferArea'}
                direction={orderBy === 'buildingTransferArea' ? order : 'asc'}
                onClick={createSortHandler(('buildingTransferArea' as keyof Data))}
              >
                {'建物'}
                {orderBy === 'buildingTransferArea' ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>

            <TableCell
              key='areaRatio'
              align='right'
              padding='normal'
              sortDirection={orderBy === 'areaRatio' ? order : false}
            >
              <TableSortLabel
                active={orderBy === 'areaRatio'}
                direction={orderBy === 'areaRatio' ? order : 'asc'}
                onClick={createSortHandler(('areaRatio' as keyof Data))}
              >
                {'主建比'}
                {orderBy === 'areaRatio' ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          </>
        }

        <TableCell
          key='unitPrice'
          align='right'
          padding='normal'
          sortDirection={orderBy === 'unitPrice' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'unitPrice'}
            direction={orderBy === 'unitPrice' ? order : 'asc'}
            onClick={createSortHandler(('unitPrice' as keyof Data))}
          >
            {'單價(萬/坪)'}
            {orderBy === 'unitPrice' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='parkingSpacePrice'
          align='right'
          padding='normal'
          sortDirection={orderBy === 'parkingSpacePrice' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'parkingSpacePrice'}
            direction={orderBy === 'parkingSpacePrice' ? order : 'asc'}
            onClick={createSortHandler(('parkingSpacePrice' as keyof Data))}
          >
            {'車位價格'}
            {orderBy === 'parkingSpacePrice' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='price'
          align='right'
          padding='normal'
          sortDirection={orderBy === 'price' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'price'}
            direction={orderBy === 'price' ? order : 'asc'}
            onClick={createSortHandler(('price' as keyof Data))}
          >
            {'總價(萬)'}
            {orderBy === 'price' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='id'
          align='right'
          padding='normal'
          sortDirection={orderBy === 'id' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'id'}
            direction={orderBy === 'id' ? order : 'asc'}
            onClick={createSortHandler(('id' as keyof Data))}
          >
            {''}
            {orderBy === 'id' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        {/* {
          headCells.map((headCell) => (
            // !simpleExclude.includes(headCell.id) &&
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler((headCell.id as keyof Data))}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
              {
                headCell.id === 'buildingTransferArea'
                  ? <Tooltip title='已扣車位'>
                    <HelpOutlineIcon sx={{ fontSize: 20 }} />
                  </Tooltip>
                  : null
              }
            </TableCell>
          ))
        } */}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
