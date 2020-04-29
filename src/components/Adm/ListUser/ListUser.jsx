import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DeleteUser, ActivateUser } from '..';


export default () => {
  const [data, setData] = useState([]);
  const [menssage, setMenssage] = useState('');
  const [code, setCode] = useState('');

  const [route, setRoute] = useState('listar');
  const url = 'api/list_usuario';

  /*
   * Call Api
   * ======================================================================== */


  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ route }),
        });

        if (response.status === 200) {
          const { data, menssage, code } = await response.json();
          setMenssage(menssage)
          setCode(code)
          return setData(data)

        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      } catch (error) {
        const { response } = error;
      }
    };

    fetchAPI();
  }, [route])


  /*
 * Style Table
 * ======================================================================== */


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


  /*
* Table list User
* ======================================================================== */

  const Root = data.length ? (
    <TableContainer className={cx('card-modal')}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>{menssage}</StyledTableCell>
            <StyledTableCell align="right">STATUS</StyledTableCell>
            <StyledTableCell align="right">DELETAR</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((list, i) => (
            <StyledTableRow key={i}>

              <StyledTableCell component="th" scope="row">
                {list.email}
              </StyledTableCell>

              <StyledTableCell align="right">
                <ActivateUser ativo={list.ativo} />
              </StyledTableCell>

              <StyledTableCell align="right">
                <DeleteUser nome={list.nome} cpf={list.cpf} />
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null


  return Root
};
