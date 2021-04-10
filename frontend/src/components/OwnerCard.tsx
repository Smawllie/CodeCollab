import FileCopyIcon from "@material-ui/icons/FileCopy";

interface Props {
    name: String;
    email: String;
    setOpenCopyPopup: Function;
    isReadOnly: boolean;
}

const OwnerCard = ({ name, email, setOpenCopyPopup, isReadOnly }: Props) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setOpenCopyPopup(true);
    };

    return (
        <div className="shadow-xs flex justify-between w-full bg-blue-500 text-white">
            <div className="flex flex-col mx-3 p-2">
                <div>
                    <span className="text-2xl font-bold mx-4">Project</span>
                    <span className="text-xl">{name}</span>
                </div>
                <div>
                    <span className="w-full text-lg font-bold mx-4">Owner</span>
                    <span className="w-full text-lg">{email}</span>
                </div>
                <span className="w-full text-lg font-bold mx-4">
                    {isReadOnly && <h1>Viewing only</h1>}
                </span>
            </div>
            <div className="bg-none mx-4 flex flex-col justify-center">
                <button
                    onClick={handleCopy}
                    className="outline-none w-full p-3"
                >
                    <span className="mr-2">Share This Project</span>
                    <FileCopyIcon />
                </button>
            </div>
        </div>
    );
};

export default OwnerCard;
