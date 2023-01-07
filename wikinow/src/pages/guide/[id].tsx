import { type NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { api } from '../../utils/api';

const Guide: NextPage = () => {
    const id = useRouter().query.id as string;
    const guideQuery = api.guides.viewGuide.useQuery({ id });

    useEffect(() => {
        if (guideQuery.status === 'success' && guideQuery.data !== undefined && id !== undefined) {
            (async () => {
                let shouldRefetch = false;

                // Go through each step and substep and make sure that a paragraph exists
                for (const step of guideQuery.data.steps) {
                    for (const substep of step.substeps) {
                        if (substep.paragraph === null || substep.paragraph === "") {
                            console.log("Generating paragraph for " + step.text + " - " + substep.text + "...");

                            await toast.promise(fetch(`/api/guides/paragraph?guideID=${id}&partID=${step.id}&stepID=${substep.id}`), {
                                loading: `Generating paragraph for ${step.text} - ${substep.text}...`,
                                success: (response) => {
                                    console.log(response.status);
                                    console.log(response.body);
                                    shouldRefetch = true;
                                    return `Generated paragraph for ${step.text} - ${substep.text}!`;
                                },
                                error: () => `Failed to generate paragraph for ${step.text} - ${substep.text}!`,
                            }, {
                                position: 'bottom-right'
                            });
                        }
                    }
                }

                if (shouldRefetch) guideQuery.refetch();
            })();
        }
    }, [guideQuery, id]);

    if (guideQuery.status !== 'success') {
        return <div>Loading...</div>
    }

    if (guideQuery.isError) {
        return <div>Error!</div>
    }

    return (
        <>
            <Head>
                <title>{"wikiNow - " + guideQuery.data?.title ?? "Guide"}</title>
            </Head>
            <Toaster />
            <main className="flex min-h-screen flex-col items-center justify-center bg-gin_fizz-400">
                <h1 className="text-5xl font-extrabold tracking-tight text-port_gore-400 sm:text-[4rem]">
                    {guideQuery.data?.title}?
                </h1>
                <h2>Views: {guideQuery.data?.views}</h2>
                <div className='flex flex-col container'>
                    {guideQuery.data?.steps.map((step) => {
                        return (
                            <div key={step.id}>
                                <h2 className='font-bold'>{step.text}</h2>
                                <p>{step.paragraph}</p>
                                {step.substeps.map((substep) => {
                                    return (
                                        <div key={substep.id}>
                                            <h3 className='underline'>{substep.text}</h3>
                                            <p>{substep.paragraph}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>

            </main>
        </>
    )
}

export default Guide;