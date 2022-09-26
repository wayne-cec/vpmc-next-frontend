
type Land = {

}

type Build = {

}

type Park = {

}

export type DetailResponse = {
  lands: Land[]
  builds: Build[]
  parks: Park[]
}

export type GetAssetDetailByAprId = {
  ParamType: { id: string }
  ResponseType: DetailResponse
}
