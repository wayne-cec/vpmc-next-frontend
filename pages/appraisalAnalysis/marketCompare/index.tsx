import React from 'react'
import MarketCompareContainer from '../../../containers/MarketCompareContainer'
import { GetServerSideProps, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps<{}, {}> = async (context) => {

  // console.log('=========================')
  // console.log(context.req.cookies)
  return {
    props: {}
  }
}

const MarketCompare: NextPage = () => {
  return <MarketCompareContainer />
}

export default MarketCompare
