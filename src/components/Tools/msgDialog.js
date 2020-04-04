import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import { DialogContentText } from '@material-ui/core'

export default class MsgDialog extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
            openDialog: true,
            dialog: this.props
        }
        this.closeDialog = this.closeDialog.bind(this)
    }

    closeDialog = () => {
        this.setState({ openDialog: false })
        this.props.handleClose()
    }

    render() {

        const { openDialog, dialog } = this.state

        return (
            <Dialog onClose={() => this.closeDialog()} aria-labelledby="title" open={openDialog}>
                <DialogTitle  id='title' onClose={() => !this.closeDialog()}>
                    { dialog.title }
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom component='span'>
                        <DialogContentText>
                            { dialog.message }
                        </DialogContentText>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => this.closeDialog()} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}