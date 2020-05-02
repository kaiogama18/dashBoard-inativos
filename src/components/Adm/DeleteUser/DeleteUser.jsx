import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Rota from '../../../Routes/Rota';

export default ({ nome, cpf, updateData }) => {
  const route = '/adm_usuario/deletar';

  const deleteUser = async (props) => {
    const param = { cpf: props.cpf }
    const { menssage } = await Rota({ route, param });
    alert(menssage)
    updateData()
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => deleteUser({ cpf, nome })}
      startIcon={<DeleteIcon />}
    >
      Excluir
    </Button>
  )
}
