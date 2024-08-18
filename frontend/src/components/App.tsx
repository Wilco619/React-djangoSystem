
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import "./App.css"
import { useState } from "react";
import { Outlet } from "react-router-dom";

const App = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] gap-0 h-screen ${isCollapsed ? 'grid grid-cols-[60px_1fr] grid-rows-[50px_1fr] gap-1 h-screen' : 'grid grid-cols-[250px_1fr] grid-rows-[50px_1fr] gap-1 h-screen'}`}>
      <div className="bg-gray-200 h-screen">
        <SideNav isCollapsed={isCollapsed}/>
      </div>
      <div className="col-span-1 bg-gray-300">
        <TopNav isCollapsed={isCollapsed} onToggle={handleToggleCollapse} />
      </div>
      <div className="col-start-2 row-start-2 bg-gray-100">
       <Outlet/>
      </div>
    </div>
  );
};

export default App;
