import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container bg-cornsilk-400">
        <h1>Better WikiHow</h1>
      </div>
    </>
  )
}
