type Props = {
    className?: string;
}

export function Loader({className = ""}: Props) {
    return (
        <div className={className + " text-center"}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}