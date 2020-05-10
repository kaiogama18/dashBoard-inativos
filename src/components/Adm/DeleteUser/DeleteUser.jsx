import React, { useState } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Rota from '../../../Routes/Rota';

export default ({ nome, cpf, updateData }) => {
  const route = '/adm_usuario/deletar';
  const [loading, setLoading] = useState(false);

  const deleteUser = async (props) => {
    setLoading(true)
    const param = { cpf: props.cpf }
    const { menssage, code } = await Rota({ route, param });
    updateData({ menssage, code })
    setTimeout(() => {
      setLoading(false)
    }, 3500);
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => deleteUser({ cpf, nome })}
      startIcon={loading ? <CircularProgress color="default" size={20} /> : <DeleteIcon />}
      disabled={loading ? true : false}
    >
      Excluir
    </Button>
  )
}
