import style from './index.module.scss'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import MarketCompareContext from '../MarketCompareContext'
import { useContext, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

const CustomizeParamsPanel = ({
  open
}: { open: boolean }) => {
  const marketCompareContext = useContext(MarketCompareContext)
  const [startDate, setstartDate] = useState<Dayjs>(dayjs(marketCompareContext.transactionTimeStartString))
  const [endDate, setendDate] = useState<Dayjs>(dayjs(marketCompareContext.transactionTimeEndString))
  const [minBuildingArea, setminBuildingArea] = useState<number>(marketCompareContext.buildingTransferAreaInterval[0])
  const [maxBuildingArea, setmaxBuildingArea] = useState<number>(marketCompareContext.buildingTransferAreaInterval[1])
  const [minAge, setminAge] = useState<number>(marketCompareContext.ageInterval[0])
  const [maxAge, setmaxAge] = useState<number>(marketCompareContext.ageInterval[1])
  const [minLandArea, setminLandArea] = useState<number>(marketCompareContext.landAreaInterval[0])
  const [maxLandArea, setmaxLandArea] = useState<number>(marketCompareContext.landAreaInterval[1])

  const handleSetCustomizeParam = () => {
    marketCompareContext.onCustomizePanelOpen(false)

    if (marketCompareContext.isTransactionTimeCustomize) {
      marketCompareContext.onTransactionTimeCustomize(
        startDate.toString(), endDate.toString()
      )
    }

    if (marketCompareContext.isBuildingAreaCustomize) {
      marketCompareContext.onBuildingAreaCustomize(
        minBuildingArea, maxBuildingArea
      )
    }

    if (marketCompareContext.isLandAreaCustomize) {
      marketCompareContext.onLandAreaCustomize(
        minLandArea, maxLandArea
      )
    }

    if (marketCompareContext.isAgeCustomize) {
      marketCompareContext.onAgeCustomize(
        minAge, maxAge
      )
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleSetCustomizeParam}
    >
      <DialogTitle>自定義參數</DialogTitle>
      <DialogContent>
        <div className={style.CustomizeParamsPanel}>
          <Grid container spacing={2}>

            {/* 交易時間 */}
            <Grid item xs={2}>
              <Checkbox
                checked={marketCompareContext.isTransactionTimeCustomize}
                onClick={marketCompareContext.onTransactionTimeCustomizeChange}
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={5}>
                <DesktopDatePicker
                  label="開始日期"
                  inputFormat="YYYY/MM/DD"
                  value={startDate}
                  onChange={(newValue) => {
                    if (newValue) setstartDate(newValue)
                  }}
                  renderInput={(params) => <TextField size='small' {...params} />}
                  disabled={!marketCompareContext.isTransactionTimeCustomize}
                />
              </Grid>
              <Grid item xs={5}>
                <DesktopDatePicker
                  label="結束日期"
                  inputFormat="YYYY/MM/DD"
                  value={endDate}
                  onChange={(newValue) => {
                    if (newValue) setendDate(newValue)
                  }}
                  renderInput={(params) => <TextField size='small' {...params} />}
                  disabled={!marketCompareContext.isTransactionTimeCustomize}
                />
              </Grid>
            </LocalizationProvider>

            {/* 建坪面積 */}
            {
              marketCompareContext.assetTypeCode === 'building' &&
              <>
                <Grid item xs={2}>
                  <Checkbox
                    checked={marketCompareContext.isBuildingAreaCustomize}
                    onClick={marketCompareContext.onBuildingAreaCustomizeChange}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    size='small'
                    type='number'
                    label='最小建坪面積'
                    InputProps={{ inputProps: { min: 0, max: maxBuildingArea } }}
                    value={minBuildingArea}
                    onChange={(e) => {
                      setminBuildingArea(Number(e.target.value))
                    }}
                    disabled={!marketCompareContext.isBuildingAreaCustomize}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    size='small'
                    type='number'
                    label='最大建坪面積'
                    InputProps={{ inputProps: { min: minBuildingArea } }}
                    value={maxBuildingArea}
                    onChange={(e) => {
                      setmaxBuildingArea(Number(e.target.value))
                    }}
                    disabled={!marketCompareContext.isBuildingAreaCustomize}
                    fullWidth
                  />
                </Grid>
              </>
            }

            {/* 土地面積 */}
            {
              marketCompareContext.assetTypeCode === 'land' &&
              <>
                <Grid item xs={2}>
                  <Checkbox
                    checked={marketCompareContext.isLandAreaCustomize}
                    onClick={marketCompareContext.onLandAreaCustomizeChange}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    size='small'
                    type='number'
                    label='最小土地面積'
                    InputProps={{ inputProps: { min: 0, max: maxLandArea } }}
                    value={minLandArea}
                    onChange={(e) => {
                      setminLandArea(Number(e.target.value))
                    }}
                    disabled={!marketCompareContext.isLandAreaCustomize}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    size='small'
                    type='number'
                    label='最大土地面積'
                    InputProps={{ inputProps: { min: minLandArea } }}
                    value={maxLandArea}
                    onChange={(e) => {
                      setmaxLandArea(Number(e.target.value))
                    }}
                    disabled={!marketCompareContext.isLandAreaCustomize}
                    fullWidth
                  />
                </Grid>
              </>
            }

            {/* 屋齡 */}
            {
              marketCompareContext.assetTypeCode === 'building' &&
              <>
                <Grid item xs={2}>
                  <Checkbox
                    checked={marketCompareContext.isAgeCustomize}
                    onClick={marketCompareContext.onAgeCustomizeChange}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    size='small'
                    type='number'
                    label='最小屋齡'
                    InputProps={{ inputProps: { min: 0, max: maxAge } }}
                    value={minAge}
                    onChange={(e) => {
                      setminAge(Number(e.target.value))
                    }}
                    disabled={!marketCompareContext.isAgeCustomize}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    size='small'
                    type='number'
                    label='最大屋齡'
                    InputProps={{ inputProps: { min: minAge } }}
                    value={maxAge}
                    onChange={(e) => {
                      setmaxAge(Number(e.target.value))
                    }}
                    disabled={!marketCompareContext.isAgeCustomize}
                    fullWidth
                  />
                </Grid>
              </>
            }

          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSetCustomizeParam}>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomizeParamsPanel
