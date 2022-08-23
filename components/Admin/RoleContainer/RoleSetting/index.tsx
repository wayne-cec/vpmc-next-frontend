import style from './index.module.scss'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState, useEffect } from 'react'
import { IApp } from '../../../../api/prod'
import { Button } from '@mui/material'
import { uniqBy } from 'lodash'

const tempMap: { [key: string]: string } = {
  info: '基本資訊', news: '新聞', function: '主要功能'
}

interface IRoleSetting {
  ownedApps: IApp[]
  unOwnedApps: IApp[]
}

const RoleSetting = ({
  ownedApps, unOwnedApps
}: IRoleSetting) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [appTypes, setappTypes] = useState<string[]>([])

  useEffect(() => {
    const appCodes = unOwnedApps.concat(ownedApps).map(app => app.code)
    const appType = appCodes.map(code => code.split(':')[0])
    setappTypes(uniqBy(appType, (a) => { return a }))
  }, [unOwnedApps])

  return (
    <div className={style.RoleSetting}>
      <div className={style.RoleBrowser}>

        {
          appTypes.map((type, index) => {
            return (
              <Accordion
                key={index}
                expanded={expanded === type}
                onChange={() => {
                  if (expanded && type === expanded) {
                    setExpanded(false)
                    return
                  }
                  setExpanded(type)
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="type"
                  id="type"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {tempMap[type]}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{type}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'row' }}>
                  {
                    unOwnedApps.map((app, index) => {
                      if (app.code.split(':')[0] === type) {
                        return <div key={index} className={style.Chip}>
                          {app.name}
                        </div>
                      }
                    })
                  }
                </AccordionDetails>
              </Accordion>
            )
          })
        }

      </div>
      <div className={style.RoleEditor}>
        <div className={style.Panel}>
          {
            ownedApps.map((app, index) => {
              return <div key={index} className={style.Chip}>
                {app.name}
              </div>
            })
          }
        </div>
        <div className={style.Action}>
          <Button
            variant='contained'
            color='error'
          >重置</Button>
          <Button
            variant='contained'
            color='secondary'
          >儲存</Button>
        </div>
      </div>
    </div>
  )
}

export default RoleSetting
