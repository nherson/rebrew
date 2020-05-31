import Head from 'next/head'
import Link from 'next/link'
import { AromaCard } from '../../components/review/aroma'


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Rebrew</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="title">
          Submit a Review
        </h2>
        
        <div className="grid">
          <AromaCard></AromaCard>
        </div>
      </main>
    </div>
  )
}
