import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { DeleteUser, ActivateUser } from '..';
import Rota from '../../../Routes/Rota';


export default () => {
  const [route, setRoute] = useState('/adm_usuario/listar');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const { data, menssage } = await Rota({ route });
      setData(data)
    }
    fetchAPI();
  }, [route])



  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#015c92',
      color: theme.palette.common.white,
      fontSize: '1.25rem',
    },
    body: {
      fontSize: '1.25rem',
    },

  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
  const Root = data.length ? (
    <TableContainer >
      <Table>
        <TableBody>
          {data.map((list, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {list.email}
              </StyledTableCell>

              <StyledTableCell>
                <ActivateUser ativo={list.ativo} cpf={list.cpf} />
              </StyledTableCell>

              <StyledTableCell >
                <DeleteUser nome={list.nome} cpf={list.cpf} />
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  ) : <div>CARREGANDO</div>






  return Root
};
