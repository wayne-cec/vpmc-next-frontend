import { Box } from '@mui/material'

interface IUserCardContainer {
  children: React.ReactNode
}

const UserCardContainer = ({
  children
}: IUserCardContainer) => {
  return (
    <Box
      sx={{
        flex: 0.7, px: { md: 4, sm: 0 }, overflowY: 'auto',
        height: '100%', direction: 'rtl'
      }}
    >
      {children}
    </Box>
  )
}

export default UserCardContainer
