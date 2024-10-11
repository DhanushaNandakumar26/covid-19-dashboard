// components/Navbar.tsx
const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 h-16 flex items-center justify-center p-4 shadow-md">
      <div className="text-white text-2xl uppercase font-bold ">Covid 19 Monitoring</div>
      {/* <div className="flex items-center space-x-4">
        <div className="text-white hover:text-light-green cursor-pointer transition duration-200">Profile</div>
        <div className="text-white hover:text-light-green cursor-pointer transition duration-200">Settings</div>
        <div className="text-white hover:text-light-green cursor-pointer transition duration-200">Logout</div>
      </div> */}
    </nav>
  );
};

export default Navbar;
