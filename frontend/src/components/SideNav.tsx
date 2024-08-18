
// import { Outlet, NavLink, useLoaderData, Form, redirect, } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./App.css"
import CollapseNav from "./sub-components/CollapseNav";


//react icons
import { TbLogout2 } from "react-icons/tb";

type SideNavType ={
  isCollapsed: boolean;
}

const SideNav = ({ isCollapsed}: SideNavType) => {

  

  return (
    <div className={`sidenav ${isCollapsed ? 'collapsed' : ''}`}>
      <div className={`flex sidenav-logo ${isCollapsed ? 'icon-only' : ''}`}>
        <img src="/src/assets/react.svg" alt="logo" />
      </div>

      <div className=" links smooth-transition">
        
        <ul>
            
            <CollapseNav isCollapsed={isCollapsed}/>

        </ul>

        <div className='link-footer'>
            <ul>
              <li>
                <NavLink to="/" className={`flex items-center space-x-2 ${isCollapsed ? 'icon-only' : 'smooth-transition'}`}><TbLogout2 size={15} style={{ margin: '0px 10px 0px 0px' }}/> {!isCollapsed && ' LogOut'}</NavLink>
              </li>
            </ul>
        </div>


      </div>
    </div>
  )
}

export default SideNav