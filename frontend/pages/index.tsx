import Head from "next/head";
import {
  RecommendationProps,
  Recommendations,
} from "../components/recommendations";
import { useEffect, useState } from "react";
import { SearchBox } from "../components/search-box";
import { GuideReturnResponse } from "./article/[articleId]";

export default function Home() {
  const [recommendations, setRecommendations] = useState<RecommendationProps[] | undefined>(undefined);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guides/recommended`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          const result: RecommendationProps[] = [];
          json.response.forEach((rec: any) => {
            const guide: GuideReturnResponse = rec;
            result.push({
              title: guide.title,
              id: guide.id ? guide.id : "",
            });

          });
          setRecommendations(json.response);
        }
      }).catch(() => {
        console.log("Could not fetch");
      });
  }, []);

  return (
    <>
      <Head>
        <title>WikiNow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-cornsilk-400 h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl">WikiNow</h1>
        <div className="text-center pt-4 pb-10">
          Enter a how-to question below
          <SearchBox />
        </div>
        {recommendations && <Recommendations
          title="You Might Also Like"
          recommendations={recommendations}
        />}
      </div>
    </>
  );
}
