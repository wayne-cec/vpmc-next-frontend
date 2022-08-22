import Header from '../../../components/Admin/Header'
import WithSideBarProtected from '../../../layout/admin-layout/WithSideBarProtected'
import { Box, AppBar, Tabs, Tab } from '@mui/material'
import { useDispatch } from 'react-redux'
import { onToggle } from '../../../store/slice/sideBar'
import { useState, useEffect } from 'react'
import { IRoleManageProps } from '../../../pages/admin/role'
import api from '../../../api'
import { IRoleWithApp } from '../../../api/prod'
import { RoleCode } from '../../../store/slice/user'
import RoleHeader from '../../../components/Admin/RoleContainer/RoleHeader'
import RoleSetting from '../../../components/Admin/RoleContainer/RoleSetting'

const RoleContainer = ({
  roles
}: IRoleManageProps) => {
  const dispatch = useDispatch()
  const [tabPage, settabPage] = useState<RoleCode>('admin:root')
  const [roleInfo, setroleInfo] = useState<IRoleWithApp | undefined>(undefined)

  const fetchRoleData = async (roleCode: RoleCode) => {
    const { statusCode, responseContent } = await api.prod.listAppByRole(roleCode)
    if (statusCode === 200) {
      setroleInfo(responseContent)
    }
  }

  useEffect(() => {
    fetchRoleData(tabPage)
  }, [tabPage])

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header
        title="角色權限管理"
        onDrawerToggle={() => {
          dispatch(onToggle(true))
        }}
      />
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={tabPage} textColor="inherit">
          {
            roles.map((role, index) => {
              return <Tab
                key={index}
                value={role.code}
                label={role.name}
                onClick={() => { settabPage(role.code) }}
              />
            })
          }
        </Tabs>
      </AppBar>

      <Box sx={{
        flex: 1, bgcolor: '#eaeff1', height: '1%',
        display: 'flex', flexDirection: { md: 'column', sm: 'column-reverse', xs: 'column-reverse' }
      }}>
        {
          roleInfo && <>
            <RoleHeader roleInfo={roleInfo} />
            <RoleSetting />
          </>
        }
      </Box>
    </Box>
  )
}

export default WithSideBarProtected(RoleContainer)
