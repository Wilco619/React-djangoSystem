import React from 'react';
import { PiTrolleySuitcase } from 'react-icons/pi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsersThin } from "react-icons/pi";
import { MdBalance } from "react-icons/md";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";

import "../App.css";
import { NavText } from "../Data";
import { NavLink } from 'react-router-dom';

// Mapping of icon names to actual icon components
const iconMap = {
  PiTrolleySuitcase: PiTrolleySuitcase,
  IoMdArrowDropdown: IoMdArrowDropdown,
  LuLayoutDashboard: LuLayoutDashboard,
  FaAngleRight: FaAngleRight,
  FaAngleDown: FaAngleDown,
  PiUsersThin: PiUsersThin,
  MdBalance: MdBalance,
};

type CollapseNavType = {
  isCollapsed: boolean;
};

type SectionIdType = string | null;

const CollapseNav = ({ isCollapsed }: CollapseNavType) => {
  const [openSection, setOpenSection] = React.useState<SectionIdType>(null);

  const handleToggleCollapse = (section: string) => {
    setOpenSection(prevSection => (prevSection === section ? null : section));
  };

  return (
    <div>
      <ul>
        {NavText.map((navtext) => {
          const IconComponent = iconMap[navtext.icon];
          const IconComponent1 = iconMap[navtext.icon2];
          const IconComponent2 = iconMap[navtext.icon3];
          const sectionId = `section ${navtext.id}`;

          return (
            <li className='' key={navtext.id}>
              <a
                onClick={() => handleToggleCollapse(sectionId)}
                href="#"
                className={`flex items-center justify-between space-x-2 ${isCollapsed ? 'icon-only smooth-transition' : ''}`}
              >
                <div className="flex items-center">
                  <IconComponent size={18} style={{ margin: '0px 10px 0px 0px' }} />
                  {!isCollapsed && navtext.name}{' '}
                </div>

                <span className={isCollapsed ? 'd-none smooth-transition' : 'ml-auto'}>
                  {/* Conditionally render IconComponent1 or IconComponent2 based on whether the section is open */}
                  {openSection === sectionId ? (
                    <IconComponent2 style={{ margin: '0 10px 0 0' }} /> 
                  ) : (
                    <IconComponent1 style={{ margin: '0 10px 0 0' }} /> 
                  )}
                </span>
              </a>

              {navtext.sublinks && (
                <ul className={`collapsible-list ${openSection === sectionId ? 'open' : 'closed'} ${isCollapsed ? 'd-none smooth-transition' : ''}`}>
                {navtext.sublinks.map((sublink) => (
                  <li key={sublink.id}>
                    <NavLink to={sublink.link}>{sublink.name}</NavLink> {/* Assuming sublink.link is the path for the sublink */}
                  </li>
                ))}
                </ul>
              )}

            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CollapseNav;
