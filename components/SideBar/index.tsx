import {
  ProSidebar, SidebarHeader,
  SidebarFooter, SidebarContent,
  Menu, MenuItem, SubMenu
} from 'react-pro-sidebar'
import { useState } from 'react'
import 'react-pro-sidebar/dist/css/styles.css'
import style from './index.module.scss'

const SideBar = () => {
  const [collapsed, setcollapsed] = useState<boolean>(false)
  return (
    <ProSidebar
      toggled={false}
      collapsed={collapsed}
      breakPoint='md'
    >
      <SidebarHeader>
        <div className={style.Header}>
          後台管理系統
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem onClick={() => { setcollapsed(prev => !prev) }}>Dashboard</MenuItem>
          <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter>
      </SidebarFooter>
    </ProSidebar>
  )
}

export default SideBar
