import React from 'react';
import Image from 'next/image'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

import Link from '../src/Link';
import Copyright from '../src/Copyright';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

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
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({ rows }) {
  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    console.log('change page', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
              <TableBody>
                {rows.results.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
                              <Link href={`/todo/${row['id']}`}>
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
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={rows.info.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <Copyright />
      </Box>
    </Container>
  );
}

export const getStaticProps = async(context) => {
  const res = await fetch('http://localhost:3001/list');
  const rows = await res.json();

  return {
    props: {
      rows
    }
  };
}

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const Home = (props) => {
    const [isLoading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    useEffect(() => {
        Router.events.on('routeChangeStart', startLoading);
        Router.events.on('routeChangeComplete', stopLoading);

        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', stopLoading);
        }
    }, [])

    const pagginationHandler = (page) => {
        const currentPath = props.router.pathname;
        const currentQuery = { ...props.router.query };
        currentQuery.page = page.selected + 1;

        props.router.push({
            pathname: currentPath,
            query: currentQuery,
        });

    };

    let content = null;
    if (isLoading)
        content = <div>Loading...</div>;
    else {
        content = (
            <ul>
                {props.posts.map(post => {
                    return <li key={post.id}>{post.title}</li>;
                })}
            </ul>
        );
    }

    return (
        <div className="container">
            <h1>Posts List with Pagination in Next.js</h1>
            <div className="posts">
                {content}
            </div>

            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                activeClassName={'active'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}

                initialPage={props.currentPage - 1}
                pageCount={props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={pagginationHandler}
            />
        </div>
    );
};

Home.getInitialProps = async ({ query }) => {
    const page = query.page || 1;
    const posts = await axios.get(`https://gorest.co.in/public-api/posts?_format=json&access-token=cxzNs8fYiyxlk708IHfveKM1z1xxYZw99fYE&page=${page}`);
    console.log(posts.data.data);
    return {
        totalCount: posts.data.meta.pagination.total,
        pageCount: posts.data.meta.pagination.pages,
        currentPage: posts.data.meta.pagination.page,
        perPage: posts.data.meta.pagination.limit,
        posts: posts.data.data,
        isLoading: false,
    };
}

export default withRouter(Home);
*/