import Snackbar from "@material-ui/core/Snackbar";

interface CopyPopupProps {
    openCopyPopup: boolean;
    handleCloseCopyPopup: (event: object, reason: string) => void;
}

export default function CopyPopup({
    openCopyPopup,
    handleCloseCopyPopup,
}: CopyPopupProps) {
    return (
        <Snackbar
            className="text-center"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            autoHideDuration={1500}
            message="Copied!"
            open={openCopyPopup}
            onClose={handleCloseCopyPopup}
        />
    );
}
