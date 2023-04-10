import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import withStyles from "@material-ui/core/styles/withStyles";
import AlertList from "./AlertList";
import TableContainer from "@material-ui/core/TableContainer";

const styles = theme => ({

    alertLog: {
        marginTop: 40
    },
    tableContainer: {
        width: 800,
        height: 500,
        overflowY: "auto",
        margin: '20px 20px 40px 100px'
    },

    tables: {
        textAlign: 'left',
        position: 'relative',
    },
    tableHead: {
        backgroundColor: '#111111',
        color: 'white'
    },

});

const tableHead = {
    backgroundColor: '#2d2d2d',
    color: 'white'
}

let errors = 0;

class AlertLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: errors,
            alerts: false,
            alert_name: '',
        }
    }

    alertRefresh = () => {
        this.callApi()
            .then(res => {
                this.setState({alert_name: res});
                errors = res.length;
                // console.log(errors)
            })

            .catch(err => console.log(err));
    };

    alertStateSet = () => {
        this.callApi()
            .then(res => {
                this.setState({alert_name: res});
                errors = res.length;
                // console.log(errors)
            })

            .catch(err => console.log(err));
    }
    alertStateZero = () => {
        this.setState({
            error: 0,
            alerts: false,
            alert_name: '',
        });
    }

    stateRefresh = () => {
        this.alertStateZero();
        this.alertStateSet();
    };


    callApi = async () => {
        const response = await fetch('http://localhost:5000/api/alert');
        const body = await response.json();
        body.length >= 1 && this.state.mount ? this.setState({alerts: true}) : this.setState({alerts: false});
        // console.log("api called");
        return body
    };

    componentDidMount() {
        this.setState({mount:true});
        this.stateRefresh();
        // setInterval(this.props.getAlert, 1000)

        setInterval(this.alertStateSet, 1000);
    }

    componentWillUnmount() {
        this.setState({mount:false});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.alert_name.length !== this.state.alert_name.length) {
            if (this.state.alert_name.length === 0) {
                this.setState({
                    error: 0,
                    alerts: false,
                    alert_name: '',
                })
                // console.log(this.state.alert_name);
                this.stateRefresh()
            } else {
                console.log('updated');
                // console.log(this.state.alert_name);
                this.alertRefresh();
            }

        }
        if (prevProps.dark !== this.props.dark) {
            console.log(this.props.dark)
        }

    }


    render() {


        const {classes} = this.props;
        let i = 1;
        const filteredComponents = (d) => {
            return d.map((c) => {
                return <AlertList stateRefresh={this.stateRefresh} key={i}
                                  num={c.num}
                                  id={i++}
                                  error={c.error}
                                  name={c.name}
                                  ip={c.ip}
                                  date_created={c.date_created}
                                  isfigured={c.isfigured}
                                  clickServerInfo={this.props.clickServerInfo}
                                  dark={this.props.dark}/>
            });
        };


        return (
            <div className={classes.alertLog}>
                <TableContainer className={classes.tableContainer}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={this.props.dark ? tableHead : null}>번호</TableCell>
                                <TableCell style={this.props.dark ? tableHead : null}>서버명</TableCell>
                                <TableCell style={this.props.dark ? tableHead : null}>에러정보</TableCell>
                                <TableCell style={this.props.dark ? tableHead : null}>날짜</TableCell>
                                <TableCell style={this.props.dark ? tableHead : null}>세부정보</TableCell>
                                <TableCell style={this.props.dark ? tableHead : null}>삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.alerts ?

                                    filteredComponents(Array.from(this.state.alert_name))

                                    :
                                    <TableRow>
                                        <TableCell colSpan={6} height={435} align={"center"}
                                                   style={this.props.dark ? {
                                                       color: 'white'
                                                   } : null}>
                                            최근 발생한 장애가 없습니다.
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


export default withStyles(styles)(AlertLog)

