import { logout } from '../../utils/auth';
import Card from "../Card/Card";
import cx from 'classnames';
import { Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


class Navbar extends React.Component {

  render() {

    return (
      <Card className={cx('card', 'navbar')}>
        <div>
          <Fab size="medium" disabled aria-label="add">
            <AddIcon />
          </Fab>
          <p className="subtitle">{data.btn_add_title}</p>
        </div>

        <div>
          <Tooltip title="Sair" aria-label="sair">

            <Fab size="medium" color="secondary" aria-label="logout" onClick={logout} disableElevation >
              <PowerSettingsNewIcon />
            </Fab>
          </Tooltip>


        </div>
      </Card>
    );
  }
}

export default Navbar;

const data = {
  btn_add_title: 'Adicionar Safra',
};
