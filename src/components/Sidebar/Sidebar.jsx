

import React from 'react';
import { ListUser } from '../Adm';
import { Dialog, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Sidebar = () => {

  const [open, setOpen] = React.useState(false);

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
        <div className="mt-5">
          <button className="material-icons btn" onClick={handleOpen}>
            group_add
      </button>
        </div>
      </aside>
      <Dialog open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
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



