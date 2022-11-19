export interface WikihowStepProps {
  stepNum: number;
  title: string;
  imageUrl: string;
  boldDesc: string;
  restOfDesc: string;
}

export const WikihowStep = (props: WikihowStepProps) => {
  return (
    <div className="backdrop-brightness-75">
      <span className="flex flex-row bg-cornsilk-400 sticky top-0">
        <div className="flex flex-col items-center justify-center w-16 h-16 bg-patrick-blue-400 text-cornsilk-400">
          <h1>{props.stepNum}.</h1>
        </div>
        <div className="pl-6 flex flex-col justify-center">
          <h2>{props.title}</h2>
        </div>
      </span>
      <div className="p-10 flex flex-row justify-between">
        <img src={props.imageUrl} alt={props.title} height={512} width={512} />
        <div className="flex flex-col justify-evenly pl-6">
          <span><em>{props.boldDesc}</em> {props.restOfDesc}</span>
        </div>
      </div>
    </div>
  );
};
