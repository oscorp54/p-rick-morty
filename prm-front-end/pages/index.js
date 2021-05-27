import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router, { withRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Pagination from '@material-ui/lab/Pagination';
import SvgIcon from '@material-ui/core/SvgIcon';

import Link from '../src/Link';
import Copyright from '../src/Copyright';

const columns = [
  { 
    id: 'image', 
    label: 'Foto', 
    minWidth: 40,
    align: 'center'
  },
  { 
    id: 'name', 
    label: 'Nombre', 
    minWidth: 100 
  },
  {
    id: 'status',
    label: 'Estado',
    minWidth: 80,
    align: 'right',
  },
  {
    id: 'type',
    label: 'Tipo',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'gender',
    label: 'Genero',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'origin',
    label: 'Lugar de Origen',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'created',
    label: 'Creado en',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'favorite',
    label: 'Creado Favorito',
    minWidth: 30,
    align: 'center',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    maxHeight: 440,
  },
}));

function StartIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Home = (props) => {
  const classes = useStyles();

  const [isLoading, setLoading] = React.useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const [page, setPage] = React.useState(1);

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
        Router.events.off('routeChangeStart', startLoading);
        Router.events.off('routeChangeComplete', stopLoading);
    }
  });

  const handleChangePage = (event, newPage) => {

    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.page = newPage;

    props.router.push({
        pathname: currentPath,
        query: currentQuery,
    });

    setPage(newPage);
  };

  let content = null;
  if (isLoading)
        content = (
          <TableBody>
              <TableRow>
                ... wubba lubba dub dub ...
              </TableRow>
          </TableBody>
        );
    else {
      content = (
        <TableBody>
        {props.results.map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {columns.map((column) => {
                const value = row[column.id];
                if (column.id === 'image') {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      <Avatar alt={row['name']} src={value} className={classes.large} />
                    </TableCell>
                  );
                } else if (column.id === 'name') {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      <Link href={`/character/${row['id']}`}>
                        <a>{value}</a>
                      </Link>
                    </TableCell>
                  );
                } else if (column.id === 'origin') {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {row['origin'].name}
                    </TableCell>
                  );
                } else if (column.id === 'favorite') {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      <StartIcon color={(row['favorite'] && row['favorite'] === 1 ? "disabled" : "action")} />
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          );
        })}
        </TableBody>
      );
    }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Proyecto de prueba: Rick y Morty
        </Typography>
        <br />
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {content}
            </Table>
          </TableContainer>
          <Pagination count={props.totalCount} page={page} onChange={handleChangePage} />
        </Paper>
        <Copyright />
      </Box>
    </Container>
  );
}

Home.getInitialProps = async ({ query }) => {
  console.log('consulta', query);

  const page = (query.page || 1);
  
  let filter;
  filter = (query.name ? `&name=${query.name}` : '');
  filter += (query.status ? `&status=${query.status}` : '');
  filter += (query.species ? `&species=${query.species}` : '');
  filter += (query.type ? `&type=${query.type}` : '');
  filter += (query.gender ? `&gender=${query.gender}` : '');

  const dataJson = await axios.get(`http://localhost:3001/list/?page=${page}` + filter);

  return {
      totalCount: dataJson.data.info.count,
      pageCount: dataJson.data.info.pages,
      currentPage: page,
      perPage: dataJson.data.results.length,
      results: dataJson.data.results,
      isLoading: false,
  };
};

export default withRouter(Home);