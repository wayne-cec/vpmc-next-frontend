
export const parseCommitee = (commiteeName: string) => {
  return commiteeName
    .replace('管理委員會', '')
    .replace('公寓大廈', '')
    .replace('大樓', '')
    .replace('管理負責人', '')
    .replace('社區', '')
}
