export interface WikihowStepProps {
  stepNum: number;
  title: string;
  imageUrl: string;
  boldDesc: string;
  restOfDesc: string;
}

export const WikihowStep = (props: WikihowStepProps) => {
  return (
    <div className="bg-cornsilk-200 rounded-md m-4 mb-8">
      <div className="flex flex-row sticky rounded-t-md bg-cornsilk-200 b border-b-2 top-0 border-">
        <div className="flex flex-col items-center rounded-tl-md justify-center w-16 h-16 bg-patrick-blue-400 text-cornsilk-400">
          <h1>{props.stepNum}.</h1>
        </div>
        <div className="pl-6 flex flex-col justify-center">
          <h2>{props.title}</h2>
        </div>
      </div>
      <div className="p-10 flex flex-col md:flex-row justify-between">
        <img
          src={props.imageUrl}
          alt={props.title}
          height={512}
          width={512}
          className="aspect-square object-scale-down "
        />
        <div className="flex flex-col justify-evenly pl-6">
          <span>
            <em>{props.boldDesc}</em> {props.restOfDesc}
          </span>
        </div>
      </div>
    </div>
  );
};
