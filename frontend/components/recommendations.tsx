/* eslint-disable @next/next/no-img-element */
// This needs to take in data from the backend

import Link from "next/link";

export interface RecommendationProps {
  previewImageUrl: string;
  title: string;
}

interface RecommendationsProps {
  title: string;
  key?: string;
  recommendations: RecommendationProps[];
}

const Recommendation = (props: RecommendationProps) => {
  return (
    <Link className="aspect-square relative m-2 text-left hover:scale-110 transition-all duration-150" href={`/article/${encodeURIComponent(props.title)}`}>
      <img src={props.previewImageUrl} alt="Preview image" />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white p-1 min-h-13">{props.title}</div>
    </Link>
  );
};

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
