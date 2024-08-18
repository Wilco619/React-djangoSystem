//react icon
import { RiBarChartHorizontalFill } from "react-icons/ri";

type TopNavtypes = {
isCollapsed: boolean;
onToggle: any;

};

const TopNav = ({isCollapsed, onToggle}: TopNavtypes) => {

    
  return (
    <nav className={`mx-[10px] ml-[5px] p-0 flex h-full items-center justify-between ${isCollapsed ? '' : ''}`}>
      
        <a className="navbar-toggler" onClick={onToggle}>
          {isCollapsed ? <RiBarChartHorizontalFill  size={20} className='bar'/> : <RiBarChartHorizontalFill size={20} className='bar'/>} {/* Toggle icon */}
        </a>
        <p className="navbar-title">Profile</p>
      
    </nav>
  )
}

export default TopNav