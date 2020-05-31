import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from '../../lib/fetch'

export default function FirstPost() {
  // this is how we access dynamic routing information 
  // in an otherwise statically rendered page
  const router = useRouter()
  const { id } = router.query

  // use SWR to fetch more information via API call
  // after basic content loads
  const { data, error } = useSWR(`/api/test/${id}`, fetcher)

  return (
    <Layout>
      <Head>
        <title>Server fetch test</title>
      </Head>
      <h1>Fetch data server side rendered</h1>
      <h2>I was called with id '{id}'</h2>
      { 
        data ? 
          <>
            <p>Received API response text: {data.text}</p>
            <p>Received API response id: {data.id}</p>
          </> : 'Loading!'
      }

      <h2>
        <Link href="/"><a>Back to home</a></Link>
      </h2>
    </Layout>
  )
}
