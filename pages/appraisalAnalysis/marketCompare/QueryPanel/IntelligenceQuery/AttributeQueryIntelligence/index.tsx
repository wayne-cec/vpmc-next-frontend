import React, { useContext, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MarketCompareContext from '../../../MarketCompareContext'
import FileUpload from '../../../../../../components/FileUpload'
import {
  Grid, Button, FormControl,
  InputLabel, Select, MenuItem,
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, TextField
} from '@mui/material'
import {
  assetTypeSet
} from '../../../../../../lib/marketComapreConst'
import { makeStyles } from '@mui/styles'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { findKey } from 'lodash'

const accept = '.csv'

const parseCsvString = (data: string) => {
  const output: string[][] = []
  const rowStringArray: string[] = data.split('\n')
  rowStringArray.forEach((row) => {
    output.push(row.split(','))
  })
  return output
}

const useStyle = makeStyles({
  uploadButton: {
    height: '100%'
  },
  datePicker: {
    height: '39.97px'
  }
})

const AttributeQueryIntelligence = () => {
  const classes = useStyle()
  const marketCompareContext = useContext(MarketCompareContext)
  // const [objectInfo, setobjectInfo] = useState<string[] | undefined>(undefined)
  const [uploadPanelOpen, setuploadPanelOpen] = useState<boolean>(false)
  const [assetTypeCode, setassetTypeCode] = useState<number>(0)
  const [completionTime, setcompletionTime] = useState<Date | null>(null)
  const [transactionTime, settransactionTime] = useState<Date | null>(null)
  const [transferFloor, settransferFloor] = useState<number>(1)

  const handleFileBlob = async (file: File) => {
    const csvString = await file.text()
    const parsedCsv = parseCsvString(csvString)
    if (parsedCsv[0][0] !== 'vpmc-marketCompare-intelligence-config') {
      alert('非本DSS專用config檔案')
      return
    }
    const objectInfo: string[] = parsedCsv[2]
    objectInfo[2]
    setcompletionTime(new Date(objectInfo[6]))
    settransactionTime(new Date(objectInfo[11]))
    settransferFloor(Number(objectInfo[5]))

    // setobjectInfo(objectInfo)
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return
    const fileBlob = event.target.files[0]
    handleFileBlob(fileBlob)
  }

  const onFileDrop = (event: React.DragEvent<HTMLElement>) => {
    const fileBlob = event.dataTransfer.files[0]
    handleFileBlob(fileBlob)
  }

  return (
    <div className={classNames({
      [style.AttributeQuery]: true,
      [style.divide]: true
    })}>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Button
              className={classes.uploadButton}
              variant='outlined'
              onClick={() => {
                setuploadPanelOpen(true)
              }}
              fullWidth
            >
              上傳檔案
            </Button>
          </Grid>
          <Grid item xs={7}>
            <FormControl size='small' fullWidth>
              <InputLabel id="asset-type">資產類型*</InputLabel>
              <Select
                labelId="asset-type"
                label="資產類型"
                id="asset-type-select"
                value={assetTypeCode}
                onChange={(event) => {
                  setassetTypeCode(Number(event.target.value))
                }}
                size='small'
                fullWidth
              >
                {
                  Object.keys(assetTypeSet).map((assetCode, index) => {
                    return <MenuItem
                      key={index}
                      value={assetCode}
                    >{assetTypeSet[Number(assetCode)]}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <FormControl size='small' fullWidth>
              <DesktopDatePicker
                // className={classes.datePicker}
                label="完工時間"
                inputFormat="yyyy/MM/dd"
                value={completionTime}
                onChange={(newValue: Date | null) => {
                  setcompletionTime(newValue)
                }}
                renderInput={(params) => <TextField size='small' {...params} />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl size='small' fullWidth>
              <DesktopDatePicker
                // className={classes.datePicker}
                label="交易時間"
                inputFormat="yyyy/MM/dd"
                value={transactionTime}
                onChange={(newValue: Date | null) => {
                  settransactionTime(newValue)
                }}
                renderInput={(params) => <TextField size='small' {...params} />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl size='small' fullWidth>
              <TextField
                type='number'
                label="樓層"
                size='small'
                value={transferFloor}
                disabled={false}
                onChange={(event) => {
                  settransferFloor(Number(event.target.value))
                }}
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: 150
                  }
                }}
                fullWidth
              >
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
      </LocalizationProvider>

      <Dialog
        open={uploadPanelOpen}
        onClose={() => { setuploadPanelOpen(false) }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <div className='w-[500px] h-[300px]'>
            <FileUpload
              accept={accept}
              onChange={onFileChange}
              onDrop={onFileDrop}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* {
        objectInfo
          ? <div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                標的簡稱
              </Grid>
              <Grid item xs={6}>
                {objectInfo[1]}
              </Grid>
              <Grid item xs={6}>
                資產類型
              </Grid>
              <Grid item xs={6}>
                {objectInfo[2]}
              </Grid>
              <Grid item xs={6}>
                門牌
              </Grid>
              <Grid item xs={6}>
                {objectInfo[3]}
              </Grid>
              <Grid item xs={6}>
                樓層
              </Grid>
              <Grid item xs={6}>
                {objectInfo[5]}F
              </Grid>

              <Grid item xs={6}>
                建物完工日期
              </Grid>
              <Grid item xs={6}>
                {objectInfo[6]}
              </Grid>

            </Grid>
          </div>
          : <FileUpload
            accept={accept}
            onChange={onFileChange}
            onDrop={onFileDrop}
          />
      } */}

    </div>
  )
}

export default AttributeQueryIntelligence