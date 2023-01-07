/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface GuideCardProps {
    id: string;
    title: string;
    steps: number;
    images: string[];
    views: number;
    createdAt: Date;
}

export const GuideCard = (props: GuideCardProps) => {
    return (
        <Link href={`guide/${props.id}`}>
            <div className="bg-gin_fizz-600 flex flex-col shadow-md rounded-lg w-[22.5rem] sm:w-[30rem] p-2 border-2 border-gin_fizz-600 hover:border-gin_fizz-700 transition-colors">
                <h1 className="font-bold text-2xl">{props.title}</h1>
                <div className="flex flex-row justify-items-start">
                    {props.images.length > 0 && <img alt={props.title} className="rounded-lg w-[150px] h-[150px] aspect-square object-cover m-2" src={props.images[0]}></img>}
                    <div className="flex flex-col justify-start m-4">
                        <p className="text-lg"><span className="font-bold">{props.steps}</span>{props.steps === 1 && " Step" || " Steps"}</p>
                        <p className="text-lg"><span className="font-bold">{props.images.length}</span>{props.images.length === 1 && " Image" || " Images"}</p>
                    </div>
                </div>
                <p>Created: {props.createdAt.toDateString()} - Views: {props.views}</p>
            </div>
        </Link>

    );
}