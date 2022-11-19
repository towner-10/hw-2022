import Image from "next/image";

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
      <span>
        <div>{props.stepNum}</div>
        <div>
          <h2>{props.title}</h2>
        </div>
      </span>
      <img src={props.imageUrl} alt={props.title} height={512} width={512} />
      <div>
        <em>{props.boldDesc}</em>
        <span>{props.restOfDesc}</span>
      </div>
    </div>
  );
};
