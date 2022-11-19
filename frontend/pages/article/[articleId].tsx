import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  RecommendationProps,
  Recommendations,
} from "../../components/recommendations";
import { WikihowStep, WikihowStepProps } from "../../components/wikihow-step";

const susData: WikihowStepProps[] = [
  {
    stepNum: 1,
    title: "Stay calm, even if your relatives are getting excited.",
    boldDesc: "If you feel yourself getting worked up, take a breather.",
    restOfDesc:
      "Try not to let your emotions take over, even though it might be tough. Take some deep breaths in through your nose and out through your mouth as you count to 10.[1] The calmer you are, the more you’ll be able to handle a difficult family member who is trying to get you worked up. \nIf you can’t stay calm, it might be time to leave the situation. Step outside or into the other room to gather your thoughts and collect yourself.",
    imageUrl:
      "https://www.wikihow.com/images/thumb/2/2f/Be-Diplomatic-with-Family-Step-1.jpg/v4-460px-Be-Diplomatic-with-Family-Step-1.jpg.webp",
  },
  {
    stepNum: 2,
    title: "Stay calm, even if your relatives are getting excited.",
    boldDesc: "If you feel yourself getting worked up, take a breather.",
    restOfDesc:
      "Try not to let your emotions take over, even though it might be tough. Take some deep breaths in through your nose and out through your mouth as you count to 10.[1] The calmer you are, the more you’ll be able to handle a difficult family member who is trying to get you worked up. \nIf you can’t stay calm, it might be time to leave the situation. Step outside or into the other room to gather your thoughts and collect yourself.",
    imageUrl:
      "https://www.wikihow.com/images/thumb/2/2f/Be-Diplomatic-with-Family-Step-1.jpg/v4-460px-Be-Diplomatic-with-Family-Step-1.jpg.webp",
  },
  {
    stepNum: 3,
    title: "Stay calm, even if your relatives are getting excited.",
    boldDesc: "If you feel yourself getting worked up, take a breather.",
    restOfDesc:
      "Try not to let your emotions take over, even though it might be tough. Take some deep breaths in through your nose and out through your mouth as you count to 10.[1] The calmer you are, the more you’ll be able to handle a difficult family member who is trying to get you worked up. \nIf you can’t stay calm, it might be time to leave the situation. Step outside or into the other room to gather your thoughts and collect yourself.",
    imageUrl:
      "https://www.wikihow.com/images/thumb/2/2f/Be-Diplomatic-with-Family-Step-1.jpg/v4-460px-Be-Diplomatic-with-Family-Step-1.jpg.webp",
  },
];

interface ArticleProps {
  title: string;
  summary: string;
  steps: WikihowStepProps[];
  recommendations: RecommendationProps[][];
}

export default function Article(props: ArticleProps) {
  const router = useRouter();

  const { articleId } = router.query;

  if (!articleId) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>WikiNow - {articleId[0]}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-cornsilk-400 flex flex-col items-center justify-center pt-4">
        <>
          <span className="text-2xl h-12">WikiNow</span>

          <div className="m-4">
            <h1 className="text-3xl h-16">{props.title}</h1>
            <div className="bg-cornsilk-200 rounded-md p-2 ">
              {props.summary}
            </div>
          </div>

          {susData.map((data, ind) => {
            return <WikihowStep {...data} key={`wkhw-${ind}`} />;
          })}

          <Recommendations
            title="You Might Also Like"
            key="1"
            recommendations={props.recommendations[0]}
          />
          <Recommendations
            title="Featured Articles"
            key="2"
            recommendations={props.recommendations[1]}
          />
        </>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<{ props: ArticleProps }> => {
  // const recs = await (
  //   await fetch(`${process.env.API_URL}/recommend?batch=2`)
  // ).json();

  const recs: RecommendationProps[][] = [
    [
      {
        title: "How to Have the best vacation of your life",
        previewImageUrl:
          "https://www.wikihow.com/images/thumb/e/ee/Have-the-Best-Vacation-of-Your-Life-Step-22.jpg/-crop-127-140-127px-Have-the-Best-Vacation-of-Your-Life-Step-22.jpg.webp",
      },
      {
        title: "How to Start a great school year",
        previewImageUrl:
          "https://www.wikihow.com/images/thumb/d/d4/Start-a-Great-School-Year-Step-10.jpg/-crop-127-140-127px-Start-a-Great-School-Year-Step-10.jpg.webp",
      },
      {
        title: "How to Set Goals",
        previewImageUrl:
          "https://www.wikihow.com/images/thumb/a/a5/Set-Goals-Step-12-Version-2.jpg/-crop-127-140-127px-Set-Goals-Step-12-Version-2.jpg.webp",
      },
      {
        title: "How to Best 2 ways to clean running shoes",
        previewImageUrl:
          "https://www.wikihow.com/images/thumb/f/f8/Clean-Running-Shoes-Step-14-Version-2.jpg/-crop-127-140-127px-Clean-Running-Shoes-Step-14-Version-2.jpg.webp",
      },
    ],
    [
      {
        title: "AAAAA",
        previewImageUrl:
          "https://www.wikihow.com/images/thumb/e/ee/Have-the-Best-Vacation-of-Your-Life-Step-22.jpg/-crop-127-140-127px-Have-the-Best-Vacation-of-Your-Life-Step-22.jpg.webp",
      },
      {
        title: "BBBB",
        previewImageUrl:
          "https://www.wikihow.com/images/thumb/d/d4/Start-a-Great-School-Year-Step-10.jpg/-crop-127-140-127px-Start-a-Great-School-Year-Step-10.jpg.webp",
      },
      {
        title: "CCCC",
        previewImageUrl:
          "https://www.wikihow.com/images/thumb/a/a5/Set-Goals-Step-12-Version-2.jpg/-crop-127-140-127px-Set-Goals-Step-12-Version-2.jpg.webp",
      },
      {
        title: "DDDD",
        previewImageUrl:
          "https://www.wikihow.com/images/thumb/f/f8/Clean-Running-Shoes-Step-14-Version-2.jpg/-crop-127-140-127px-Clean-Running-Shoes-Step-14-Version-2.jpg.webp",
      },
    ],
  ];

  // const { title, summary, steps } = await (
  //   await fetch(`${process.env.API_URL}/article/${ctx.query}`)
  // ).json();

  const title = "How to Have a Great Future";
  const summary =
    "Building a great future will require making changes to your life now. Whether having a great future to you means having a family, a high-paying job or getting into your dream school, it’s the things you do today will affect your tomorrow. You will have to plan and make deliberate changes in your life. Follow the steps in this article to have a great future.";
  const steps = susData;

  return {
    props: {
      recommendations: recs,
      title,
      summary,
      steps,
    },
  };
};
