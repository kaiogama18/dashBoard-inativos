import { logout } from "../utils/auth";

const Navbar = () => (
  // const Navbar = ({ data }) => (
  <nav className="grid grid-cols-6 gap-4 rounded-md overflow-hidden  bg-white h-auto p-3 px-10">
    <div className="flex col-start-1 col-end-3 items-center">
      <button className="material-icons text-white shadow flex bg-blue-default hover:bg-blue-700 rounded-full h-10 w-10 items-center justify-center">
        add
      </button>
      <p className="px-5 text-base text-blue-800 uppercase">Nova Safra</p>
    </div>
    <div className="flex col-end-7 col-span-2 items-center justify-end">
      <button
        className="material-icons text-white shadow flex bg-red-600 hover:bg-red-700 rounded-full h-10 w-10 items-center justify-center"
        onClick={logout}
      >
        power_settings_new
      </button>
      {/* <button className="shadow-md rounded-full h-10 w-10" onClick={logout}>
         <img
          className="shadow-md rounded-full h-10 w-10"
          src={data}
          alt="Avatar"
        /> 
      </button> */}
    </div>
  </nav>
);

export default Navbar;
