
export const parseCommitee = (commiteeName: string) => {
  return commiteeName.replace('管理委員會', '').replace('公寓大廈', '')
}
