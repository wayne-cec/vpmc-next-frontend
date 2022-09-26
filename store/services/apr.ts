import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetAssetDetailByAprId } from './types/apr'

export const aprApi = createApi({
  reducerPath: 'aprApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_DOMAIN_PROD}/api/Apr/`,
  }),
  endpoints: (builder) => ({
    getAssetDetailByAprId: builder.query<
      GetAssetDetailByAprId['ResponseType'],
      GetAssetDetailByAprId['ParamType']
    >({
      query: (param) => ({
        url: `getAssetDetailByAprId?id=${param.id}`,
        method: 'get',
      }),
    })
  })
})

export const {
  useGetAssetDetailByAprIdQuery,
  useLazyGetAssetDetailByAprIdQuery
} = aprApi
