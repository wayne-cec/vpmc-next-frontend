import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import {
  Tooltip, Dialog, DialogTitle,
  DialogContent, Button, DialogActions,
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Link
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { BulletinFileType, IStaticFile } from '../../../api/prod'
import api from '../../../api'
import { LawFileType } from '../../../api/prod'

const GeneralLaw = () => {
  const [lawBtnHover, setlawBtnHover] = useState<boolean>(false)
  const [lawFileDialogOpen, setlawFileDialogOpen] = useState<boolean>(false)

  const [lawExpanded, setlawExpanded] = useState<LawFileType | false>(false)
  const [appraisalLawFiles, setappraisalLawFiles] = useState<IStaticFile[]>([])
  const [urbanLawFiles, seturbanLawFiles] = useState<IStaticFile[]>([])
  const [publicAssetLawFiles, setpublicAssetLawFiles] = useState<IStaticFile[]>([])
  const [urbanUpdateFiles, seturbanUpdateFiles] = useState<IStaticFile[]>([])
  const [insuranceLawFiles, setinsuranceLawFiles] = useState<IStaticFile[]>([])

  const handleLawChange =
    (panel: LawFileType) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setlawExpanded(isExpanded ? panel : false);
    }

  const getStaticLawFiles = async (type: LawFileType) => {
    const responseContent = await api.prod.getStaticLawFiles(type)
    if (responseContent) {
      if (type === 'AppraisalLaw') setappraisalLawFiles(responseContent)
      if (type === 'UrbanLaw') seturbanLawFiles(responseContent)
      if (type === 'PublicAssetLaw') setpublicAssetLawFiles(responseContent)
      if (type === 'UrbanUpdateLaw') seturbanUpdateFiles(responseContent)
      if (type === 'InsuranceLaw') setinsuranceLawFiles(responseContent)
    }
  }

  useEffect(() => {
    getStaticLawFiles('AppraisalLaw')
    getStaticLawFiles('UrbanLaw')
    getStaticLawFiles('PublicAssetLaw')
    getStaticLawFiles('UrbanUpdateLaw')
    getStaticLawFiles('InsuranceLaw')
  }, [])

  return (
    <>
      <Tooltip title='估價相關法令'>
        <div className={classNames({
          [style.lawBtn]: true
        })}
          onMouseOver={() => { setlawBtnHover(true) }}
          onMouseLeave={() => { setlawBtnHover(false) }}
          onClick={() => { setlawFileDialogOpen(true) }}
        >
          <Image src={lawBtnHover ? '/law/scroll-hover.png' : '/law/scroll.png'} width='32px' height='32px' />
        </div>
      </Tooltip>
      <Dialog
        open={lawFileDialogOpen}
        onClose={() => { setlawFileDialogOpen(false) }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">估價相關法令</DialogTitle>

        <DialogContent>
          <Accordion expanded={lawExpanded === 'AppraisalLaw'} onChange={handleLawChange('AppraisalLaw')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>估價法令</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }} >
              {
                appraisalLawFiles.map((file, index) => {
                  return <Link href={file.serverPath} underline="hover" key={index}
                    target="_blank" rel="noopener"
                  >
                    {file.alias}
                  </Link>
                })
              }
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={lawExpanded === 'UrbanLaw'} onChange={handleLawChange('UrbanLaw')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>都市計畫法令</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
              {
                urbanLawFiles.map((file, index) => {
                  return <Link href={file.serverPath} underline="hover" key={index}
                    target="_blank" rel="noopener">
                    {file.alias}
                  </Link>
                })
              }
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={lawExpanded === 'PublicAssetLaw'} onChange={handleLawChange('PublicAssetLaw')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>公有財產法令</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
              {
                publicAssetLawFiles.map((file, index) => {
                  return <Link href={file.serverPath} underline="hover" key={index}
                    target="_blank" rel="noopener">
                    {file.alias}
                  </Link>
                })
              }
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={lawExpanded === 'UrbanUpdateLaw'} onChange={handleLawChange('UrbanUpdateLaw')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>都市更新法令</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
              {
                urbanUpdateFiles.map((file, index) => {
                  return <Link href={file.serverPath} underline="hover" key={index}
                    target="_blank" rel="noopener">
                    {file.alias}
                  </Link>
                })
              }
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={lawExpanded === 'InsuranceLaw'} onChange={handleLawChange('InsuranceLaw')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>保險業資產評價估法令</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
              {
                insuranceLawFiles.map((file, index) => {
                  return <Link href={file.serverPath} underline="hover" key={index}
                    target="_blank" rel="noopener">
                    {file.alias}
                  </Link>
                })
              }
            </AccordionDetails>
          </Accordion>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => { setlawFileDialogOpen(false) }}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GeneralLaw