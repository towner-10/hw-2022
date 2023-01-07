interface PrimaryProps {
    child: React.ReactNode;
    onClick: () => void;
}

export const PrimaryButton = (props: PrimaryProps) => {
    return (
        <button onClick={props.onClick}
            className="text-xl text-white font-bold transition-colors bg-port_gore-500 border-4 border-port_gore-500 py-[0.5rem] sm:py-3 px-[3rem] sm:px-16 rounded-2xl hover:bg-port_gore-400">
            {props.child}
        </button>
    );
}

export const PrimaryIconButton = (props: PrimaryProps) => {
    return (
        <button onClick={props.onClick} className="m-2 bg-port_gore-500 rounded-lg border-4 border-port_gore-500 p-[0.25rem] hover:bg-port_gore-400 transition-colors duration-200">
            {props.child}
        </button>
    );
}