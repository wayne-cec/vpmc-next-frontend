
export type BulletinFileType = 'ReportSample' | 'GeneralLaw' | 'Bulletin'
export type LawFileType = 'AppraisalLaw' | 'UrbanLaw' | 'PublicAssetLaw' | 'UrbanUpdateLaw' | 'InsuranceLaw'

export interface IStaticFile {
  serverPath: string
  alias: string
}

export const getStaticBulletinFiles = async (type: BulletinFileType) => {
  const response = await fetch(process.env.API_DOMAIN_PROD + `/api/File/get${type}FileInfo`, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as IStaticFile[]
  return { statusCode, responseContent }
}

export const getStaticLawFiles = async (type: LawFileType) => {
  if (type === 'AppraisalLaw') {
    return [
      { alias: '估價師法', serverPath: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=D0060076' },
      { alias: '不動產估價技術規則', serverPath: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0060077' }
    ] as IStaticFile[]
  }
  if (type === 'UrbanLaw') {
    return [
      { alias: "國土計畫法", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070230" },
      { alias: "土地法", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0060001" },
      { alias: "都市計畫法", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070001" },
      { alias: "都市計畫容積移轉實施辦法", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070028" },
      { alias: "非都市土地使用管制規則", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0060013" },
      { alias: "非都市土地開發審議作業規範", serverPath: "https://glrs.moi.gov.tw/LawContent.aspx?id=FL003635#lawmenu" },
      { alias: "都市計畫公共設施用地多目標使用辦法", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070013" }
    ] as IStaticFile[]
  }
  if (type === 'PublicAssetLaw') {
    return [
      { alias: "國有財產法", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=G0370001" },
      { alias: "國有財產估價作業程序", serverPath: "https://law-out.mof.gov.tw/LawContent.aspx?id=FL021985&KeyWord=%e4%bc%b0%e5%83%b9" },
      { alias: "財政部國有財產署各分署辦理國有非公用不動產委託估價參考原則", serverPath: "https://esvc.fnp.gov.tw/decreeDetail/ruleMain?treId=840" },
      { alias: "台北市政府財政局委託辦理市有非公用不動產估價作業原則", serverPath: "http://www.laws.taipei.gov.tw/lawsystem/wfLaw_ArticleContent.aspx?LawID=P03D1011-20140930&RealID=03-04-2034&PN=ALL" }
    ] as IStaticFile[]
  }
  if (type === 'UrbanUpdateLaw') {
    return [
      { alias: "都市更新條例", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070008" },
      { alias: "都市更新條例施行細則", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070010" },
      { alias: "都市危險及老舊建築物加速重建條例", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070249" },
      { alias: "都市更新建築容積獎勵辦法", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070027" },
      { alias: "都市更新權利變換實施辦法", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070025" },
    ] as IStaticFile[]
  }
  if (type === 'InsuranceLaw') {
    return [
      { alias: "保險業財務報告編製準則", serverPath: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=G0390085" },
      { alias: "保險業辦理不動產投資自律規範", serverPath: "https://law.lia-roc.org.tw/Law/Content?lsid=FL070128" },
      { alias: "訂定保險法第146條之2第1項關於保險業辦理不動產投資有關即時利用並有收益之認定標準及處理原則", serverPath: "https://www.ib.gov.tw/ch/home.jsp?id=45&parentpath=0,3&mcustomize=onemessages_view.jsp&dataserno=201908230001&aplistdn=ou=data,ou=law,ou=chlaw,ou=ap_root,o=fsc,c=tw&dtable=Law" }
    ] as IStaticFile[]
  }
}
