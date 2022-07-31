import MarketCompareDocument from '../../components/Document/MarketCompareDocument'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import {
  Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Button
} from '@mui/material'
import { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Data } from '../MarketCompareContainer/ResultPanel/ResultTable'

const documentId = 'marketCompareDocument'

export interface IMarketCompareDocumentContainer {
  aprData: Data[]
}

const MarketCompareDocumentContainer = ({
  aprData
}: IMarketCompareDocumentContainer) => {
  const [fileNameDialogOpen, setfileNameDialogOpen] = useState<boolean>(false)
  const [filename, setfilename] = useState<string>('市場比較文件')
  const [mapScreenshotUrl, setmapScreenshotUrl] = useState<string | undefined>(undefined)
  const [screenshotFlag, setscreenshotFlag] = useState<{ value: boolean }>({ value: false })

  const handleExportPDF = async () => {
    setfileNameDialogOpen(false)
    const doc = new jsPDF()
    const image = await html2canvas(document.getElementById(documentId) as HTMLElement, {
      scale: 3
    })
    doc.addImage({ imageData: image, x: 0, y: 0, width: 210, height: 297 })
    doc.save(`${filename}.pdf`)
  }

  return (
    <div className={style.MarketCompareDocumentContainer}>

      <div className={style.Container}>
        <div className={style.PaperContainer}>
          <MarketCompareDocument
            pid={documentId}
            aprData={aprData}
            mapScreenshotUrl={mapScreenshotUrl}
            screenshotFlag={screenshotFlag}
            onScreenShotTaken={(dataUrl: string) => {
              setmapScreenshotUrl(dataUrl)
            }}
          />
        </div>

        <div className={style.ActionContainer}>
          <div className={classNames({
            [style.Action]: true
          })}
            onClick={() => {
              setfileNameDialogOpen(true)
              setscreenshotFlag({ value: false })
            }}
          >
            <Image src={'/document/pdf.png'} width='48px' height='48px' />
          </div>
          <div className={classNames({
            [style.Action]: true,
            [style.disabled]: true
          })}>
            <Image src={'/document/line.png'} width='48px' height='48px' />
          </div>
        </div>
      </div>

      <Dialog
        open={fileNameDialogOpen}
        onClose={() => { setfileNameDialogOpen(false) }}
      >
        <DialogTitle>請輸入檔名</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="項次"
            type="text"
            fullWidth
            variant="standard"
            value={filename}
            onChange={(event) => { setfilename(event.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExportPDF}>輸出</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default MarketCompareDocumentContainer
