import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-cornsilk-400 w-screen h-screen flex flex-col items-center justify-center">
        <h1 className='text-3xl'>Better WikiHow</h1>
      </div>
    </>
  )
}
