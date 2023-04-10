import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper'
import withStyles from "@material-ui/core/styles/withStyles";
import './App.css';
import ServerTableList from "./ServerListComp/ServerTableList";
import Menu from "./MenuComp/Menu";
import Dashboard from "./DashboardComp/Dashboard"
import ServerInfo from "./ServerInfoComp/ServerInfo"
import AlertInfo from "./AlertInfo/AlertInfo"
import ChartPage from "./ChartComp/ChartPage";
import {createMuiTheme} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import logo from "./logo.svg"

const refresh = () => {
    setInterval(() => {
        window.location.reload();
    }, 1000 * 60 * 60 * 12);
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: '#f44336',
        },
    },
});

const styles = theme => ({

    root: {
        marginTop: theme.spacing(3),
        overflowX: "auto",
        overflowY: "hidden",
        width: '100vw',
        height: '100vh',

    },
    tableHead: {
        fontSize: '1.0rem'
    },
    progress: {
        margin: theme.spacing(3)
    },
    menu: {},
    buttons: {
        position: 'fixed',
        right: 25,
        bottom: 20,
        zIndex: 3,
    },
    darkpaper: {
        backgroundColor: '#1d1d1d',
        color: 'white',
        height: '100vh',
    },
    paper: {
        height: '100vh',
    }

});


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            servers: '',
            completed: 0,
            errors: 0,
            server_name: '',
            dashboard: true,
            serverInfo: false,
            alertInfo: false,
            setting: false,
            chart: false,
            darkmode: false,
        }
    }

    stateRefresh = () => {
        this.setState({
            servers: '',
            completed: 0,
            server_name: 0,
            errors: 0
        });
        this.callApi()
            .then(res => this.setState({servers: res}))
            .catch(err => console.log(err));
        this.getAlert()
    };

    getAlert = () => {
        this.callAlert()
            .then(res => {
                    this.setState({errors: res})
                }
            )
            .catch(err => console.log(err))

    };


    progress = () => {
        const {completed} = this.state;
        this.setState({completed: completed >= 100 ? 0 : completed + 0.1})
    };



    componentDidMount() {
        // fullscreen();

        refresh();
        setInterval(this.progress, 100);
        setInterval(this.getAlert, 2000);
        this.callApi()
            .then(res => this.setState({servers: res}))
            .catch(err => console.log(err));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.darkmode !== this.state.darkmode) {
            console.log("app.js : " + this.state.darkmode)
        }
    }

    handleValueChange = (e) => {
        this.setState({
            server_name: e.target.value
        })
    };

    callAlert = async () => {
        const response = await fetch('http://localhost:5000/api/alert/error_count');
        return await response.json()

    };

    callApi = async () => {
        const response = await fetch('http://localhost:5000/api/servers');
        return await response.json()

    };

    clickDashBoard = () => {
        this.setState({
            dashboard: true,
            serverInfo: false,
            alertInfo: false,
            setting: false,
            chart: false
        })
    };

// clickServerInfo = () => {
//     this.setState({
//         dashboard: false,
//         serverInfo: true,
//         alertInfo: false,
//         setting: false,
//     })
//
// };

    clickServerInfo = (value) => {
        this.setState({
            dashboard: false,
            serverInfo: true,
            alertInfo: false,
            setting: false,
            chart: false,
        });
        if (value.toString()[0] !== '[') {

            this.setState({
                value: value
            });

        }
    };

    clickAlertInfo = () => {
        this.setState({
            dashboard: false,
            serverInfo: false,
            alertInfo: true,
            setting: false,
            chart: false,
        })

    };
    clickSetting = () => {
        this.setState({
            dashboard: false,
            serverInfo: false,
            alertInfo: false,
            setting: true,
            chart: false,
        })
    };

    clickChart = () => {
        this.setState({
            dashboard: false,
            serverInfo: false,
            alertInfo: false,
            setting: false,
            chart: true,
        })
    };

    darkMode = () => {
        this.setState({darkmode: !this.state.darkmode});
    };


    render() {
        // const filteredComponents = (data) => {
        //     data = data.filter((c) => {
        //
        //         return c
        //     });
        //     return data.map((c) => {
        //         return <InfoServerList stateRefresh={this.stateRefresh} key={c.id} id={c.id} server_name={c.server_name}
        //                            nickname={c.nickname} os={c.os} model_name={c.model_name} ip={c.ip}/>
        //     });
        // };

        const {classes} = this.props;
        return (
            <div style={this.state.darkmode ? {backgroundColor: '#1d1d1d'} : {}}>
                <img src={logo}/>
                <Menu
                    clickDashBoard={this.clickDashBoard}
                    clickServerInfo={this.clickServerInfo}
                    clickAlertInfo={this.clickAlertInfo}
                    clickSetting={this.clickSetting}
                    clickChart={this.clickChart}
                    callAlert={this.callAlert}
                    dark={this.state.darkmode}
                    darkFunction={this.darkMode}/>
                <main
                    className={classes.content}
                >
                    <div className={classes.drawerHeader}/>
                    <Paper className={this.state.darkmode ? classes.darkpaper : classes.paper}>
                        <div>
                            {this.state.dashboard ?
                                <Dashboard
                                    clickServerInfo={this.clickServerInfo}
                                    getAlert={this.state.errors}
                                    dark={this.state.darkmode}
                                    darkFunction={this.darkMode}/> : null}
                            {this.state.serverInfo ? <ServerInfo value={this.state.value}
                                                                 dark={this.state.darkmode}
                                                                 darkFunction={this.darkMode}/> : null}
                            {this.state.alertInfo ? <AlertInfo
                                dark={this.state.darkmode}
                                darkFunction={this.darkMode}/> : null}
                            {this.state.setting ? <ServerTableList
                                dark={this.state.darkmode}
                                darkFunction={this.darkMode}/> : null}
                            {this.state.chart ? <ChartPage/> : null}

                        </div>


                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(App);
