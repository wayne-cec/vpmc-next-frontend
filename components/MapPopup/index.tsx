import MapView from '@arcgis/core/views/MapView'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Point from '@arcgis/core/geometry/Point'

class Animation {
  private _isStart: boolean = false
  private _fps: number = 30
  private startTime: number = NaN
  private then: number = NaN
  private now: number = Date.now()
  private elapsed: number = NaN
  private fpsInterval: number = 0
  private tasks: Array<() => void> = []
  constructor(fps: number) {
    this._fps = fps
    this.render = this.render.bind(this)

    this.start()
  }

  get fps () {
    return this._fps
  }

  get isStart () {
    return this._isStart
  }

  addTask (task: () => void) {
    this.tasks.push(task)
    return () => this.removeTask(task)
  }

  removeTask (task: () => void) {
    this.tasks = this.tasks.filter(item => item !== task)
  }

  start () {
    this._isStart = true
    this.fpsInterval = 1000 / this.fps
    this.then = Date.now()
    this.startTime = this.then
    this.render()
  }

  stop () {
    this._isStart = false
  }

  render () {
    if (!this.isStart) return
    window.requestAnimationFrame(this.render)
    this.now = Date.now()
    this.elapsed = this.now - this.then
    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval)
      for (const task of this.tasks) task()
    }
  }
}

export interface IMapPopupProps {
  view: Promise<MapView> | MapView
  point?: Point
  open: boolean
  onClose?: () => void
}

const animation = new Animation(60)

const MapPopup = ({
  view: _view,
  point,
  open,
  onClose
}: IMapPopupProps) => {
  const cancelAnimationFrame = useRef<() => void>()
  const [transform, setTransform] = useState<{ x: number, y: number }>()
  const elemRef = useRef<HTMLDivElement>(null)
  const mapContainer = useRef<HTMLElement | undefined>(undefined)

  const asyncViewer = _view instanceof Promise ? _view : new Promise<MapView>(resolve => resolve(_view))

  const transformStyle = (function () {
    if (!elemRef.current) return
    if (!transform) return ''
    const { width } = elemRef.current.getBoundingClientRect()
    return `translate(${transform.x - (width / 2)}px, ${transform.y}px)`
  })()

  const handlePopupPositionTransformation = async () => {
    if (!point) return
    const view = await asyncViewer
    const { x, y } = view.toScreen(point)
    setTransform({ x, y })
  }

  const subscribeWatchPosition = () => {
    if (!cancelAnimationFrame.current) {
      const remover = animation.addTask(handlePopupPositionTransformation)
      cancelAnimationFrame.current = remover
      console.log(animation)
    }
  }

  const unsubscribeWatchPosition = () => {
    cancelAnimationFrame.current && cancelAnimationFrame.current()
  }

  useEffect(() => {
    if (!point) return
    subscribeWatchPosition()
    return () => {
      unsubscribeWatchPosition()
    }
  }, [point, open])
  useEffect(() => {
    (async function () {
      const viewer = await asyncViewer
      mapContainer.current = viewer.container
    })()
  }, [])
  if (!mapContainer.current) return null
  return (
    createPortal((
      (
        open
          ? <div ref={elemRef} style={{ transform: transformStyle, position: 'absolute', left: '0px', top: '0px' }}>{transformStyle}</div>
          : null
      )
    ), mapContainer.current)
  )
}

export default MapPopup