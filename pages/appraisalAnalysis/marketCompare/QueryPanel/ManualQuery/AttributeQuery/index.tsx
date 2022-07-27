import React, { useContext } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MultiChipSelect from '../../../../../../components/MultiChipSelect'
import MarketCompareContext, { IMarketCompareContext } from '../../../MarketCompareContext'
import {
  assetTypeSet, transactionTimeSet, buildingTransactionAreaSet,
  landTransactionAreaSet, ageSet, parkSpaceSet, urbanUsageSet
} from '../../../../../../lib/marketComapreConst'
import {
  Grid, FormControl, InputLabel, Select,
  Checkbox, MenuItem, TextField
} from '@mui/material'
import { assetTypeMapping } from '../../../../../../api/prod'

export type AttributeQueryType = 'building' | 'parking' | 'land'

const getAttributeQueryType = (
  assetTypeMapping: { [key: number]: number },
  marketCompareContext: IMarketCompareContext
) => {
  if (assetTypeMapping[marketCompareContext.assetTypeCode] !== 100 && assetTypeMapping[marketCompareContext.assetTypeCode] !== 200) {
    return 'building'
  } else if (assetTypeMapping[marketCompareContext.assetTypeCode] === 100) {
    return 'land'
  } else if (assetTypeMapping[marketCompareContext.assetTypeCode] === 200) {
    return 'parking'
  }
}

