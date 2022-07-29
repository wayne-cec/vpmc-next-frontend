import React, { useContext, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MarketCompareContext from '../../../MarketCompareContext'
import FileUpload from '../../../../../components/FileUpload'
import {
  Grid, Button, FormControl,
  InputLabel, Select, MenuItem,
  Dialog, DialogContent, TextField
} from '@mui/material'
import {
  assetTypeSet, urbanUsageSet
} from '../../../../../lib/marketComapreConst'
import { makeStyles } from '@mui/styles'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { findKey } from 'lodash'

const accept = '.csv'

export type ObjectType = 0 | 1 | 2 // 建物 土地 停車位

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
  const { uploadPanelOpen, onUploadClick } = useContext(MarketCompareContext)
  // const [uploadPanelOpen, setuploadPanelOpen] = useState<boolean>(false)
  const [objectTypeCode, setobjectTypeCode] = useState<ObjectType>(0)
  const [assetTypeCode, setassetTypeCode] = useState<number>(0)
  const [completionTime, setcompletionTime] = useState<Date | null>(null)
  const [transactionTime, settransactionTime] = useState<Date | null>(null)
  const [transferFloor, settransferFloor] = useState<number>(1)
  const [buildingArea, setbuildingArea] = useState<number>(0)
  const [landArea, setlandArea] = useState<number>(0)
  const [unitPrice, setunitPrice] = useState<number>(0)
  const [price, setprice] = useState<number>(0)
  const [urbanUsageCode, seturbanUsageCode] = useState<number>(0)
  const [nonUrbanUsageCode, setnonUrbanUsageCode] = useState<number>(0)

  const handleFileBlob = async (file: File) => {
    const csvString = await file.text()
    const parsedCsv = parseCsvString(csvString)
    if (parsedCsv[0][0] !== 'vpmc-marketCompare-intelligence-config') {
      alert('非本DSS專用config檔案')
      return
    }
    const objectInfo: string[] = parsedCsv[2]

    const assetTypeCodea = findKey(assetTypeSet, (o) => {
      return o === objectInfo[3]
    })
    const urbanUsagea = findKey(urbanUsageSet, (o) => {
      return o === objectInfo[11]
    })
    if (!assetTypeCodea || !urbanUsagea) return
    setobjectTypeCode(0)
    setassetTypeCode(Number(assetTypeCodea))
    setcompletionTime(new Date(objectInfo[7]))
    settransactionTime(new Date(objectInfo[12]))
    settransferFloor(Number(objectInfo[6]))
    setbuildingArea(Number(objectInfo[8]))
    setlandArea(Number(objectInfo[9]))
    setunitPrice(Number(objectInfo[13]))
    setprice(Number(objectInfo[14]))
    seturbanUsageCode(Number(urbanUsagea))
    onUploadClick(false)
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
        <Grid container spacing={1.5}>
          {/* <Grid item xs={4}>
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
          </Grid> */}
          <Grid item xs={4}>
            <FormControl size='small' fullWidth>
              <InputLabel id="object-type">標的類型*</InputLabel>
              <Select
                labelId="object-type"
                label="標的類型"
                id="object-type-select"
                value={objectTypeCode}
                onChange={(event) => {
                  setobjectTypeCode(Number(event.target.value) as ObjectType)
                }}
                size='small'
                fullWidth
              >
                <MenuItem value={0}>建物</MenuItem>
                <MenuItem value={1}>土地</MenuItem>
                <MenuItem value={2}>停車位</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {
            objectTypeCode === 0 && <>
              <Grid item xs={8}>
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
              <Grid item xs={12}>
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
            </>
          }

          {/* 時間 */}
          <Grid item xs={12}>
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

          {/* 面積 */}
          <Grid item xs={12}>
            <FormControl size='small' fullWidth>
              <TextField
                type='number'
                label="建坪面積"
                size='small'
                value={buildingArea}
                disabled={false}
                onChange={(event) => {
                  setbuildingArea(Number(event.target.value))
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 100000
                  }
                }}
                fullWidth
              >
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl size='small' fullWidth>
              <TextField
                type='number'
                label="土地面積"
                size='small'
                value={landArea}
                disabled={false}
                onChange={(event) => {
                  setlandArea(Number(event.target.value))
                }}
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: 10000000
                  }
                }}
                fullWidth
              >
              </TextField>
            </FormControl>
          </Grid>

          {/* 價格 */}
          {/* <Grid item xs={6}>
            <FormControl size='small' fullWidth>
              <TextField
                type='number'
                label="單價"
                size='small'
                value={unitPrice}
                disabled={false}
                onChange={(event) => {
                  setunitPrice(Number(event.target.value))
                }}
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: 10000
                  }
                }}
                fullWidth
              >
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl size='small' fullWidth>
              <TextField
                type='number'
                label="總價"
                size='small'
                value={price}
                disabled={false}
                onChange={(event) => {
                  setprice(Number(event.target.value))
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 1000000000
                  }
                }}
                fullWidth
              >
              </TextField>
            </FormControl>
          </Grid> */}

          {/* 分區 */}
          <Grid item xs={6}>
            <FormControl size='small' fullWidth>
              <InputLabel id="urban-use">使用分區</InputLabel>
              <Select
                labelId="urban-use"
                label="使用分區"
                id="urban-use-select"
                value={urbanUsageCode}
                onChange={(event) => {
                  seturbanUsageCode(Number(event.target.value))
                }}
                size='small'
                fullWidth
              >
                {
                  Object.keys(urbanUsageSet).map((assetCode, index) => {
                    return <MenuItem
                      key={index}
                      value={assetCode}
                    >{urbanUsageSet[Number(assetCode)]}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl size='small' fullWidth>
              <InputLabel id="non-urban-use">非都市土地</InputLabel>
              <Select
                labelId="non-urban-use"
                label="非都市土地"
                id="non-urban-use-select"
                // value={0}
                onChange={(event) => {
                  console.log(Number(event.target.value))
                }}
                size='small'
                disabled
                fullWidth
              >
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
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

        </Grid>
      </LocalizationProvider>

      <Dialog
        open={uploadPanelOpen}
        onClose={() => { onUploadClick(false) }}
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

    </div>
  )
}

export default AttributeQueryIntelligence