import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import MarketCompareDocumentContainer from '../../../../../containers/MarketCompareDocumentContainer'
import { Data } from '../../../../../containers/MarketCompareContainer/ResultPanel/ResultTable'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps } from 'next'
import { b64Toutf8 } from '../../../../../lib/base64Convert'

interface IProps {
  aprData: Data[]
}

interface Params extends ParsedUrlQuery {
  data: string
}

export const getServerSideProps: GetServerSideProps<IProps, Params> = async ({
  params,
}) => {
  const parsed = params ? JSON.parse(b64Toutf8(params.data)) : []
  return {
    props: {
      aprData: parsed
    }
  }
}


const Document: NextPage<IProps> = ({
  aprData
}) => {

  return (
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台 | 文件</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/yuantai.ico" />
        <link href="/documentPage.css" rel="stylesheet"></link>
      </Head>
      <MarketCompareDocumentContainer aprData={aprData} />
    </>
  )
}

export default Document
