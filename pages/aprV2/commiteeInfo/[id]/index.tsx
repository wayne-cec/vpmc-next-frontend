import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import style from './index.module.scss'
import CommiteeHeader from '../../../../components/CommiteeHeader'
import CommiteePhoto from '../../../../components/CommiteePhoto'
import { ICommiteeAprDetail } from '../../../../store/slice/commitee'
import { WithNavFooterProtected } from '../../../../layout/BaseLayout'

export interface ITempCommiteeInfo {
  id: string
  date: string
  organization: string
  licenseYear: string
  licenseCode: string
  coordinate: string
  address: string
  license: string
}

interface IProps {
  commiteeDetail: ICommiteeAprDetail[]
  commiteeInfo: ITempCommiteeInfo
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<IProps, Params> = async ({
  params,
}) => {
  let api = process.env.API_DOMAIN_PROD + `/api/Commitee/getAprInfo?commiteeId=${params?.id}`
  let res = await fetch(api, { method: "GET" })
  const json: ICommiteeAprDetail[] = await res.json()

  api = process.env.API_DOMAIN_PROD + `/api/Commitee/getCommiteeInfoById?commiteeId=${params?.id}`
  res = await fetch(api, { method: "GET" })
  const commiteeInfo = await res.json() as ITempCommiteeInfo
  return {
    props: {
      commiteeDetail: json,
      commiteeInfo: commiteeInfo
    }
  }
}

const CommiteeDetail: NextPage<IProps> = ({ commiteeDetail, commiteeInfo }) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台</title>
        <meta name="description" content="Generated by VPMC" />
      </Head>

      <main className={style.container}>


        <CommiteePhoto />
        <CommiteeHeader
          commiteeDetail={commiteeDetail}
          commiteeInfo={commiteeInfo}
        />
      </main>
    </>
  )
}

export default WithNavFooterProtected(CommiteeDetail)