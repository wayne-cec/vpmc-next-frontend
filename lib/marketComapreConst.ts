// export const assetTypeSet: { [key: number]: string } = {
//   0: '住宅大樓',
//   1: '辦公商業大樓',
//   3: '公寓',
//   4: '華廈',
//   5: '套房',
//   6: '透天厝',
//   7: '店面',
//   8: '廠辦',
//   9: '倉庫',
//   10: '工廠',
//   11: '農舍',
//   2: '其他'
// }

export const assetTypeSet: { [key: number]: string } = {
  0: '住宅大樓',
  1: '土地',
  2: '停車位',
  3: '辦公商業大樓',
  4: '公寓',
  5: '華廈',
  6: '套房',
  7: '透天厝',
  8: '店面',
  9: '廠辦',
  10: '倉庫',
  11: '工廠',
  12: '農舍',
  13: '其他'
}

export const transactionTimeSet: { [key: number]: string } = {
  1: '1年內',
  2: '2年內',
  3: '3年內',
  4: '4年內',
  5: '5年內',
  6: '6年內',
  7: '7年內',
  8: '8年內',
  9: '9年內',
  10: '10年內'
}

export const buildingTransactionAreaSet: { [key: number]: string } = {
  0: '小於25坪',
  1: '25~50坪',
  2: '50~80坪',
  3: '大於80坪'
}

export const landTransactionAreaSet: { [key: number]: string } = {
  0: '小於50坪',
  1: '50~200坪',
  2: '大於200坪'
}

export const ageSet: { [key: number]: string } = {
  0: '小於5年',
  1: '5~10年',
  2: '10~20年',
  3: '20~30年',
  4: '大於30年'
}

export const parkSpaceSet: { [key: number]: string } = {
  1: '塔式車位',
  2: '坡道平面',
  3: '升降平面',
  4: '升降機械',
  5: '坡道機械',
  6: '一樓平面',
  7: '其他'
}

export const urbanUsageSet: { [key: number]: string } = {
  0: '住宅區',
  1: '商業區',
  2: '其他',
  4: '工業區',
  5: '農業區'
}
