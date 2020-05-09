

import React, { useState } from 'react';
import { ListUser } from '../Adm';
import { Dialog, Slide, IconButton, MuiThemeProvider, createMuiTheme, Tooltip } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { green } from '@material-ui/core/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Sidebar = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <img src="/buritech-icon.png" alt="logo" />
        </div>
        <div className="mt-5 flex justify-center items-center">
          {/* <button className="material-icons btn"
            onClick={handleOpen}>
            group_add
          </button> */}

          <Tooltip title="Lista de Usuários" placement="right">

            <IconButton aria-label="upload picture" component="span" onClick={handleOpen}>
              <GroupAddIcon fontSize="large" color="white" />
            </IconButton>
          </Tooltip>

        </div>
      </aside>
      <Dialog open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <div className="modal">
          <div>
            <p className="title">Lista de Usuários</p>
          </div>
          <div className="text-right">
            <button className="material-icons mt-1" onClick={handleClose}>
              cancel
            </button>
          </div>
        </div>
        <ListUser />
      </Dialog>
    </>
  )

}
export default Sidebar;



