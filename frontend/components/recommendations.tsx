/* eslint-disable @next/next/no-img-element */
// This needs to take in data from the backend

export interface RecommendationProps {
  title: string;
  id: string;
}

interface RecommendationsProps {
  title: string;
  key?: string;
  recommendations: RecommendationProps[];
}

const Recommendation = (prop: RecommendationProps) => {
  return (
    <a className="aspect-square relative m-2 text-left hover:scale-110 transition-all duration-150" href={`/article/${encodeURIComponent(prop.id)}`}>
      <img src={`${process.env.NEXT_PUBLIC_API_URL}/api/guide/${prop.id}/output_1.png`} alt="Preview image" width={164} height={164} />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white p-1 min-h-13">{prop.title}</div>
    </a>
  );
};

export const Recommendations = (props: RecommendationsProps) => {
  return (
    <div className="bg-cornsilk-200 rounded-md p-2 m-4">
      <div className="flex flex-row justify-center"><em>{props.title}</em></div>
      <div className="grid grid-cols-2">
        {props.recommendations.map((recProps, ind) => (
          <Recommendation {...recProps} key={`rec-${props.key}-${ind}`} />
        ))}
      </div>
    </div>
  );
};
