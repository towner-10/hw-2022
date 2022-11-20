import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { createRef, useEffect, useRef, useState } from "react";
import { Loader } from "../../components/loader";
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

// Each key will be present in all of image/paragraphs/steps.
interface GuideReturnResponse {
  title: string;
  images: {
    [key: string]: {
      [key: string]: string;
    };
  };
  paragraphs: {
    [key: string]: {
      [key: string]: string;
    };
  };
  parts: {
    [key: string]: string;
  };
  steps: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

interface ArticleProps {
  title: string;
  summary: string;
  sections: WikihowStepProps[][];
  recommendations: RecommendationProps[][];
}

const isEmptyObject = (obj: any) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

const processGuideReturnResponse = (res: GuideReturnResponse): ArticleProps => {
  const allSections = Object.entries(res.parts)
    .filter(([_, val]) => !isEmptyObject(val))
    .map(([partInd, partTitle]) => {
      const sectionSteps = Object.entries(res.steps[partInd])
        .filter(([_, val]) => !isEmptyObject(val))
        .map(([stepInd, stepTitle]) => {
          // console.log("Part ind: ", partInd, "stepInd", stepInd);
          const step: WikihowStepProps = {
            stepNum: stepInd || "No step number",
            sectionTitle: partTitle || "No section title",
            title: stepTitle || "No step title",
            restOfDesc:
              res?.paragraphs?.[partInd]?.[stepInd] ||
              "There is no description for this step.",
            imageUrl:
              res?.images?.[partInd]?.[stepInd] ||
              "https://www.wikihow.com/images/thumb/2/2f/Be-Diplomatic-with-Family-Step-1.jpg/v4-460px-Be-Diplomatic-with-Family-Step-1.jpg.webp",
          };

          return step;
        });

      return sectionSteps;
    });

  // TODO: Uncomment
  // const { title, summary } = res;

  // TODO: remove this hardcoded stuff
  const { title } = res;
  const recommendations = recs;
  const summary = "This is a summary";

  return { title, summary, sections: allSections, recommendations };
};

export default function Article() {
  const router = useRouter();

  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [data, setData] = useState<ArticleProps | undefined>();
  const { articleId } = router.query;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // console.log("interval run");
      if (articleId && !data) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guide/${articleId}`)
          .then((res) => res.json())
          .then((json) => {
            if (json.status === 200) {
              console.log("Received json: ", json);
              if (json.reponse) clearInterval(intervalRef.current);

              setData(processGuideReturnResponse(json.response));
            }
          });
      }
    }, 2000);

    return () => intervalRef?.current && clearInterval(intervalRef.current);
  }, [articleId]);

  useEffect(() => {
    if (data) {
      clearInterval(intervalRef.current);
    }
  }, [data]);

  if (!articleId) {
    return (
      <div className="bg-cornsilk-400 min-h-screen flex flex-col items-center justify-center pt-4">
        <h1 className="text-3xl">WikiNow</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <>
        <Head>
          <title>{`WikiNow - Loading...`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-cornsilk-400 min-h-screen flex flex-col items-center justify-center pt-4">
          <h1 className="text-3xl">
            Loading <Loader />
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`WikiNow - ${data.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-cornsilk-400 min-h-screen flex flex-col items-center justify-center pt-4">
        <>
          <Link
            href="/"
            className="text-2xl h-12 underline transition-all duration-75 hover:text-patrick-blue-400 hover:scale-110"
          >
            <h1>WikiNow</h1>
          </Link>

          <div className="m-4">
            <h1 className="text-3xl h-16 capitalize">{data.title}</h1>
            <div className="bg-cornsilk-200 rounded-md p-2 text-lg shadow-lg">
              {data.summary}
            </div>
          </div>

          {data.sections.map((section, sectionInd) => {
            return section.map((step, stepInd) => {
              return (
                <div key={stepInd} className="m-4">
                  <WikihowStep
                    {...step}
                    key={`wkhw-${sectionInd}-${stepInd}`}
                  />
                </div>
              );
            });
            // return <WikihowStep {...data} key={`wkhw-${ind}`} />;
          })}

          <div className="flex flex-col md:flex-row">
            <Recommendations
              title="You Might Also Like"
              recommendations={data.recommendations[0]}
            />
            <Recommendations
              title="Featured Articles"
              recommendations={data.recommendations[1]}
            />
          </div>
        </>
      </div>
    </>
  );
}
