import { logout } from '../../utils/auth';
import { Card } from '..';
import cx from 'classnames';

class Navbar extends React.Component {
  render() {
    return (
      <Card className={cx('card', 'navbar')}>
        <div>
          <button className="navbar__icon btn_add material-icons">
            {data.btn_add}
          </button>
          <p className="subtitle">{data.btn_add_title}</p>
        </div>

        <div>
          <button
            className="navbar__icon btn_exit material-icons"
            onClick={logout}
          >
            {data.btn_logout}
          </button>
        </div>
      </Card>
    );
  }
}

export default Navbar;

const data = {
  btn_add: 'add',
  btn_logout: 'power_settings_new',
  btn_add_title: 'Adicionar Safra',
};
