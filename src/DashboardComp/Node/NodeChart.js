import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({

    container: {
        width: 850
    },
    table: {
        height: 900
    },
    items: {
        height: 85,
    },
    divider: {
        margin: '10px 0 10px 0',
    },
    row: {
        height: 85,
    }
});

const normal = {
    width: 200,
    borderRadius: '15px 15px 15px 15px',
    backgroundColor: 'rgba(55,70,171,0.75)',
    margin: '7px 0 7px 0',
    color: 'white',
    fontSize: '18px',
    paddingTop: 5,
}

const abnormal = {
    width: 200,
    borderRadius: '15px 15px 15px 15px',
    backgroundColor: 'rgba(211,37,0,0.75)',
    margin: '7px 0 7px 0',
    paddingTop: 5,
    color: 'white',
    fontSize: '18px',
}

class NodeChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            group: [],
            nick: '',
            rack1: '',
            rack2: '',
            rack3: '',
            rack4: '',
            nick1: '',
            nick2: '',
            nick3: '',
            nick4: '',


        }
    }


    callGroupApi = async () => {
        const response = await fetch('http://localhost:5000/api/servers/group/');
        return await response.json()
    };

    settingApi = () => {
        this.callGroupApi()
            // .then(res => {this.setState({group:res}); console.log(this.state.group)})
            .then(res => {

                // this.setState({group:[res.rack]});
                this.setState({rack: res});

                this.setState({
                    group: Object.keys(res.rack),
                    error: res.alert,
                    nick: res.nick,
                });
                if (this.state.rack.rack.VCCS_MMS !== undefined)
                    this.setState({rack1: this.state.rack.rack.VCCS_MMS});
                if (this.state.rack.rack.EVCS_MMS !== undefined)
                    this.setState({rack2: this.state.rack.rack.EVCS_MMS});
                if (this.state.rack.rack.REC1 !== undefined)
                    this.setState({rack3: this.state.rack.rack.REC1});
                if (this.state.rack.rack.REC2 !== undefined)
                    this.setState({rack4: this.state.rack.rack.REC2});
                if (this.state.nick1 !== undefined)
                    this.setState({nick1: this.state.nick.VCCS_MMS});
                if (this.state.nick2 !== undefined)
                    this.setState({nick2: this.state.nick.EVCS_MMS});
                if (this.state.nick3 !== undefined)
                    this.setState({nick3: this.state.nick.REC1});
                if (this.state.nick4 !== undefined)
                    this.setState({nick4: this.state.nick.REC2});

            })
            .catch(err => console.log(err))
    };

    componentDidMount() {
        this.settingApi();
        setInterval(this.settingApi, 2000)

    }

    movePage = (page) => {
        console.log(page);
        this.props.clickServerInfo(page)
    };

    // makeBr = (nickname, address,c) => {
    //     let index = address.indexOf(c);
    // console.log(nickname);
    // if (String(nickname[index]).indexOf('/') !== -1) {
    //     address = nickname[index].replace('/', <br/>);
    // return address
    // }
    // }

    render() {
        const
            filteredComponents = (data) => {

                return data.map((c) => {
                    return <TableCell className={classes.row} align={"center"} key={c}
                                      style={{fontSize: 24}}>{c}</TableCell>
                })

            };

        const filteredRow = (nickname, address) => {
            if (address !== null || address !== '' || address !== undefined) {
                return address.map((c) => {
                    // let num = this.state.alert.indexOf(c);
                    return <div key={c}>
                        <div style={this.state.error[c] === 0 ? normal : abnormal}>
                            <ListItem className={classes.items} button key={c} onClick={(e) => {
                                this.movePage(c)
                            }}>
                                {this.state.error[c] === 0
                                    ?
                                    <div>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon style={{color: 'white'}} fontSize={'large'}/>
                                        </ListItemIcon>
                                    </div>
                                    : <ListItemIcon>
                                        <ErrorOutlineIcon style={{color: 'white'}} fontSize={'large'}/>
                                    </ListItemIcon>
                                }

                                {String(nickname[address.indexOf(c)]).indexOf('/') === -1 ?
                                    <span
                                        style={{paddingBottom: 6}}>{nickname[address.indexOf(c)]}
                                        </span>
                                    :
                                    <div>
                                        <span style={{paddingBottom: 6}}>
                                        {String(nickname[address.indexOf(c)]).split('/')[0]}
                                    </span>
                                <br/>
                                <span style={{paddingBottom: 6}}>
                                        {String(nickname[address.indexOf(c)]).split('/')[1]}
                                    </span>
                                    </div>
                                }

                            </ListItem>
                        </div>
                        <Divider className={classes.divider} light={true} style={{backgroundColor: '#aaaaaa'}}/>
                    </div>

                })
            } else {
                return '&nbsp;';
            }
        };
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <Table title={"Rack"} className={classes.table}>
                    <tbody style={{verticalAlign: "top"}}>
                    <TableRow>

                        {filteredComponents(this.state.group)}

                    </TableRow>
                    <TableRow style={{verticalAlign: "top"}}>
                        <TableCell>
                            <List>
                                <Divider light={true} style={{backgroundColor: '#aaaaaa'}}/>
                                {filteredRow(Array.from(this.state.nick1), Array.from(this.state.rack1))}
                            </List>
                        </TableCell>
                        <TableCell>
                            <List>
                                <Divider light={true} style={{backgroundColor: '#aaaaaa'}}/>
                                {filteredRow(Array.from(this.state.nick2), Array.from(this.state.rack2))}
                            </List>
                        </TableCell>
                        <TableCell>
                            <List>
                                <Divider light={true} style={{backgroundColor: '#aaaaaa'}}/>
                                {filteredRow(Array.from(this.state.nick3), Array.from(this.state.rack3))}
                            </List>
                        </TableCell>
                        <TableCell>
                            <List>
                                <Divider light={true} style={{backgroundColor: '#aaaaaa'}}/>
                                {filteredRow(Array.from(this.state.nick4), Array.from(this.state.rack4))}
                            </List>
                        </TableCell>
                    </TableRow>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default withStyles(styles)(NodeChart)