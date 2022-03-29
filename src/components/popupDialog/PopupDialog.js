import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const PopupDialog = (props) => {
  const { title, children, open, setOpen, onSubmit } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      className="cpnt_dialog_page"
    >
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions className="cpnt_btns">
        <button
          className="bt" type="button"
          onClick={() => {
            setOpen(false);
          }}
        >
          취소
        </button>
        <button
          className="bt sb" type="button"
          onClick={() => {
            setOpen(false);
            onSubmit();
          }}
        >
          등록
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupDialog;
