import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import AlertServerList from "./AlertServerList";
import withStyles from "@material-ui/core/styles/withStyles";
import StartDateComponent from "../Date/DateComponent";
import EndDateComponent from "../Date/DateComponent";
import {dateNow} from "igniteui-react-core";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination"
import AbortController from "abort-controller"
import AlertServerPagination from "./AlertServerPagination";

const dark = {
    backgroundColor: '#2d2d2d',
    color: 'white'
};
const styles = theme => ({
    alertInfoContainer: {
        width: 1820,
        marginLeft: 50,
        overflowY: 'hidden',
    },
    date: {
        width: 1500,
        marginLeft: 50,
        marginTop: 100,
        display: 'flex',
        justifyContent: 'space-between',
    },
    root: {
        height: 400,
        overflow: 'hidden'
    },
    tableContainer: {
        height: 800,
        overflowY: 'scroll',
    }

});

const now = dateNow();
const gyear = now.getFullYear();
const gmonth = now.getMonth() >= 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
const gday = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate();

class AlertServerTableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            servers: '',
            completed: 0,
            server_name: '',
            startDate: gyear + '' + gmonth + '' + gday,
            endDate: gyear + '' + gmonth + '' + gday,
            type: 'all',
            take: 0,
            page: 10,
        }
    }

    stateRefresh = () => {
        this.setState({
            servers: '',
            completed: 0,
            server_name: 0,
            type: 'all',
            take: 0,
            page: 10,
            default:true
        });

        this.callApi('all', 0, 10)
            .then(res => this.setState({servers: res, default:false}))
            .catch(err => console.log(err));
    };

    progress = () => {
        const {completed} = this.state;
        this.setState({completed: completed >= 100 ? 0 : completed + 0.1})
    };

    reqCount = async (type) => {
        if(type === undefined) {
            type = 'all'
        }
        const response = await fetch('http://localhost:5000/api/alert/count/'+ type);
        return await response.json()
    };

    callApi = async (type, take, page) => {
        const response = await fetch('http://localhost:5000/api/alert/' + type + '/' + take + '/' + page);
        // this.setState({count:response.json().length});

        return await response.json()
    };

    callDateApi = async (start, end) => {
        const response = await fetch('http://localhost:5000/api/alert/date/' + start + '/' + end);
        return await response.json()
    };
    /* 날짜 수정 */

    onUpdate = () => {
        this.callDateApi(this.state.startDate, this.state.endDate)
            .then(res => this.setState({servers: res}))
            .catch(err => console.error(err))

    }

    getStartDate = async (a) => {
        let beginDate = await a;
        const year = beginDate.getFullYear();
        const month = beginDate.getMonth() >= 9 ? (beginDate.getMonth() + 1) : '0' + (beginDate.getMonth() + 1);
        const day = beginDate.getDate() >= 10 ? beginDate.getDate() : '0' + beginDate.getDate();
        this.setState({startDate: year + '' + month + '' + day});
        console.log("get start date " + this.state.startDate);

    };

    getEndDate = async (a) => {
        let endDate = await a;
        const year = endDate.getFullYear();
        const month = endDate.getMonth() >= 9 ? (endDate.getMonth() + 1) : '0' + (endDate.getMonth() + 1);
        const day = endDate.getDate() >= 10 ? endDate.getDate() : '0' + endDate.getDate();
        this.setState({endDate: year + '' + month + '' + day});
        console.log("get end date " + this.state.endDate);

    };

    componentDidMount() {
        this.setState({display: true});
        setInterval(this.progress, 100);
        this.reqCount()
            .then((res) => {
                this.setState({count:res[0].count})})
        this.callApi('all', 0, 10)

            .then(res => this.setState({servers: res}))
            .catch(err => console.log(err));

    }

    componentWillUnmount() {
        this.setState({display: false})
    }

    parentCallback = async (take, page) => {
        this.setState({
            take: take,
            page: page,
        })


        this.callApi(this.state.type, take, page)
            .then(res => this.setState({servers:res}))
            // .then(() => console.log(this.state.take))
    }


    render() {
        const {classes} = this.props;

        const
            filteredComponents = (data) => {
                let i = 1;
                data = data.filter((c) => {

                    return c
                });
                return data.map((c) => {

                    return <AlertServerList stateRefresh={this.stateRefresh} key={i++} num={i + ((this.state.take / this.state.page) * this.state.page) -1}
                                            name={c.name} error={c.error} ip={c.ip} iloip={c.iloip}
                                            date_created={c.date_created} isfigured={c.isfigured}
                                            date_figured={c.date_figured} visible={c.visible} dark={this.props.dark}/>
                });
            };
        return (
            <div className={classes.alertInfoContainer}>
                <div className={classes.date}>
                    <p>날짜 검색, 키워드 검색 기능은 프로그램 미비로 인해 해당 위치에 추후 지원 예정</p>
                    {/*시작날짜 : <StartDateComponent getter={this.getStartDate} style={{marginRight: 50,}}/>*/}
                    {/*종료날짜 : <EndDateComponent getter={this.getEndDate} style={{marginRight: 50}}/>*/}
                    {/*서버명:*/}
                    {/* <Input id={"server_name"} label={"서버명"} variant={"contained"}*/}
                    {/*           color={"secondary"}  autoComplete={"off"}*/}
                    {/*       style={ this.props.dark ? {marginRight:50, backgroundColor:'#ffffff', borderRadius: '5px 5px 5px 5px'}*/}
                    {/*       : {marginRight:50 ,backgroundColor:'#ffffff', borderRadius: '5px 5px 5px 5px'}}/>*/}
                    {/*<Button variant={"contained"} color={"primary"} onClick={this.onUpdate}*/}
                    {/*        style={{marginRight: 20, top: -10}}>검색</Button>*/}
                    {/*<Button variant={"contained"} color={"secondary"} onClick={this.stateRefresh}*/}
                    {/*        style={{marginRight: 20, top: -10}}>초기화</Button>*/}
                    <AlertServerPagination rpp={this.state.page} page={this.state.take} count={this.state.count}
                                           callback={this.parentCallback} default={this.state.default}/>

                </div>

                <div className={classes.tableContainer}>
                    <Table className={classes.tables} style={{height: 600, overflowY: "hidden"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={this.props.dark ? dark : null}>번호</TableCell>
                                <TableCell style={this.props.dark ? dark : null}>서버명</TableCell>
                                <TableCell style={this.props.dark ? dark : null}>에러명</TableCell>
                                <TableCell style={this.props.dark ? dark : null}>IP</TableCell>
                                <TableCell style={this.props.dark ? dark : null}>ILO IP</TableCell>
                                <TableCell style={this.props.dark ? dark : null}>발생시간</TableCell>
                                <TableCell style={this.props.dark ? dark : null}>복구시간</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tbody} style={{height: 600, overflowY: "hidden"}}>
                            {
                                this.state.servers ?
                                    filteredComponents(this.state.servers) :
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

                </div>

                {/*<TablePagination*/}
                {/*    component={"div"}*/}
                {/*    page={this.state.take}*/}
                {/*    count={this.state.count}*/}
                {/*    onChangePage={(e) => {*/}
                {/*        this.handleChangePage(e, this.state.page)*/}
                {/*    }}*/}
                {/*    rowsPerPage={this.state.page}*/}
                {/*    onChangeRowsPerPage={(e) => this.onChangeRowsPerPage(e)}*/}
                {/*>*/}

                {/*</TablePagination>*/}
            </div>
        )
    }
}


export default withStyles(styles)(AlertServerTableList)