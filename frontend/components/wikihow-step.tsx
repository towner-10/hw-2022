/* eslint-disable @next/next/no-img-element */
export interface WikihowStepProps {
  section: string;
  sectionTitle: string;
  display?: boolean;
  imageUrl?: string;
  paragraph?: string;
}

export const WikihowStep = (props: WikihowStepProps) => {
  if (props.display === false) return (<></>);
  return (
    <div className="bg-cornsilk-200 rounded-md mb-8 shadow-lg">
      <div className="flex flex-row sticky rounded-t-md bg-cornsilk-200 border-b-2 top-0 border-patrick-blue-400">
        <div className="flex flex-col items-center rounded-tl-md justify-center w-16 h-16 bg-patrick-blue-400 text-cornsilk-400">
          <h1>{props.section}</h1>
        </div>
        <div className="ml-6 flex flex-col justify-center">
          <h2>{props.sectionTitle}</h2>
        </div>
      </div>
      <div className="p-10 flex flex-col md:flex-row justify-between">
        {props.imageUrl && <img
            src={props.imageUrl}
            alt={props.sectionTitle}
            height={512}
            width={512}
            className="aspect-squar object-scale-down "
          /> || <div className="animate-pulse w-[512px] h-[512px] bg-cornsilk-400" />}
        
        <div className="flex flex-col justify-center pl-6 text-lg">
          <span className="text-left">
            {props.paragraph}
          </span>
        </div>
      </div>
    </div>
  );
};
