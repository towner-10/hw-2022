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

const GuideCard = (props: GuideCardProps) => {
  return (
    <Link href={`guide/${props.id}`}>
      <div className="flex w-[22.5rem] flex-col rounded-lg border-2 border-gin_fizz-600 bg-gin_fizz-600 p-2 shadow-md transition-colors hover:border-gin_fizz-700 sm:w-[30rem]">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <div className="flex flex-row justify-items-start">
          {props.images.length > 0 && (
            <img
              alt={props.title}
              className="m-2 aspect-square h-[150px] w-[150px] rounded-lg object-cover"
              src={props.images[0]}
            ></img>
          )}
          <div className="m-4 flex flex-col justify-start">
            <p className="text-lg">
              <span className="font-bold">{props.steps}</span>
              {(props.steps === 1 && " Step") || " Steps"}
            </p>
            <p className="text-lg">
              <span className="font-bold">{props.images.length}</span>
              {(props.images.length === 1 && " Image") || " Images"}
            </p>
          </div>
        </div>
        <p>
          Created: {props.createdAt.toDateString()} - Views: {props.views}
        </p>
      </div>
    </Link>
  );
};

export default GuideCard;
