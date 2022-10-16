import React, { useEffect } from 'react'
import style from './index.module.scss'
import dynamic from 'next/dynamic'
import api from '../../api'
import Head from 'next/head'
import moment from 'moment'
import QueryPanel from './QueryPanel'
import ResultPanel from './ResultPanel'
import AprDetailContent from './AprDetailContent'
import MarketCompareContext from './MarketCompareContext'
import PanelContainer from '../../components/PanelContainer'
import PanelButton from '../../components/PanelContainer/PanelButton'
import WithNavProtected from '../../layout/front-layout/WithNavProtected'
import useMarketCompareStates from './MarketCompareStates'
import {
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Button
} from '@mui/material'
import { IMarketCompare } from '../../api/prod'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slice/user'
import { useLazyGetAssetDetailByAprIdQuery } from '../../store/services/apr'

const square = 3.305785

export type SpatialQueryType = 'buffer' | 'polygon' | 'circle' | 'rectangle' | 'none' | 'clear'

const MarketMapContainer = dynamic(
  () => import('../../components/MapContainer/MarketCompareMap'),
  { ssr: false }
)

const MarketCompareContainer = () => {
  const mcStates = useMarketCompareStates()
  const [trigger, { isFetching }] = useLazyGetAssetDetailByAprIdQuery()

  useEffect(() => {
    if (mcStates.filteredResults?.length === 0) {
      mcStates.setmsgOpen(true)
      mcStates.seterrorTitle('訊息')
      mcStates.seterrorContent('查無資料')
    }
  }, [mcStates.filteredResults])

  useEffect(() => {
    (async () => {
      if (mcStates.filteredResults == null) return
      if (mcStates.filteredResults.length === 0) return
      const detailApr = mcStates.filteredResults.filter(apr => apr.id === mcStates.detailAprId.id)
      if (detailApr.length === 0) {
        mcStates.setdetailPanelShow(false)
        mcStates.setmsgOpen(true)
        mcStates.seterrorTitle('訊息')
        mcStates.seterrorContent(`查無 ${mcStates.detailAprId.id} 的詳細資訊，請聯繫開發人員。`)
        return
      }
      const commiteeName = await mcStates.handleGetCommiteeByAprId(mcStates.detailAprId.id)
      const response = await trigger({
        id: mcStates.detailAprId.id
      })
      console.log(response.data)
      mcStates.setassetDetail(response.data)
      mcStates.setdetailPanelShow(true)
      mcStates.setdetailAprInfo({
        ...detailApr[0],
        organization: commiteeName ? commiteeName : '無管委會',
        assetsDetail: response.data
      })
    })()
  }, [mcStates.detailAprId])

  useEffect(() => {
    const fetchDefaultCountyData = async () => {
      const { statusCode, responseContent } = await api.prod.listCountiesByRegion()
      if (statusCode === 200) {
        mcStates.setcountyData(responseContent)
        mcStates.setcounty(responseContent['北部'][0].name)
        const { statusCode, responseContent2 } = await api.prod.listTownsByCounty(responseContent['北部'][0].name)
        if (statusCode === 200) {
          mcStates.settownData(responseContent2)
          mcStates.settowns([responseContent2['鄉鎮市區'][0].name])
        }
      }
    }
    fetchDefaultCountyData()
  }, [])

  return (
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/yuantai.ico" />
      </Head>
      <MarketCompareContext.Provider
        value={{
          ...mcStates,
          onUploadClick: (value) => { mcStates.setuploadPanelOpen(value) },
          onCoordinatorSelectorClick: (value) => { mcStates.setisCoordinateSelectorActive(value) },
          onSpatialQueryTypeChange: mcStates.setspatialQueryType,
          onBufferRadiusChange: (value) => { mcStates.setbufferRadius(value) },
          onSketchModeChange: (value) => { mcStates.setsketchMode(value) },
          onDraw: () => { mcStates.setsketchMode('draw') },
          onClear: () => { mcStates.setspatialQueryType('clear') },
          onAssetTypeChange: (value) => { mcStates.setassetTypeCode(value) },
          onBuildingTypeChange: (value) => { mcStates.setbuildingTypeCode(value) },
          onTransactionTimeFilteredChange: () => {
            mcStates.setisTransactionTimeFiltered(prev => !prev)
            mcStates.settransactionTime(1)
          },
          onTransactionTimeSelect: (value) => {
            mcStates.settransactionTime(value)
            mcStates.setisTransactionTimeFosced(true)
          },
          onBuildingAreaFilteredChange: () => {
            mcStates.setisBuildingAreaFiltered(prev => !prev)
            mcStates.setbuildingTransferArea(0)
          },
          onBuildingAreaSelect: (value) => {
            mcStates.setbuildingTransferArea(value)
            mcStates.setisBuildingAreaFosced(true)
          },
          onLandAreaFilteredChange: () => {
            mcStates.setisLandAreaFiltered(prev => !prev)
            mcStates.setlandTransferArea(0)
          },
          onLandAreaSelect: (value) => {
            mcStates.setlandTransferArea(value)
            mcStates.setisLandAreaFosced(true)
          },
          onAgeFilteredChange: () => {
            mcStates.setisAgeFiltered(prev => !prev)
            mcStates.setage(0)
          },
          onAgeSelect: (value) => {
            mcStates.setage(value)
            mcStates.setisAgeFosced(true)
          },
          onParkSpaceTypeFilteredChange: () => {
            mcStates.setisParkSpaceFiltered(prev => !prev)
            mcStates.setparkSpaceType(0)
          },
          onParkSpaceTypeSelect: (value) => {
            mcStates.setparkSpaceType(value)
            mcStates.setisParkSpaceFosced(true)
          },
          onUrbanLaudUseFilteredChange: () => {
            mcStates.setisUrbanUsageFiltered(prev => !prev)
            mcStates.seturbanLandUse([0])
          },
          onUrbanLaudUseSelect: (value) => {
            mcStates.seturbanLandUse(value)
            mcStates.setisUrbanUsageFosced(true)
          },
          onPriceFilteredChange: () => {
            mcStates.setisPriceFiltered(prev => !prev)
          },
          onMinPriceChange: (value) => {
            mcStates.setminPrice(value)
          },
          onMaxPriceChange: (value) => {
            mcStates.setmaxPrice(value)
          },

          onUnitPriceFilteredChange: () => {
            mcStates.setisUnitPriceFiltered(prev => !prev)
          },
          onMinUnitPriceChange: (value) => {
            mcStates.setminUnitPrice(value)
          },
          onMaxUnitPriceChange: (value) => {
            mcStates.setmaxUnitPrice(value)
          },
          onCustomizeParamBtnClick: () => {
            mcStates.setmsgOpen(true)
            mcStates.seterrorTitle('訊息')
            mcStates.seterrorContent('自定義參數功能尚未開發')
          },
          zoomId: mcStates.zoomId,
          pending: mcStates.pending,
          onZoomIdChange: (value) => { mcStates.setzoomId(value) },
          setpending: (value) => { mcStates.setpending(value) },
          onDetailAprChange: (id) => { mcStates.setdetailAprId({ id: id }) },
          onShow: (value) => { mcStates.setdetailPanelShow(value) },
          onResultPanelClose: () => { mcStates.setfilteredResults(null) },
          onCountyRadioClick: () => {
            mcStates.setmsgOpen(true)
            mcStates.seterrorTitle('警告')
            mcStates.seterrorContent('此方法會調出大量資料，請謹慎使用。')
          },
          onCountyChange: (county) => {
            mcStates.setcounty(county)
            mcStates.reFetchTownData(county)
          },
          onTownChange: (towns) => {
            mcStates.settowns(towns)
          },
          handleCoordinateSelect: (longitude, latitude) => {
            if (longitude)
              mcStates.setlongitude(longitude)
            if (latitude)
              mcStates.setlatitude(latitude)
          },
          onCoordinateSelect: (longitude, latitude) => {
            mcStates.handleCoordinateSelect(longitude, latitude)
          }
        }}
      >
        <div className={style.main}>
          <PanelContainer>
            <PanelButton
              content='查詢'
              icon={mcStates.queryPanelShow || mcStates.queryPanelHover ? '/marketCompare/magnifier-focused.png' : '/marketCompare/magnifier.png'}
              focused={mcStates.queryPanelShow}
              onClick={mcStates.handleShowQueryPanel}
              onHover={(value) => { mcStates.setqueryPanelHover(value) }}
            />
            <PanelButton
              content='結果'
              icon={mcStates.resultPanelShow || mcStates.resultPanelHover ? '/marketCompare/sheet-focused.png' : '/marketCompare/sheet.png'}
              focused={mcStates.resultPanelShow}
              onClick={mcStates.handleShowResultPanel}
              onHover={(value) => { mcStates.setresultPanelHover(value) }}
            />
          </PanelContainer>
          <QueryPanel />
          <ResultPanel />
          <div className={style.content}>
            <div className={style.mapContainer}>
              <MarketMapContainer
                onCoordinateSelect={mcStates.handleCoordinateSelect}
                onSketchModeChange={mcStates.setsketchMode}
                onGeojsonChange={mcStates.setpolygonGoejson}
                onSpatialQueryTypeChange={mcStates.setspatialQueryType}
              />
            </div>
          </div>
        </div>
      </MarketCompareContext.Provider>
      <Dialog
        open={mcStates.msgOpen}
        onClose={mcStates.handleErrorDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {mcStates.errorTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mcStates.errorContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={mcStates.handleErrorDialogClose}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={mcStates.detailPanelShow}
        onClose={() => {
          mcStates.setdetailPanelShow(false)
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"
          sx={{ paddingBottom: '0px' }}
        >
          {mcStates.detailAprInfo && mcStates.detailAprInfo.address}
        </DialogTitle>

        <DialogContent sx={{ width: '900px' }}>
          {
            mcStates.detailAprInfo && <AprDetailContent
              {...mcStates.detailAprInfo}
            />
          }
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            mcStates.setdetailPanelShow(false)
          }}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default WithNavProtected(MarketCompareContainer)
