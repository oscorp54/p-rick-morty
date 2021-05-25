/*
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Table from '../src/Table';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Proyecto Rick y Morty
        </Typography>
        <Table />
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
*/
/*
function Page({ stars }) {
  return <div>Next stars: {stars.info.count}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('http://localhost:3001/list')
  const json = await res.json()
  console.log(json.info.count);
  return { stars: json }
}

export default Page;
*/
import Head from 'next/head';
import Link from 'next/link';

export default function Home({ data }) {
  return (
    <div>
      {data.results.map((item) => (
        <p key={item.id}>
          <Link href={`/todo/${item.id}`}>
            <a>{item.id} {item.name}</a>
          </Link>
        </p>
      ))}
    </div>
  );
}

export const getStaticProps = async(context) => {
  const res = await fetch('http://localhost:3001/list');
  const data = await res.json();

  return {
    props: {
      data 
    }
  };
};