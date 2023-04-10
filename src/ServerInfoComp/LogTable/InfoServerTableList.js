import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import InfoServerList from "./InfoServerList";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({

    tables: {
        height: 350,
        overflowY: "auto",
        marginTop: 0
    },
    description:{
        fontSize:'16px',
        textAlign:'center',
    }

});

const dark = {
    backgroundColor: '#2d2d2d',
    color: 'white'
}


class InfoServerTableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: '',
            completed: 0,
            server_name: '',
            name: this.props.name,
            changed: false,
            display: false,
        }
    }


    componentWillUnmount() {
        this.setState({display: false})
    }

    stateRefresh = () => {
        this.setState({
            servers: '',
            completed: 0,
            server_name: 0,
        });
        this.callApi()
            .then(res => this.setState({server_name: res}))
            .catch(err => console.log(err));
    };

    progress = () => {
        const {completed} = this.state;
        this.setState({completed: completed >= 100 ? 0 : completed + 6})
    };

    callApi = async () => {
        if (this.state.display && this.state.name !== '') {
            const response = await fetch('http://localhost:5000/api/alert/list/' + this.state.name);
            return await response.json()
        } else if (this.state.name === null || this.state.name === '') {
            return 0
        }
    };

    componentDidMount() {
        this.setState({display: true});
        setInterval(() => {
            if (this.state.name !== this.props.name) {
                this.setState({name: this.props.name});
                this.stateRefresh()

            }
        }, 500);
        setInterval(this.progress, 200);
        this.callApi()
            .then(res => this.setState({server_name: res}))
            .catch(err => console.log(err));
    }


    render() {
        const {classes} = this.props;

        const
            filteredComponents = (data) => {
                // data = data.filter((c) => {
                // if (c.server_name === this.props.ip) {
                //     console.log(c);
                //     return c
                // }
                //
                // });
                let i = 1;
                return data.map((c) => {
                    return <InfoServerList stateRefresh={this.stateRefresh} key={c.num} num={i++}
                                           id={c.num}
                                           server_name={c.name}
                                           ip={c.ip}
                                           error={c.error}
                                           date_created={c.date_created}
                                           date_figured={c.date_figured}
                                           visible={c.visible}
                                           dark={this.props.dark}/>

                });
            };
        return (
            <div className={classes.tables}>
                <div className={classes.description}>해당 페이지에서는 최근 50건까지만 조회 가능합니다.</div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={this.props.dark ? dark : null}>번호</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>서버명</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>IP</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>장애명</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>발생시간</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>복구시간</TableCell>
                            <TableCell style={this.props.dark ? dark : null}>확인</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (this.state.server_name) ?
                                filteredComponents(this.state.server_name) :
                                <TableRow>
                                    <TableCell colSpan={8} align={"center"}>

                                        {/*
                                        <LinearProgress className={classes.progress} variant={"determinate"}
                                                        value={this.state.completed}/>
                                                        */}
                                    </TableCell>
                                </TableRow>
                        }
                        {
                            this.state.server_name.length < 1  ?
                                <TableRow>
                                    <TableCell style={this.props.dark ? dark : null} colSpan={8} align={"center"}>No
                                        result to show. Pick other server on top of page.</TableCell>
                                </TableRow> :
                                null
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}


export default withStyles(styles)(InfoServerTableList)