import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { Typography } from '@material-ui/core'
import { withAuth } from 'use-auth0-hooks'
import React from 'react'


class Home extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout>
          <Typography variant="h4" align="center" component="h1" color="textPrimary">
            Create a <a  href="/reviews/new">review!</a>
          </Typography>  
        </Layout>
      </>
    )
  }
}

export default withAuth(Home)