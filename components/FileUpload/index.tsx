import React from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import clsx from 'clsx'
import FileUploadDefaultImage from './aaa.png'
import Image from 'next/image'
import getFileExtenstion from '../../lib/getFileExtenstion'

export type FileUploadProps = {
  imageButton?: boolean
  accept: string
  hoverLabel?: string
  dropLabel?: string
  width?: string
  height?: string
  backgroundColor?: string
  image?: {
    url: string
    imageStyle?: {
      width?: string
      height?: string
    }
  }
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDrop: (event: React.DragEvent<HTMLElement>) => void
}

const useStyle = makeStyles({
  root: {
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    '&:hover p,&:hover svg,& img': {
      opacity: 1,
    },
    '& p, svg': {
      opacity: 0.4,
    },
    '&:hover img': {
      opacity: 0.3,
    },
    width: '100%',
    height: '100%'
  },
  noMouseEvent: {
    pointerEvents: 'none',
    position: 'relative'
  },
  iconText: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
  },
  hidden: {
    display: 'none',
  },
  onDragOver: {
    '& img': {
      opacity: 0.3,
    },
    '& p, svg': {
      opacity: 1,
    },
  },
})

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  imageButton = false,
  hoverLabel = '點擊或拖曳檔案至此',
  dropLabel = '上傳檔案',
  width = '100%',
  height = '100%',
  backgroundColor = '#fff',
  image: {
    url = FileUploadDefaultImage,
    imageStyle = {
      height: 'inherit',
    },
  } = {},
  onChange,
  onDrop,
}) => {
  const classes = useStyle()
  const [imageUrl, setImageUrl] = React.useState(url)
  const [labelText, setLabelText] = React.useState<string>(hoverLabel)
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false)
  const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false)
  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true)
    },
    onMouseLeave: () => {
      setIsMouseOver(false)
    },
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e)
      setIsDragOver(true)
      setLabelText(dropLabel)
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e)
      setIsDragOver(false)
      setLabelText(hoverLabel)
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e)
      setLabelText(hoverLabel)
      setIsDragOver(false)
      if (e.dataTransfer.files[0]) {
        const extension = getFileExtenstion(e.dataTransfer.files[0].name)
        if (!extension) return
        if (!accept.includes(extension.toString())) {
          setLabelText('錯誤的檔案格式')
          setIsDragOver(false)
          return
        }
      }

      // if (imageButton && e.dataTransfer.files[0]) {
      //   alert(e.dataTransfer.files[0].name)
      //   setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]))
      // }
      onDrop(e)
    },
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    if (imageButton && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]))
    }
    onChange(event)
  }

  return (
    <>
      <input
        onChange={handleChange}
        accept={accept}
        className={classes.hidden}
        id="file-upload"
        type="file"
      />

      <label
        htmlFor="file-upload"
        {...dragEvents}
        className={clsx(classes.root, isDragOver && classes.onDragOver)}
      >
        <Box
          width={width}
          height={height}
          bgcolor={backgroundColor}
          className={classes.noMouseEvent}
        >
          {(!imageButton || isDragOver || isMouseOver) && (
            <>
              <Box
                height={height}
                width={width}
                className={classes.iconText}
              >
                <CloudUploadIcon fontSize="large" />
                <Typography>{labelText}</Typography>
              </Box>
            </>
          )}
        </Box>
      </label>
    </>
  )
}

export default FileUpload
