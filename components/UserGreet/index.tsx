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
import api from '../../api'
import { BulletinFileType, IStaticFile } from '../../api/prod'

export interface IUserGreet {
  username: string
}

const UserGreet = (props: IUserGreet) => {
  const [bulletinBtnHover, setbulletinBtnHover] = useState<boolean>(false)
  const [lawBtnHover, setlawBtnHover] = useState<boolean>(false)
  const [lawFileDialogOpen, setlawFileDialogOpen] = useState<boolean>(false)
  const [bulletinFileFialogOpen, setbulletinFileFialogOpen] = useState<boolean>(false)
  const [bulletinExpanded, setbulletinExpanded] = useState<BulletinFileType | false>(false)
  const [bulletinFiles, setbulletinFiles] = useState<IStaticFile[]>([])
  const [generalLawFiles, setgeneralLawFiles] = useState<IStaticFile[]>([])
  const [reportFiles, setreportFiles] = useState<IStaticFile[]>([])

  const handleBulletinChange =
    (panel: BulletinFileType) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setbulletinExpanded(isExpanded ? panel : false);
    }

  const getStaticBulletinFiles = async (type: BulletinFileType) => {
    const { statusCode, responseContent } = await api.prod.getStaticBulletinFiles(type)
    if (statusCode === 200) {
      if (type === 'Bulletin') setbulletinFiles(responseContent)
      if (type === 'GeneralLaw') setgeneralLawFiles(responseContent)
      if (type === 'ReportSample') setreportFiles(responseContent)
    }
  }

  useEffect(() => {
    getStaticBulletinFiles('Bulletin')
    getStaticBulletinFiles('GeneralLaw')
    getStaticBulletinFiles('ReportSample')
  }, [])

  return (
    <>
      <span>您好! {props.username}</span>

      <Tooltip title='技術公報/範本'>
        <div className={classNames({
          [style.lawBtn]: true
        })}
          onMouseOver={() => { setbulletinBtnHover(true) }}
          onMouseLeave={() => { setbulletinBtnHover(false) }}
          onClick={() => { setbulletinFileFialogOpen(true) }}
        >
          <Image src={bulletinBtnHover ? '/law/doc-hover.png' : '/law/doc.png'} width='28px' height='28px' />
        </div>
      </Tooltip>

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
        open={bulletinFileFialogOpen}
        onClose={() => { setbulletinFileFialogOpen(false) }}
        aria-labelledby="responsive-dialog-title"
      // sx={{ maxWidth: '735px' }}
      >
        <DialogTitle id="responsive-dialog-title">技術公報/範本</DialogTitle>
        <DialogContent>
          <Accordion expanded={bulletinExpanded === 'Bulletin'} onChange={handleBulletinChange('Bulletin')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>通則</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }} >
              {
                bulletinFiles.map((file, index) => {
                  return <Link href={file.serverPath} underline="hover" key={index}
                    target="_blank" rel="noopener"
                  >
                    {file.alias}
                  </Link>
                })
              }
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={bulletinExpanded === 'GeneralLaw'} onChange={handleBulletinChange('GeneralLaw')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>公報</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
              {
                generalLawFiles.map((file, index) => {
                  return <Link href={file.serverPath} underline="hover" key={index}
                    target="_blank" rel="noopener">
                    {file.alias}
                  </Link>
                })
              }
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={bulletinExpanded === 'ReportSample'} onChange={handleBulletinChange('ReportSample')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>容積代金估價報告書範本</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
              {
                reportFiles.map((file, index) => {
                  return <Link href={file.serverPath} underline="hover" key={index}
                    target="_blank" rel="noopener">
                    {file.alias}
                  </Link>
                })
              }
            </AccordionDetails>
          </Accordion>

          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>通則</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                bulletinFiles.map((file, index) => {
                  return <Link href="#" underline="hover" key={index}>
                    {file.alias}
                  </Link>
                })
              }
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>公報</Typography>
            </AccordionSummary>
            <AccordionDetails>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>容積代金估價報告書範本</Typography>
            </AccordionSummary>
            <AccordionDetails>
            </AccordionDetails>
          </Accordion> */}

        </DialogContent>

        <DialogActions>
          <Button onClick={() => { setbulletinFileFialogOpen(false) }}>
            確認
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={lawFileDialogOpen}
        onClose={() => { setlawFileDialogOpen(false) }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">估價相關法令</DialogTitle>
        <DialogContent>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
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

export default UserGreet