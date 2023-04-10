import React from "react";
import PieChart from "./Pie/PieChart";
import StickChart from "./Stick/StickChart";
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
    chart:{
        display:'flex',
        flexOrientation:'horizontal',
        marginTop:100,
    },
    pie:{
    },
    stick:{
    },
}

class ChartPage extends React.Component{

    render() {
        const {classes} = this.props;
        return(
            <div className={classes.chart}>
                해당 페이지는 수정중입니다.<br/>
                <StickChart className={classes.stick}/>
                <PieChart className={classes.pie}/>
            </div>
        )
    }
}

export default withStyles(style)(ChartPage);