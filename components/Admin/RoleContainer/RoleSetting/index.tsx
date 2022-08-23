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
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from 'react-beautiful-dnd'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const tempMap: { [key: string]: string } = {
  info: '基本資訊', news: '新聞', function: '主要功能'
}

const AppChip = ({
  p, app, icon, onClick
}: {
  p: DraggableProvided
  app: IApp
  icon?: React.ReactNode | undefined
  onClick?: () => void | undefined
}) => {
  return (
    <div
      className={style.Chip}
      key={app.code}
      ref={p.innerRef}
      {...p.draggableProps}
      {...p.dragHandleProps}
    >
      {icon}
      {app.name}
    </div>
  )
}

interface IRoleSetting {
  ownedApps: IApp[]
  unOwnedApps: IApp[]
  onAppDrop: (own: IApp[], unOwn: IApp[]) => void
}

const RoleSetting = ({
  ownedApps, unOwnedApps, onAppDrop
}: IRoleSetting) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [appTypes, setappTypes] = useState<string[]>([])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !result.source) return
    if (result.destination.droppableId === result.source.droppableId) return
    if (result.destination.droppableId === 'sourceApps') { // 拉去 source panel
      const extractedApps = ownedApps.filter(a => a.code === result.draggableId)
      const excludedApps = ownedApps.filter(a => a.code !== result.draggableId)
      onAppDrop(excludedApps, unOwnedApps.concat(extractedApps))
    } else { // 拉去 target panel
      const extractedApps = unOwnedApps.filter(a => a.code === result.draggableId)
      const excludedApps = unOwnedApps.filter(a => a.code !== result.draggableId)
      onAppDrop(ownedApps.concat(extractedApps), excludedApps)
    }
  }

  useEffect(() => {
    const appCodes = unOwnedApps.concat(ownedApps).map(app => app.code)
    const appType = appCodes.map(code => code.split(':')[0])
    setappTypes(uniqBy(appType, (a) => { return a }))
  }, [unOwnedApps])

  return (
    <div className={style.RoleSetting}>
      <DragDropContext onDragEnd={handleDragEnd}>
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
                  <Droppable droppableId='sourceApps'>
                    {
                      provided => (
                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'row' }}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {
                            unOwnedApps.map((app, index) => {
                              if (app.code.split(':')[0] === type) {
                                return <Draggable draggableId={app.code} index={index} key={app.code}>
                                  {
                                    p => <AppChip app={app} p={p} />
                                  }
                                </Draggable>
                              }
                            })
                          }
                          {provided.placeholder}
                        </AccordionDetails>
                      )
                    }
                  </Droppable>
                </Accordion>
              )
            })
          }
        </div>
        <div className={style.RoleEditor}>
          <Droppable droppableId='targetApps'>
            {
              provided => (
                <div className={style.Panel}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    ownedApps.map((app, index) => {
                      return <Draggable draggableId={app.code} index={index} key={app.code}>
                        {
                          p => <AppChip app={app} p={p}
                            icon={
                              <Button startIcon={<HighlightOffIcon />} color='secondary'
                              ></Button>
                            }
                          />
                        }
                      </Draggable>
                    })
                  }
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
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
      </DragDropContext>
    </div>
  )
}

export default RoleSetting
