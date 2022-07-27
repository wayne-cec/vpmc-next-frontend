import React, { useContext, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MarketCompareContext from '../../../MarketCompareContext'
import FileUpload from '../../../../../../components/FileUpload'

const accept = '.csv'

const parseCsvString = (data: string) => {
  const output: string[][] = []
  const rowStringArray: string[] = data.split('\n')
  rowStringArray.forEach((row) => {
    output.push(row.split(','))
  })
  return output
}

const AttributeQueryIntelligence = () => {
  const marketCompareContext = useContext(MarketCompareContext)
  const [objectInfo, setobjectInfo] = useState<string[] | undefined>(undefined)

  const handleFileBlob = async (file: File) => {
    const csvString = await file.text()
    const parsedCsv = parseCsvString(csvString)
    if (parsedCsv[0][0] !== 'vpmc-marketCompare-intelligence-config') {
      alert('非本DSS專用config檔案')
      return
    }
    const objectInfo: string[] = parsedCsv[2]
    setobjectInfo(objectInfo)
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return
    const fileBlob = event.target.files[0]
    handleFileBlob(fileBlob)
  }

  const onFileDrop = (event: React.DragEvent<HTMLElement>) => {
    const fileBlob = event.dataTransfer.files[0]
    handleFileBlob(fileBlob)
  }

  return (
    <div className={classNames({
      [style.AttributeQuery]: true,
      [style.divide]: true
    })}>
      {
        objectInfo
          ? <div>{objectInfo[1]}</div>
          : <FileUpload
            accept={accept}
            onChange={onFileChange}
            onDrop={onFileDrop}
          />
      }

    </div>
  )
}

export default AttributeQueryIntelligence