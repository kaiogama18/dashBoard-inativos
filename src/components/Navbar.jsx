import { logout } from "../utils/auth";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="flex justify-between overflow-hidden h-16 p-6 bg-white">
        <div className="flex items-center">
          <button className="material-icons text-white shadow-md bg-blue-default hover:bg-blue-700 rounded-full h-10 w-10">
            {data.btn_add}
          </button>
          <p className="text-base text-blue-800 uppercase ml-5">
            {data.btn_add_title}
          </p>
        </div>

        <div className="flex items-center">
          <button
            className="material-icons text-white -md  bg-red-600 hover:bg-red-700 rounded-full h-10 w-10"
            onClick={logout}
          >
            {data.btn_logout}
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;

const data = {
  btn_add: "add",
  btn_logout: "power_settings_new",
  btn_add_title: "Nova Safra",
};
