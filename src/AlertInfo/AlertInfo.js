import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AlertServerTableList from "./LogTable/AlertServerTableList";

const styles = theme => ({


});

class AlertInfo extends React.Component{
    render() {
        const {classes} = this.props;
        return (
            <div>
                <AlertServerTableList dark={this.props.dark}/>
            </div>
        );
    }
}

export default withStyles(styles)(AlertInfo)