import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Loader } from "../../components/loader";
import { createRef, useEffect, useRef, useState } from "react";
import {
  RecommendationProps,
  Recommendations,
} from "../../components/recommendations";
import { WikihowStep, WikihowStepProps } from "../../components/wikihow-step";

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
  finished: boolean;
}

interface ArticleProps {
  title: string;
  summary: string;
  sections: WikihowStepProps[][];
  recommendations: RecommendationProps[][];
  finished: boolean;
}

const isEmptyObject = (obj: any) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

const processGuideReturnResponse = (res: GuideReturnResponse, id: string): ArticleProps => {
  const sections: WikihowStepProps[][] = Object.entries(res.steps)
    .filter(([_, val]) => !isEmptyObject(val))
    .map(([sectionKey, sectionSteps]) => {
      const steps = Object.entries(sectionSteps)
        .filter(([_, val]) => !isEmptyObject(val))
        .map(([stepKey, stepValue]) => {

          const image_file = res?.finished ? res?.images[stepKey] || "output_1.png" : undefined;

          const step: WikihowStepProps = {
            section: `${sectionKey}.${stepKey}`,
            sectionTitle: stepValue,
            paragraph: res?.paragraphs?.[sectionKey]?.[stepKey] || undefined,
            imageUrl: res?.finished ? `${process.env.NEXT_PUBLIC_API_URL}/api/guide/${id}/${image_file}` : undefined,
          };

          if (res.finished && isEmptyObject(res?.paragraphs)) step.display = false;
          if (res.finished && isEmptyObject(res?.images)) step.display = false;

          if (res.finished && (res.paragraphs[sectionKey] === undefined || res.paragraphs[sectionKey][stepKey] === undefined)) step.display = false;

          return step;
        });

      return steps;
    });

  const { title, finished } = res;
  const recommendations = recs;
  const summary = "This is a summary";

  return { title, summary, sections, recommendations, finished };
};

export default function Article() {
  const router = useRouter();

  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [data, setData] = useState<ArticleProps | undefined>(undefined);
  const { articleId } = router.query;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("Fetching data...");
      if (articleId && !data) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guide/${articleId}`)
          .then((res) => res.json())
          .then((json) => {
            if (json.status === 200) {
              console.log(json);
              console.log(json.response.finished);
              if (json.response && json.response.finished == true) clearInterval(intervalRef.current);
              setData(processGuideReturnResponse(json.response, articleId as string));
            }
          });
      }
    }, 2000);

    return () => intervalRef?.current && clearInterval(intervalRef.current);
  }, [articleId]);

  useEffect(() => {
    if (data?.finished) {
      clearInterval(intervalRef.current);
    }
  }, [data]);

  if (!articleId) {
    return <>
      <Head>
        <title>{`WikiNow - Error`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-cornsilk-400 min-h-screen flex flex-col items-center justify-center pt-4">
        <h1 className="text-3xl">No Article ID Found!</h1>
      </div>
    </>;
  }

  if (!data) {
    return (
      <>
        <Head>
          <title>{`WikiNow - Loading...`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-cornsilk-400 min-h-screen flex flex-col items-center justify-center pt-4">
          <h1 className="text-3xl pb-4">Loading...</h1>
          <Loader />
        </div>
      </>
    );
  }

  if (data.sections.length === 0) {
    return <>
      <Head>
        <title>{`WikiNow - Error`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-cornsilk-400 min-h-screen flex flex-col items-center justify-center">
        <Link
          href="/"
          className="text-2xl pb-20 h-12 underline transition-all duration-75 hover:text-patrick-blue-400 hover:scale-110"
        >
          <h1>WikiNow</h1>
        </Link>
        <h1 className="text-3xl pb-2">The prompt was not specific enough!</h1>
        <h2 className="text-xl">Try again using another prompt...</h2>
      </div>
    </>;
  }

  return (
    <>
      <Head>
        <title>{`WikiNow - ${data.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-cornsilk-400 flex flex-col items-center justify-center pt-4">
        <>
          <Link
            href="/"
            className="text-2xl h-12 underline transition-all duration-75 hover:text-patrick-blue-400 hover:scale-110"
          >
            <h1>WikiNow</h1>
          </Link>

          <div className="m-4">
            <h1 className="text-3xl h-16 capitalize">{data.title}</h1>
          </div>

          {data.sections.map((section, sectionIndex) => (
            section.map((step, stepIndex) => {
              return (
                <div key={stepIndex} className="m-4">
                  <WikihowStep
                    {...step}
                    key={`wkhw-${sectionIndex}-${stepIndex}`}
                  />
                </div>
              );
            }))
          )}

          <div className="flex flex-col md:flex-row">
            <Recommendations
              title="You Might Also Like"
              recommendations={data.recommendations[0]}
            />
          </div>
        </>
      </div>
    </>
  );
}