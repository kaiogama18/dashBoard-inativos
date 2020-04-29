import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export default ({ nome, cpf }) => {
  const url = 'api/inativo_api';

  const [data, setData] = useState([]);
  const [menssage, setMenssage] = useState('');
  const [code, setCode] = useState('');

  const ConectApi = async (props) => {
    // alert("ConectApi + Props \n" + JSON.stringify(props, null, 2));
    // const { param, route } = await props;
    // alert("ConectApi + route: \n" + JSON.stringify(route, null, 2));
    // alert("ConectApi + param: \n" + JSON.stringify(param, null, 2));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props),
      });

      if (response.status === 200) {
        const { data, menssage, code } = await response.json();
        setMenssage(menssage)
        setCode(code)
        setData(data)
        return alert(menssage)

      } else {
        let error = new Error(response.statusText);
        error.response = response;
        // alert("ConectApi + Error Else: \n" + JSON.stringify(response.statusText, null, 2));
        throw error;
      }
    } catch (error) {
      const { response } = error;
      // alert("ConectApi + Catch response: \n" + JSON.stringify(response, null, 2));
    }
  };




















  const deleteUser = (props) => {
    alert("Deseja remover para sempre esse usuario: \n" + props.nome);
    const param = { cpf: props.cpf }
    ConectApi({ param, route: '/adm_usuario/deletar' })
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
