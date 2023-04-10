import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import ServerList from "./ServerList";
import withStyles from "@material-ui/core/styles/withStyles";
import ServerAdd from "./ServerAdd";
import TableContainer from "@material-ui/core/TableContainer";

const dark = {
    backgroundColor: '#2d2d2d',
    color: 'white'
}

const styles = theme => ({
    container:{
        marginTop: 100,
        height:900,
        overflowY:'scroll'
    },

    tables: {
        width: 1820,
        marginLeft:50,

    },
    button: {
        position: 'fixed',
        right: 25,
        bottom: 20,
        zIndex: 3,
    },

});


class ServerTableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            servers: '',
            completed: 0,
            server_name: '',
        }
    }

    stateRefresh = () => {
        this.setState({
            servers: '',
            completed: 0,
            server_name: 0
        });
        this.callApi()
            .then(res => this.setState({servers: res}))
            .catch(err => console.log(err));
    };

    progress = () => {
        const {completed} = this.state;
        this.setState({completed: completed >= 100 ? 0 : completed + 0.1})
    };

    callApi = async () => {
        const response = await fetch('http://localhost:5000/api/servers');
        return await response.json()
    };

    componentDidMount() {
        this.setState({display: true});
        setInterval(this.progress, 100);
        this.callApi()
            .then(res => this.setState({servers: res}))
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        this.setState({display: false})
    }

    render() {

        const {classes} = this.props;

        const filteredComponents = (data) => {
            data = data.filter((c) => {
                return c
            });
            let i = 1;

            return data.map((c) => {
                return <ServerList stateRefresh={this.stateRefresh} key={c.id} num={c.id} id={i++}
                                   server_name={c.server_name}
                                   nickname={c.nickname} os={c.os} model_name={c.model_name} ip={c.ip}
                                   iloip={c.ilo_ip} rack={c.rack}
                                   dark={this.props.dark}/>
            });
        };
        return (
            <div className={classes.tableroot}>
                <div className={classes.button}>
                    <ServerAdd stateRefresh={this.stateRefresh}/>
                </div>
                <TableContainer className={classes.container}>
                <Table stickyHeader aria-label={"sticky table"} className={classes.tables} >
                    <TableHead>
                        <TableRow>
                            <TableCell style={this.props.dark ? dark : null}>번호</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>서버명</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>별명</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>OS</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>모델</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>IP</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>ILO IP</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>그룹</TableCell>
                            <TableCell style={this.props.dark ? dark : null}/>
                            <TableCell style={this.props.dark ? dark : null}/>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{overflowY:"scroll"}}>
                        {
                            this.state.servers ?
                                filteredComponents(Array.from(this.state.servers)) :
                                <TableRow>
                                    <TableCell colSpan={8} align={"center"}>
                                        <LinearProgress className={classes.progress} variant={"determinate"}
                                                        value={this.state.completed}/>
                                    </TableCell>
                                </TableRow>
                        }
                        <TableRow>
                        </TableRow>

                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        )
    }
}


export default withStyles(styles)(ServerTableList)