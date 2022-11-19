import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
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
];

export default function Home() {
  const router = useRouter();

  const { articleId } = router.query;

  return (
    <>
      <Head>
        <title>WikiNow - {articleId}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-cornsilk-400 w-screen flex flex-col items-center justify-center">
        <>
          <h1 className="text-3xl">WikiNow</h1>
          <>
            {susData.map((data, ind) => {
              return <WikihowStep {...data} key={`wkhw-${ind}`} />;
            })}
          </>
        </>
      </div>
    </>
  );
}
