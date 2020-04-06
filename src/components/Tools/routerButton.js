import React from 'react'
import AppButton from '../AppBar/app-button'

// <RouterButton mainApp={} txt={} page={} />

export default class RouterButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            btnText: this.props.txt,
            pageToRoute: this.props.page
        }
    }

    routePage = (page) => {
        this.props.mainApp.routePage(page)
    }

    render() {

        const state = this.state

        return(
            <AppButton onClick={() => this.routePage(state.pageToRoute)}> {state.btnText} </AppButton>
        )
    }
}
