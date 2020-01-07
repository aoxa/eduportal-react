import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';


export default function ConfirmDialog(props) {
	return(
	<Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.handleClose && <Button onClick={props.handleClose} color="secondary">
            Cancelar
          </Button> }
          {props.handleAgree &&
          <Button onClick={props.handleAgree} color="primary" autoFocus>
            Aceptar
          </Button> }
        </DialogActions>
      </Dialog>
	);
}

ConfirmDialog.defaultProps = {
	open: false,
	title: "Dialog Title",
	text: "Dialog Text"
};