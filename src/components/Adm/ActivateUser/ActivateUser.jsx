import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Rota from '../../../Routes/Rota';

export default ({ ativo, cpf, updateData }) => {
  const route = '/adm_usuario/ativar';

  const Activate = async (props) => {
    const param = (ativo == 1) ? { cpf: props.cpf, "ativo": 0 } : { cpf: props.cpf, "ativo": 1 }
    const { menssage } = await Rota({ route, param });
    alert(menssage)
    updateData()
  }

  return (
    <>
      <Checkbox
        checked={ativo == 1 ? true : false}
        color="primary"
        onClick={() => Activate({ ativo, cpf })}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      {ativo == 1 ? 'Ativado' : 'Inativo'}
    </>
  )
}
