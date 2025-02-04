interface Props {
    classes?: string;
}

export default function SmallLoader({ classes }: Props) {
    return (
        <div className={`flex flex-row gap-2 ${classes}`}>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
    );
}
