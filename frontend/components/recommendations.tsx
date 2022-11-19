// This needs to take in data from the backend

import Link from "next/link";
import { useRouter } from "next/router";

export interface RecommendationProps {
  previewImageUrl: string;
  title: string;
}

const Recommendation = (props: RecommendationProps) => {
  const router = useRouter()
  return (
    <Link className="aspect-square relative m-2 text-left" href={`/article/${encodeURIComponent(props.title)}`}>
      <img src={props.previewImageUrl} />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white p-1 min-h-13">{props.title}</div>
    </Link>
  );
};

interface RecommendationsProps {
  title: string;
  key: string;
  recommendations: RecommendationProps[];
}
export const Recommendations = (props: RecommendationsProps) => {
  return (
    <div className="bg-cornsilk-200 rounded-md p-2 m-4">
      <span>{props.title}</span>
      <div className="grid grid-cols-2">
        {props.recommendations.map((recProps, ind) => (
          <Recommendation {...recProps} key={`rec-${props.key}-${ind}`} />
        ))}
      </div>
    </div>
  );
};
