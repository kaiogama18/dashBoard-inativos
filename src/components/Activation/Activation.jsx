import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Radio from '@material-ui/core/Radio';
export default () => {

  const [route, setRoute] = useState('listar');
  const [lists, setLists] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const url = 'api/adm_usuario';


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

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ route }),
        });

        if (response.status === 200) {
          const { data } = await response.json();

          return setLists(data)

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



  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };



  const Root = lists.length ? (
    <TableContainer className={cx('card-modal')}>
      <Table className="bg-gray-200">
        <TableHead>
          <TableRow>
            <StyledTableCell>E-mail</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Deletar Usuário</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {lists.map((list, i) => (
            <StyledTableRow key={list.i}>
              <StyledTableCell component="th" scope="row">
                {list.email}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Radio
                  checked={list.ativo === 1}
                  onChange={handleChange}
                  inputProps={0}
                />
                {list.ativo}
              </StyledTableCell>
              <StyledTableCell align="right">


                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  Excluir
                  </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null


  return Root
};
