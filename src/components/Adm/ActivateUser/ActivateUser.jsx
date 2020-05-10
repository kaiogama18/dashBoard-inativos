import React, { useState } from 'react';
import { CircularProgress, Checkbox } from '@material-ui/core';
import Rota from '../../../Routes/Rota';

export default ({ ativo, cpf, updateData }) => {
  const route = '/adm_usuario/ativar';
  const [loading, setLoading] = useState(false);


  const Activate = async (props) => {
    setLoading(true)
    const param = (ativo == 1) ? { cpf: props.cpf, "ativo": 0 } : { cpf: props.cpf, "ativo": 1 }
    const { menssage } = await Rota({ route, param });
    updateData({ menssage, code: 8080 })

    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }

  return (
    <div className="flex items-center justify-center ">
      {loading ? <div className="mr-2">  <CircularProgress size={24} /> </div> :
        <Checkbox
          checked={ativo == 1 ? true : false}
          color="primary"
          onClick={() => Activate({ ativo, cpf })}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      }
      {ativo == 1 ? 'Ativado' : 'Inativo'}
    </div>

  )
}
