import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"

const ConfirmationDialog = (props)=>{
    const {open,onClose,onConfirm,title,description} =props;
    return(
        <Dialog
            open={open}
            onClose={()=>onClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                    type="button"
                    onClick={()=>onClose()}
                    variant="contained"
                    color="primary">Cancle</Button>
                    <Button
                    onClick={()=>{
                        onConfirm();
                    }}
                    autoFocus
                    variant="contained"
                    color="primary">Ok</Button>
                </DialogActions>
            </Dialog>
    )
}

export default ConfirmationDialog;