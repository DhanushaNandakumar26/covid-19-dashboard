// components/Sidebar.tsx
import { AiOutlineMenu, AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { FaVirusCovid } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { RiMapPin2Fill } from "react-icons/ri";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`bg-gray-900 h-full fixed transition-all duration-300 shadow-lg ${isOpen ? 'w-64' : 'w-20'
        }`}
    >
      {/* Sidebar Header with Toggle Button */}
      <div className="flex items-center justify-between p-4 h-16">
        <AiOutlineMenu
          className="text-white text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
        {/* {isOpen && <h1 className="text-white text-lg font-bold">Menu</h1>} */}
      </div>

      {/* Sidebar Navigation */}
      <nav className="mt-10">
      <NavLink to='/maps' >
          <div className="flex items-center p-4 hover:bg-gray-700 transition-colors cursor-pointer">
            <RiMapPin2Fill className="text-white text-xl" />
            {isOpen && (
              <span className="ml-4 text-white transition-all duration-300">Map</span>
            )}
          </div>
        </NavLink>
        <NavLink to='/' >
          <div className="flex items-center p-4 hover:bg-gray-700 transition-colors cursor-pointer">
            <AiOutlineHome className="text-white text-xl" />
            {isOpen && (
              <span className="ml-4 text-white transition-all duration-300">Dashboard</span>
            )}
          </div>
        </NavLink>

        <NavLink to='/covid19-list'>

          <div className="flex items-center p-4 hover:bg-gray-700 transition-colors cursor-pointer">
            <FaVirusCovid className="text-white text-xl" />
            {isOpen && (
              <span className="ml-4 text-white transition-all duration-300">Covid 19 List</span>
            )}
          </div>

        </NavLink>
        <NavLink to='/individualDashboard'>
        <div className="flex items-center p-4 hover:bg-gray-700 transition-colors cursor-pointer">
          <AiOutlineHome className="text-white text-xl" />
          {isOpen && (
            <span className="ml-4 text-white transition-all duration-300">Dashboard By State</span>
          )}
        </div></NavLink>
        <NavLink to='/todayCovidCase'>
        <div className="flex items-center p-4 hover:bg-gray-700 transition-colors cursor-pointer">
          <AiOutlineHome className="text-white text-xl" />
          {isOpen && (
            <span className="ml-4 text-white transition-all duration-300">Today's covid Case</span>
          )}
        </div></NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
