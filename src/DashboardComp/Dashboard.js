import React from "react";
import AlertLog from "./Tables/AlertLog";
import withStyles from "@material-ui/core/styles/withStyles";
import StatusBar from "./Bar/StatusBar";
import NodeChart from "./Node/NodeChart";
import Divider from "@material-ui/core/Divider";


const styles = theme => ({

    dashboard: {
        display: 'flex',
        marginTop: 100,
        flexWrap: 'wrap'
    },
    leftFlex: {
        display: 'flex',
        flexDirection: 'column'
    },
    rightFlex: {
        display: 'flex',
        flexDirection: 'column'
    },
    divider:{
        marginTop: 10,
        marginLeft:10,
        marginRight:30,
        backgroundColor:'#AAAAAA'

    }

});

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            normal: true,
            errors: 0
        }
    }

    clicked = () => {
        this.setState({
                normal: !this.state.normal,
                safe: Math.floor(Math.random() * 6),
                unsafe: Math.floor(Math.random() * 6)
            }
        )
    };

    getAlert = () => {
        this.props.getAlert()
    };

    render() {


        const {classes} = this.props;
        return (

            <div className={classes.dashboard}>
                <div className={classes.leftFlex}>
                    <StatusBar dark={this.props.dark}/>
                    <AlertLog
                        clickServerInfo={this.props.clickServerInfo}
                              getAlert={this.props.getAlert}
                              dark={this.props.dark}
                              darkFunction={this.darkMode}/>
                </div>
                <Divider orientation={"vertical"} flexItem className={classes.divider}/>
                <div className={classes.rightFlex}>
                    {/*<StickChart/>*/}
                    {/*<PieChart/>*/}
                    <NodeChart  clickServerInfo={this.props.clickServerInfo}/>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(Dashboard);