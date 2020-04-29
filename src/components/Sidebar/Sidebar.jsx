

import React from 'react';
import Modal from '@material-ui/core/Modal';
import { ListUser } from '../Adm';

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
      <Modal
        className="flex justify-center "
        open={open}
        onClose={handleClose}>
        <ListUser />
      </Modal>
    </>
  )



}
export default Sidebar;



