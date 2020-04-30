import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Rota from '../../../Routes/Rota';

export default ({ ativo, cpf }) => {
  const route = '/adm_usuario/ativar';
  const [checked, setChecked] = useState(ativo == 1 ? true : false);



  const [status, setStatus] = useState(
    ativo == 1 ? 'Ativado' : 'Inativo');


  const Activate = async (props) => {

    const param = (ativo == 1) ? { cpf: props.cpf, "ativo": 0 } : { cpf: props.cpf, "ativo": 1 }
    const { menssage } = await Rota({ route, param });
    alert(menssage)
    return setChecked(ativo == 1 ? true : false)

  }


  return (
    <>
      <Checkbox
        checked={checked}
        color="primary"
        onClick={() => Activate({ ativo, cpf })}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      {status}
    </>
  )
}
