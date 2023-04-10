import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import SettingsIcon from '@material-ui/icons/Settings';
import InsertChartOutlinedTwoToneIcon from '@material-ui/icons/InsertChartOutlinedTwoTone';
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    list:{
        padding: theme.spacing(3),
    }
});

const dark = {
    color:'#ffffff'
}

class MenuList extends React.Component {

    render(){
        const {classes} = this.props;
        return(
        <List>
            <Divider/>
            <ListItem className={classes.list} style={this.props.dark ? dark : null} button key={'1'} onClick={this.props.clickDashBoard}>
                <ListItemIcon><DashboardIcon style={this.props.dark ? {color:"white"} : null}/></ListItemIcon>
                <ListItemText primary={'대쉬보드'}/>
            </ListItem>
            <Divider/>
            <ListItem className={classes.list} style={this.props.dark ? dark : null} button key={'2'} onClick={this.props.clickServerInfo}>
                <ListItemIcon><InboxIcon style={this.props.dark ? {color:"white"} : null}/></ListItemIcon>
                <ListItemText primary={'서버정보'}/>
            </ListItem>
            <Divider/>
            <ListItem className={classes.list} style={this.props.dark ? dark : null} button key={'3'} onClick={this.props.clickAlertInfo}>
                <ListItemIcon><NotificationImportantIcon style={this.props.dark ? {color:"white"} : null}/></ListItemIcon>
                <ListItemText primary={'장애정보'}/>
            </ListItem>
            <Divider/>
            <ListItem className={classes.list} style={this.props.dark ? dark : null} button key={'4'} onClick={this.props.clickSetting}>
                <ListItemIcon><SettingsIcon style={this.props.dark ? {color:"white"} : null}/></ListItemIcon>
                <ListItemText primary={'서버설정'}/>
            </ListItem>
            <Divider/>
            {/*<ListItem className={classes.list} style={this.props.dark ? dark : null} button key={'5'} onClick={this.props.clickChart}>*/}
            {/*<ListItemIcon><InsertChartOutlinedTwoToneIcon style={this.props.dark ? {color:"white"} : null}/></ListItemIcon>*/}
            {/*    <ListItemText primary={"장애통계"}/>*/}
            {/*</ListItem>*/}
            {/*<Divider/>*/}
        </List>

        )
    }
}
export default withStyles(styles)(MenuList);