import React, { useContext } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MultiChipSelect from '../../../../../components/MultiChipSelect'
import MarketCompareContext from '../../../MarketCompareContext'
import {
  transactionTimeSet, buildingTransactionAreaSet,
  landTransactionAreaSet, ageSet, urbanUsageSet, assetTypeSet
} from '../../../../../lib/marketComapreConst'
import {
  Grid, FormControl, InputLabel, Select,
  Checkbox, MenuItem, TextField
} from '@mui/material'
import { AssetType } from '../../../../../api/prod'

export type AttributeQueryType = 'building' | 'parking' | 'land'

const AttributeQuery = () => {
  const marketCompareContext = useContext(MarketCompareContext)
  return (
    <div className={classNames({
      [style.attributeQuery]: true,
      [style.divide]: true
    })}>

      <Grid container spacing={2}>

        <Grid item xs={marketCompareContext.assetTypeCode === 'building' ? 6 : 12}>
          <FormControl size='small' fullWidth>
            <InputLabel id="asset-type">資產類型*</InputLabel>
            <Select
              labelId="asset-type"
              label="資產類型"
              id="asset-type-select"
              value={marketCompareContext.assetTypeCode}
              onChange={(event) => {
                marketCompareContext.onAssetTypeChange(event.target.value as AssetType)
              }}
              size='small'
              fullWidth
            >
              {
                Object.keys(assetTypeSet).map((assetCode, index) => {
                  return <MenuItem
                    key={index}
                    value={assetTypeSet[assetCode]}
                  >{assetCode}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>

        {
          marketCompareContext.assetTypeCode === 'building' &&
          <Grid item xs={6}>
            <FormControl size='small' fullWidth>
              <InputLabel id="building-type">建物類型*</InputLabel>
              <Select
                labelId="building-type"
                label="建物類型"
                id="building-type-select"
                value={marketCompareContext.buildingTypeCode}
                onChange={(event) => {
                  marketCompareContext.onBuildingTypeChange(Number(event.target.value))
                }}
                size='small'
                fullWidth
              >
                <MenuItem
                  value={0}
                >住宅大樓</MenuItem>
                <MenuItem
                  value={4}
                >華廈</MenuItem>
                <MenuItem
                  value={3}
                >公寓</MenuItem>
                <MenuItem
                  value={5}
                >套房</MenuItem>
                <MenuItem
                  value={6}
                >透天厝</MenuItem>
                <MenuItem
                  value={7}
                >店面</MenuItem>
                <MenuItem
                  value={1}
                >辦公商業大樓</MenuItem>
                <MenuItem
                  value={8}
                >廠辦</MenuItem>
                <MenuItem
                  value={9}
                >倉庫</MenuItem>
                <MenuItem
                  value={10}
                >工廠</MenuItem>
                <MenuItem
                  value={11}
                >農舍</MenuItem>
                <MenuItem
                  value={2}
                >其他</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        }

        {/* 交易時間 */}
        {
          marketCompareContext.isTransactionTimeCustomize
            ? <Grid item xs={12}>
              <span>{`交易時間自訂 ${marketCompareContext.transactionTimeStartString} 至 ${marketCompareContext.transactionTimeEndString}`}</span>
            </Grid>
            : <>
              <Grid item xs={2}>
                <Checkbox
                  checked={marketCompareContext.isTransactionTimeFiltered}
                  onClick={marketCompareContext.onTransactionTimeFilteredChange}
                />
              </Grid>
              <Grid item xs={10}>
                <FormControl size='small' fullWidth>
                  <InputLabel id="transaction-time">交易時間</InputLabel>
                  <Select
                    labelId="transaction-time"
                    label="交易時間"
                    id="transaction-time-select"
                    size='small'
                    value={marketCompareContext.isTransactionTimeFiltered ? marketCompareContext.transactiontime : ''}
                    disabled={!marketCompareContext.isTransactionTimeFiltered}
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
            </>
        }

        {/* 建坪面積 */}
        {
          marketCompareContext.assetTypeCode === 'building'
          && (
            marketCompareContext.isBuildingAreaCustomize
              ? <Grid item xs={12}>
                <span>{`建坪自訂 ${marketCompareContext.buildingTransferAreaInterval[0]}坪 至 ${marketCompareContext.buildingTransferAreaInterval[1]}坪`}</span>
              </Grid>
              : <>
                <Grid item xs={2}>
                  <Checkbox
                    checked={marketCompareContext.isBuildingAreaFiltered}
                    onClick={marketCompareContext.onBuildingAreaFilteredChange}
                    disabled={!marketCompareContext.isBuildingAreaCheckable}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
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
          )
        }

        {/* 地坪面積 */}
        {
          marketCompareContext.assetTypeCode === 'land'
          && (
            marketCompareContext.isLandAreaCustomize
              ? <Grid item xs={12}>
                <span>{`地坪自訂 ${marketCompareContext.landAreaInterval[0]}坪 至 ${marketCompareContext.landAreaInterval[1]}坪`}</span>
              </Grid>
              : <>
                <Grid item xs={2}>
                  <Checkbox
                    checked={marketCompareContext.isLandAreaFiltered}
                    onClick={marketCompareContext.onLandAreaFilteredChange}
                    disabled={!marketCompareContext.isLandAreaCheckable}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
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
          )
        }

        {/* 屋齡 */}
        {
          marketCompareContext.assetTypeCode === 'building'
          && (
            marketCompareContext.isAgeCustomize
              ? <Grid item xs={12}>
                <span>{`屋齡自訂 ${marketCompareContext.ageInterval[0]}年 至 ${marketCompareContext.ageInterval[1]}年`}</span>
              </Grid>
              : <>
                <Grid item xs={2}>
                  <Checkbox
                    checked={marketCompareContext.isAgeFiltered}
                    onClick={marketCompareContext.onAgeFilteredChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
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
          )
        }

        {/* 車位類型 */}
        {
          marketCompareContext.assetTypeCode === 'park'
          && <>
            <Grid item xs={2}>
              <Checkbox
                checked={marketCompareContext.isParkSpaceFiltered}
                onClick={marketCompareContext.onParkSpaceTypeFilteredChange}
              />
            </Grid>
            <Grid item xs={10}>
              <FormControl size='small' fullWidth>
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
                  disabled={!marketCompareContext.isParkSpaceFiltered}
                >
                  <MenuItem
                    value={6}
                  >一樓平面</MenuItem>
                  <MenuItem
                    value={2}
                  >坡道平面</MenuItem>
                  <MenuItem
                    value={3}
                  >升降平面</MenuItem>
                  <MenuItem
                    value={5}
                  >坡道機械</MenuItem>
                  <MenuItem
                    value={4}
                  >升降機械</MenuItem>
                  <MenuItem
                    value={1}
                  >塔式車位</MenuItem>
                  <MenuItem
                    value={7}
                  >其他</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        }

        {/* 使用分區 */}
        {
          marketCompareContext.assetTypeCode !== 'park'
          && <>
            <Grid item xs={2}>
              <Checkbox
                checked={marketCompareContext.isUrbanUsageFiltered}
                onClick={marketCompareContext.onUrbanLaudUseFilteredChange}
              />
            </Grid>
            <Grid item xs={5}>
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
        }

        {/* 非都市土地分區 */}
        {
          marketCompareContext.assetTypeCode !== 'park'
          && <>
            <Grid item xs={5}>
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
        }

        {/* 建物總價 */}
        {
          marketCompareContext.assetTypeCode === 'building'
          && <>
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
        }

        {/* 建物單價 */}
        {
          marketCompareContext.assetTypeCode === 'building'
          && <>
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
        }

      </Grid>
    </div>
  )
}

export default AttributeQuery