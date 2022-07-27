import React, { useContext, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MarketCompareContext from '../../../MarketCompareContext'
import FileUpload from '../../../../../../components/FileUpload'
import { Grid } from '@mui/material'

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
          ? <div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                標的簡稱
              </Grid>
              <Grid item xs={6}>
                {objectInfo[1]}
              </Grid>
              <Grid item xs={6}>
                資產類型
              </Grid>
              <Grid item xs={6}>
                {objectInfo[2]}
              </Grid>
              <Grid item xs={6}>
                門牌
              </Grid>
              <Grid item xs={6}>
                {objectInfo[3]}
              </Grid>
              <Grid item xs={6}>
                樓層
              </Grid>
              <Grid item xs={6}>
                {objectInfo[5]}F
              </Grid>

              <Grid item xs={6}>
                建物完工日期
              </Grid>
              <Grid item xs={6}>
                {objectInfo[6]}
              </Grid>

            </Grid>
          </div>
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