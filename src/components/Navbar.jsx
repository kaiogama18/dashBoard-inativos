import { logout } from '../utils/auth';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="flex justify-between overflow-hidden h-16 p-6 bg-white rounded-md shadow-sm">
        <div className="flex items-center">
          <button className="material-icons font-bold text-white shadow-md bg-blue-default hover:bg-blue-700 rounded-full h-10 w-10">
            {data.btn_add}
          </button>
          <p className="subtitle font-bold text-blue-800 ml-5">
            {data.btn_add_title}
          </p>
        </div>

        <div className="flex items-center">
          <button
            className="material-icons font-bold text-white -md  bg-red-600 hover:bg-red-700 rounded-full h-10 w-10"
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
  btn_add: 'add',
  btn_logout: 'power_settings_new',
  btn_add_title: 'Nova Safra',
};