const AttributeQuery = () => {
  const marketCompareContext = useContext(MarketCompareContext)
  return (
    <div className={classNames({
      [style.attributeQuery]: true,
      [style.divide]: true
    })}>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControl size='small' fullWidth>
            <InputLabel id="asset-type">資產類型*</InputLabel>
            <Select
              labelId="asset-type"
              label="資產類型"
              id="asset-type-select"
              value={marketCompareContext.assetTypeCode}
              onChange={(event) => {
                marketCompareContext.onAssetTypeChange(Number(event.target.value))
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

        {/* 交易時間 */}
        <Grid item xs={2}>
          <Checkbox
            checked={marketCompareContext.isTransactionTimeFiltered}
            onClick={marketCompareContext.onTransactionTimeFilteredChange}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControl size='small' fullWidth>
            {/* {
              marketCompareContext.isTransactionTimeFiltered && !marketCompareContext.isTransactionTimeFosced
                ? <></>
                : <InputLabel id="transaction-time">交易時間</InputLabel>
            } */}
            <InputLabel id="transaction-time">交易時間</InputLabel>
            <Select
              labelId="transaction-time"
              label="交易時間"
              id="transaction-time-select"
              size='small'
              value={marketCompareContext.isTransactionTimeFiltered ? marketCompareContext.transactiontime : ''}
              disabled={!marketCompareContext.isTransactionTimeFiltered}
              // autoFocus={isTransactionTimeFiltered}
              onChange={(event) => {
                marketCompareContext.onTransactionTimeSelect(Number(event.target.value))
              }}
              fullWidth
            >
              {
                Object.keys(transactionTimeSet).map((assetCode, index) => {
                  return <MenuItem
                    key={index}
                    value={assetCode}
                  >{transactionTimeSet[Number(assetCode)]}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>

        {/* 建坪面積 */}
        {
          getAttributeQueryType(assetTypeMapping, marketCompareContext) === 'building'
            ? <>
              <Grid item xs={2}>
                <Checkbox
                  checked={marketCompareContext.isBuildingAreaFiltered}
                  onClick={marketCompareContext.onBuildingAreaFilteredChange}
                  disabled={!marketCompareContext.isBuildingAreaCheckable}
                />
              </Grid>
              <Grid item xs={10}>
                <FormControl size='small' fullWidth>
                  {/* {
                    marketCompareContext.isBuildingAreaFiltered && !marketCompareContext.isBuildingAreaFosced
                      ? <></>
                      : <InputLabel id="building-transfer-area">建坪面積</InputLabel>
                  } */}
                  <InputLabel id="building-transfer-area">建坪面積</InputLabel>
                  <Select
                    labelId="building-transfer-area"
                    label="建坪面積"
                    id="building-transfer-area-select"
                    size='small'
                    value={marketCompareContext.isBuildingAreaFiltered ? marketCompareContext.buildingTransferArea : ''}
                    onChange={(event) => {
                      marketCompareContext.onBuildingAreaSelect(Number(event.target.value))
                    }}
                    disabled={!marketCompareContext.isBuildingAreaFiltered}
                    // autoFocus={isBuildingAreaFiltered}
                    fullWidth
                  >
                    {
                      Object.keys(buildingTransactionAreaSet).map((assetCode, index) => {
                        return <MenuItem
                          key={index}
                          value={assetCode}
                        >{buildingTransactionAreaSet[Number(assetCode)]}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </>
            : null
        }

        {/* 地坪面積 */}
        {
          getAttributeQueryType(assetTypeMapping, marketCompareContext) === 'land'
            ? <>
              <Grid item xs={2}>
                <Checkbox
                  checked={marketCompareContext.isLandAreaFiltered}
                  onClick={marketCompareContext.onLandAreaFilteredChange}
                  disabled={!marketCompareContext.isLandAreaCheckable}
                />
              </Grid>
              <Grid item xs={10}>
                <FormControl size='small' fullWidth>
                  {/* {
                    marketCompareContext.isLandAreaFiltered && !marketCompareContext.isLandAreaFosced
                      ? <></>
                      : <InputLabel id="land-transfer-area">地坪面積</InputLabel>
                  } */}
                  <InputLabel id="land-transfer-area">地坪面積</InputLabel>
                  <Select
                    labelId="land-transfer-area"
                    label="地坪面積"
                    id="land-transfer-area-select"
                    size='small'
                    fullWidth
                    value={marketCompareContext.isLandAreaFiltered ? marketCompareContext.landTransferArea : ''}
                    onChange={(event) => {
                      marketCompareContext.onLandAreaSelect(Number(event.target.value))
                    }}
                    // autoFocus={isLandAreaFiltered}
                    disabled={!marketCompareContext.isLandAreaFiltered}
                  >
                    {
                      Object.keys(landTransactionAreaSet).map((assetCode, index) => {
                        return <MenuItem
                          key={index}
                          value={assetCode}
                        >{landTransactionAreaSet[Number(assetCode)]}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </>
            : null
        }

        {/* 屋齡 */}
        {
          getAttributeQueryType(assetTypeMapping, marketCompareContext) === 'building'
            ? <>
              <Grid item xs={2}>
                <Checkbox
                  checked={marketCompareContext.isAgeFiltered}
                  onClick={marketCompareContext.onAgeFilteredChange}
                />
              </Grid>
              <Grid item xs={10}>
                <FormControl size='small' fullWidth>
                  {/* {
                    marketCompareContext.isAgeFiltered && !marketCompareContext.isAgeFosced
                      ? <></>
                      : <InputLabel id="age">屋齡</InputLabel>
                  } */}
                  <InputLabel id="age">屋齡</InputLabel>
                  <Select
                    labelId="age"
                    label="屋齡"
                    id="age-select"
                    size='small'
                    value={marketCompareContext.isAgeFiltered ? marketCompareContext.age : ''}
                    onChange={(event) => {
                      marketCompareContext.onAgeSelect(Number(event.target.value))
                    }}
                    disabled={!marketCompareContext.isAgeFiltered}
                    // autoFocus={isAgeFiltered}
                    fullWidth
                  >
                    {
                      Object.keys(ageSet).map((assetCode, index) => {
                        return <MenuItem
                          key={index}
                          value={assetCode}
                        >{ageSet[Number(assetCode)]}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </>
            : null
        }

        {/* 車位類型 */}
        {
          getAttributeQueryType(assetTypeMapping, marketCompareContext) === 'parking'
            ? <>
              <Grid item xs={2}>
                <Checkbox
                  checked={marketCompareContext.isParkSpaceFiltered}
                  onClick={marketCompareContext.onParkSpaceTypeFilteredChange}
                />
              </Grid>
              <Grid item xs={10}>
                <FormControl size='small' fullWidth>
                  {/* {
                    marketCompareContext.isParkSpaceFiltered && !marketCompareContext.isParkSpaceFosced
                      ? <></>
                      : <InputLabel id="park-space">車位類型</InputLabel>
                  } */}
                  <InputLabel id="park-space">車位類型</InputLabel>
                  <Select
                    labelId="park-space"
                    label="車位類型"
                    id="park-space-select"
                    size='small'
                    fullWidth
                    value={marketCompareContext.isParkSpaceFiltered ? marketCompareContext.parkSpaceType : ''}
                    onChange={(event) => {
                      marketCompareContext.onParkSpaceTypeSelect(Number(event.target.value))
                    }}
                    // autoFocus={isParkSpaceFiltered}
                    disabled={!marketCompareContext.isParkSpaceFiltered}
                  >
                    {
                      Object.keys(parkSpaceSet).map((assetCode, index) => {
                        return <MenuItem
                          key={index}
                          value={assetCode}
                        >{parkSpaceSet[Number(assetCode)]}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </>
            : null
        }

        {/* 使用分區 */}
        {
          getAttributeQueryType(assetTypeMapping, marketCompareContext) !== 'parking'
            ? <>
              <Grid item xs={2}>
                <Checkbox
                  checked={marketCompareContext.isUrbanUsageFiltered}
                  onClick={marketCompareContext.onUrbanLaudUseFilteredChange}
                />
              </Grid>
              <Grid item xs={10}>
                <MultiChipSelect
                  placeholder='使用分區'
                  urbanLandUse={marketCompareContext.urbanLandUse}
                  urbanUsageSet={urbanUsageSet}
                  isUrbanUsageFiltered={marketCompareContext.isUrbanUsageFiltered}
                  isUrbanUsageFosced={marketCompareContext.isUrbanUsageFosced}
                  onChange={(value) => {
                    marketCompareContext.onUrbanLaudUseSelect(value)
                  }}
                />
              </Grid>
            </>
            : null
        }

        {/* 分都市土地分區 */}
        {
          getAttributeQueryType(assetTypeMapping, marketCompareContext) !== 'parking'
            ? <>
              <Grid item xs={2}>
                <Checkbox
                  checked={false}
                  onClick={() => { }}
                  disabled
                />
              </Grid>
              <Grid item xs={10}>
                {/* <MultiChipSelect
                  placeholder='非都市土地分區'
                  urbanLandUse={undefined}
                  urbanUsageSet={urbanUsageSet}
                  isUrbanUsageFiltered={false}
                  isUrbanUsageFosced={false}
                  onChange={(value) => {
                    marketCompareContext.onUrbanLaudUseSelect(value)
                  }}
                /> */}
                <FormControl size='small' fullWidth>
                  <InputLabel id="aaa">非都市土地分區</InputLabel>
                  <Select
                    labelId="aaa"
                    label="非都市土地分區"
                    id="aaa-select"
                    size='small'
                    fullWidth
                    value={''}
                    onChange={(event) => { }}
                    disabled={true}
                  >
                  </Select>
                </FormControl>
              </Grid>
            </>
            : null
        }

        {/* 建物總價 */}
        {
          getAttributeQueryType(assetTypeMapping, marketCompareContext) === 'building'
            ? <>
              <Grid item xs={2}>
                <Checkbox
                  checked={marketCompareContext.isPriceFiltered}
                  onClick={marketCompareContext.onPriceFilteredChange}
                />
              </Grid>
              <Grid item xs={5}>
                <FormControl size='small' fullWidth>
                  <TextField
                    type='number'
                    label="建物總價下限(萬)"
                    size='small'
                    value={marketCompareContext.minPrice}
                    disabled={!marketCompareContext.isPriceFiltered}
                    onChange={(event) => {
                      marketCompareContext.onMinPriceChange(Number(event.target.value))
                    }}
                    InputProps={{
                      inputProps: {
                        min: 0,
                        max: marketCompareContext.maxPrice
                      }
                    }}
                    fullWidth
                  >
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <FormControl size='small' fullWidth>
                  <TextField
                    type='number'
                    label="建物總價上限(萬)"
                    size='small'
                    value={marketCompareContext.maxPrice}
                    disabled={!marketCompareContext.isPriceFiltered}
                    onChange={(event) => {
                      marketCompareContext.onMaxPriceChange(Number(event.target.value))
                    }}
                    InputProps={{
                      inputProps: {
                        min: marketCompareContext.minPrice
                      }
                    }}
                    fullWidth
                  ></TextField>
                </FormControl>
              </Grid>
            </>
            : null
        }

        {/* 建物單價 */}
        {
          getAttributeQueryType(assetTypeMapping, marketCompareContext) === 'building'
            ? <>
              <Grid item xs={2}>
                <Checkbox
                  checked={marketCompareContext.isUnitPriceFiltered}
                  onClick={marketCompareContext.onUnitPriceFilteredChange}
                />
              </Grid>
              <Grid item xs={5}>
                <FormControl size='small' fullWidth>
                  <TextField
                    type='number'
                    label="建物單價下限(萬)"
                    size='small'
                    value={marketCompareContext.minUnitPrice}
                    disabled={!marketCompareContext.isUnitPriceFiltered}
                    onChange={(event) => {
                      marketCompareContext.onMinUnitPriceChange(Number(event.target.value))
                    }}
                    InputProps={{
                      inputProps: {
                        min: 0,
                        max: marketCompareContext.maxUnitPrice
                      }
                    }}
                    fullWidth
                  >
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <FormControl size='small' fullWidth>
                  <TextField
                    type='number'
                    label="建物單價上限(萬)"
                    size='small'
                    value={marketCompareContext.maxUnitPrice}
                    disabled={!marketCompareContext.isUnitPriceFiltered}
                    onChange={(event) => {
                      marketCompareContext.onMaxUnitPriceChange(Number(event.target.value))
                    }}
                    InputProps={{
                      inputProps: {
                        min: marketCompareContext.minUnitPrice
                      }
                    }}
                    fullWidth
                  ></TextField>
                </FormControl>
              </Grid>
            </>
            : null
        }

      </Grid>
    </div>
  )
}

export default AttributeQuery