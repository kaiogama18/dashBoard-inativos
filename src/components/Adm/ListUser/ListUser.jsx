import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableBody, TableCell, TableRow, withStyles, LinearProgress, Snackbar } from '@material-ui/core';
import { DeleteUser, ActivateUser } from '..';
import Rota from '../../../Routes/Rota';
import { Alert } from '../..';


export default () => {
  const [route, setRoute] = useState('/adm_usuario/listar');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [openStatus, seOpenStatus] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await Rota({ route });
      setData(data)
    }
    fetchAPI();
  }, [route])

  const updateData = async ({ menssage, code }) => {
    const { data } = await Rota({ route });
    // code == 8080 ? null : setStatus({ menssage: menssage, status: true, code: code })
    code == 8080 ? null : setStatus({ code: code, menssage: menssage })
    setData(data)
    seOpenStatus(true)
  }



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


  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    seOpenStatus(false)
  };


  const Feedback = (
    <Snackbar open={openStatus} autoHideDuration={2500} onClose={handleClose}>
      <Alert onClose={handleClose} severity={status.code == 400 ? "error" : "success"}>
        {status.menssage}
      </Alert>
    </Snackbar>
  )


  const Root = data.length ? (
    <>
      <TableContainer >
        <Table>
          <TableBody>
            {data.map((list, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {list.email}
                </StyledTableCell>

                <StyledTableCell>
                  <ActivateUser ativo={list.ativo} cpf={list.cpf} updateData={updateData} />
                </StyledTableCell>

                <StyledTableCell>
                  <DeleteUser nome={list.nome} cpf={list.cpf} updateData={updateData} />
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <AlertStatus alert={status} /> */}
      {Feedback}
    </>

  ) : <div className="mx-2 p-5"><LinearProgress /></div>
  // ) : <Backdrop >
  //     <CircularProgress color="inherit" />
  //   </Backdrop>

  return Root
};
