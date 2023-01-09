interface PrimaryProps {
  child: React.ReactNode;
  onClick: () => void;
}

export const PrimaryButton = (props: PrimaryProps) => {
  return (
    <button
      onClick={props.onClick}
      className="rounded-2xl border-4 border-port_gore-500 bg-port_gore-500 py-[0.5rem] px-[3rem] text-xl font-bold text-white transition-colors hover:bg-port_gore-400 sm:py-3 sm:px-16"
    >
      {props.child}
    </button>
  );
};

export const PrimaryIconButton = (props: PrimaryProps) => {
  return (
    <button
      onClick={props.onClick}
      className="m-2 rounded-lg border-4 border-port_gore-500 bg-port_gore-500 p-[0.25rem] transition-colors duration-200 hover:bg-port_gore-400"
    >
      {props.child}
    </button>
  );
};
