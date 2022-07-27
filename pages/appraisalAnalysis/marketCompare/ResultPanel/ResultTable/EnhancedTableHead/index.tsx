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

export const headCells: readonly HeadCell[] = [
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

export interface IEnhancedTableHead {
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
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
