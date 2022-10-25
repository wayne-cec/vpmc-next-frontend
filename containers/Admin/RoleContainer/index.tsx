import Header from '../../../components/Admin/Header'
import WithSideBarProtected from '../../../Layout/admin-layout/WithSideBarProtected'
import { Box, AppBar, Tabs, Tab } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { onToggle } from '../../../store/slice/sideBar'
import { useState, useEffect } from 'react'
import { IRoleManageProps } from '../../../pages/admin/role'
import api from '../../../api'
import { IRoleWithApp, IApp } from '../../../api/prod'
import { RoleCode, selectUser } from '../../../store/slice/user'
import RoleHeader from '../../../components/Admin/RoleContainer/RoleHeader'
import RoleSetting from '../../../components/Admin/RoleContainer/RoleSetting'
import { useRouter } from 'next/dist/client/router'

const RoleContainer = ({
  roles
}: IRoleManageProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userInfo = useSelector(selectUser)
  const [tabPage, settabPage] = useState<RoleCode>('user:basic')
  const [roleInfo, setroleInfo] = useState<IRoleWithApp | undefined>(undefined)
  const [ownedApps, setownedApps] = useState<IApp[]>([])
  const [unOwnedApps, setunOwnedApps] = useState<IApp[]>([])
  const [originalApps, setoriginalApps] = useState<IApp[]>([])
  const [originalUnOwnedApps, setoriginalUnOwnedApps] = useState<IApp[]>([])

  const handleAppsSave = async () => {
    const { statusCode } = await api.prod.assignApp(
      userInfo.token,
      tabPage, ownedApps.map(a => a.code).join(',')
    )
    if (statusCode === 200) {
      router.replace(router.asPath)
      fetchRoleData(tabPage)
      return
    }
    alert('權限設定失敗')
  }

  const resetApps = () => {
    setownedApps(originalApps)
    setunOwnedApps(originalUnOwnedApps)
  }

  const filterOwnedApps = async (ownedApps: IApp[]) => {
    const { statusCode, responseContent } = await api.prod.listAllApps()
    if (statusCode === 200) {
      const ownedAppsCodes = ownedApps.map(a => a.code)
      const unOwnedApps = responseContent.filter(a => !ownedAppsCodes.includes(a.code))
      setownedApps(ownedApps)
      setunOwnedApps(unOwnedApps)
      setoriginalApps(ownedApps)
      setoriginalUnOwnedApps(unOwnedApps)
    }
  }

  const fetchRoleData = async (roleCode: RoleCode) => {
    const { statusCode, responseContent } = await api.prod.listAppByRole(roleCode)
    if (statusCode === 200) {
      setroleInfo(responseContent)
    }
    await filterOwnedApps(responseContent.apps)
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
            <RoleSetting
              ownedApps={ownedApps}
              unOwnedApps={unOwnedApps}
              originalApps={originalApps}
              onAppDrop={(own, unOwn) => {
                setownedApps(own)
                setunOwnedApps(unOwn)
              }}
              resetApps={resetApps}
              handleAppsSave={handleAppsSave}
            />
          </>
        }
      </Box>
    </Box>
  )
}

export default WithSideBarProtected(RoleContainer)
