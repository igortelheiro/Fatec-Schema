import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import { Container } from './styles';

export default class ConfDialog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openDialog: true,
            dialog: props
        }
    }

    handleClose = () => {
        this.setState({ openDialog: false })
        this.props.handleClose()
    }

    handleChoice = (bool) => {
      this.props.setChoice(bool)
      this.props.handleClose()
      this.handleClose()
    }

  render() {
    const dialog = this.state.dialog

    const title_css = {
      fontSize: '10px',
      margin: 5,
      padding: 5,
      textAlign: "center"
    }

    return (
        <>
          <Dialog
            open={this.state.openDialog}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
              <DialogTitle style={title_css} id="alert-dialog-title">{dialog.title}</DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-description">{dialog.msg}</DialogContentText>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={() => this.handleChoice(true)} color="primary"> SIM </Button>
                <Button onClick={() => this.handleChoice(false)} color="primary" autoFocus> NÃO </Button>
              </DialogActions>
          </Dialog>
        </>
    )
  }
}
