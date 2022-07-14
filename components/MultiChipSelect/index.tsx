import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles (name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export interface IMultiChipSelect {
  placeholder: string
  urbanLandUse?: number[]
  urbanUsageSet: { [key: number]: string }
  isUrbanUsageFiltered: boolean
  isUrbanUsageFosced: boolean
  onChange: (value: number[]) => void
}

export default function MultiChipSelect (props: IMultiChipSelect) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === 'string') return
    // setPersonName(value)
    const newValue = value.map(function (x) {
      return Number(x);
    })
    props.onChange(newValue)
  }

  React.useEffect(() => {
    if (props.urbanLandUse === null || props.urbanLandUse === undefined) return
    const newValue = props.urbanLandUse.map(function (x) {
      return x.toString()
    })
    setPersonName(newValue)
  }, [props.urbanLandUse])

  return (
    <FormControl size='small' fullWidth>
      {
        props.isUrbanUsageFiltered && !props.isUrbanUsageFosced
          ? <></>
          : <InputLabel id="land-use">{props.placeholder}</InputLabel>
      }
      <Select
        labelId="land-use"
        id="land-use-select"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {
              selected.map((value) => (
                <Chip key={value} label={props.urbanUsageSet[Number(value)]} />
              ))
            }
          </Box>
        )}
        MenuProps={MenuProps}
        disabled={!props.isUrbanUsageFiltered}
      >
        {
          Object.keys(props.urbanUsageSet).map((assetCode, index) => {
            return <MenuItem
              key={index}
              value={assetCode}
            // style={getStyles(name, personName, theme)}
            >
              {props.urbanUsageSet[Number(assetCode)]}
            </MenuItem>
          })

          // names.map((name) => (
          // <MenuItem
          //   key={name}
          //   value={name}
          //   style={getStyles(name, personName, theme)}
          // >
          //   {name}
          // </MenuItem>
          // ))
        }
      </Select>
    </FormControl>
  )
}