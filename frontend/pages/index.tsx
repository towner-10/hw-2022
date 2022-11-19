import Head from "next/head";
import Image from "next/image";
import { SearchBox } from "../components/search-box";

export default function Home() {
  return (
    <>
      <Head>
        <title>WikiNow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-cornsilk-400 h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl">WikiNow</h1>
        <div className="text-center pt-4">
          Enter a how-to question below
          <SearchBox />
        </div>
      </div>
    </>
  );
}
