import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {post} from "axios";

class GroupAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupOpen: false,
            newGroup:'',
            rack:'',
        }
    }

    callRack = async () => {
        const response = await fetch('http://localhost:5000/api/servers/group');
        let body = await response.json();
        return body;
    }

    addGroup = () => {
        const url = 'http://localhost:5000/api/servers/group/add';
        const data = {
            rack : this.state.newGroup
        };
        const config = {
            headers:{
                'content-type' : 'application/json'
            }
        };
        return post(url, data, config)
    }

    rackHandleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(nextState);
        this.props.getRackState(nextState.rack)
    };

    handleGroupFormSubmit = () => {
        console.log("submitted");
        this.addGroup()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();

                this.setState({
                    newrack: '',
                    groupOpen: false,

                });
            })
            .then(() => this.props.stateRefresh())
            .catch(err => console.log(err))
    }

    handleGroupClickOpen = () => {
        this.setState({
            groupOpen: true,
            newrack: '',
        });
    };

    handleGroupClickClose = () => {
        this.setState({
            groupOpen: false,
            newrack: '',

        });
    };

    filtered = (data) => {
        if(data.length !== 0) {
            console.log(data);
            return data.map((c) => {
                return <MenuItem value={c}>{c}</MenuItem>
            })
        } else {
            return null;
        }
    }

    render() {
        const filteredComponents = (data) => {
            let i = 0;
            return data.map((c) => {
                i++;
                return <MenuItem key={i} value={c.rack}>{c.rack}</MenuItem>
                // <ServerList stateRefresh={this.stateRefresh} key={c.id} num={c.id} id={i++}
                //                    server_name={c.server_name}
                //                    nickname={c.nickname} os={c.os} model_name={c.model_name} ip={c.ip}
                //                    iloip={c.ilo_ip} rack={c.rack}
                //                    dark={this.props.dark}/>
            });
        };


        return (
            <div>
                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">RACK</InputLabel>
                    <Select label={'RACK'} name={"rack"} onChange={this.rackHandleValueChange}
                            defaultValue={this.props.rack}
                            style={{width: 200, height: 40, marginTop: 5,}} value={this.props.value}>
                        {/*{filteredComponents(this.state.rack)}*/}
                        <MenuItem value={'REC1'}>
                            <ListItemText primary={'REC1'}/>
                        </MenuItem>
                        <MenuItem value={'REC2'}>
                            <ListItemText primary={'REC2'}/>
                        </MenuItem>
                        <MenuItem value={'VCCS_MMS'}>
                            <ListItemText primary={'VCCS_MMS'}/>
                        </MenuItem>
                        <MenuItem value={'EVCS_MMS'}>
                            <ListItemText primary={'EVCS_MMS'}/>
                        </MenuItem>
                        {/*<MenuItem value={'add'}>*/}
                        {/*    <ListItemIcon>*/}
                        {/*        <AddIcon/>*/}
                        {/*    </ListItemIcon>*/}
                        {/*    <ListItemText primary={"Add Server"}/>*/}
                        {/*</MenuItem>*/}
                        {/*{filteredComponents(Array.from(this.state.rack))}*/}

                    </Select>
                </FormControl>

                <Dialog open={this.state.groupOpen}>
                    <DialogTitle>그룹 추가</DialogTitle>
                    <DialogContent>
                        <TextField label={"그룹이름"} type={"text"} name={"newGroup"} value={this.state.newGroup}
                                   onChange={this.rackHandleValueChange}/> <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"primary"} onClick={this.handleGroupFormSubmit}>추가</Button>
                        <Button variant={"outlined"} color={"primary"} onClick={this.handleGroupClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    componentDidMount() {
        this.callRack()
            .then(res => {console.log(res);
                this.setState({rack:res})})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.rack !== this.state.rack){
            if(this.state.rack === 'add') {
                this.setState({groupOpen: true})
            }
        }

    }
}

export default GroupAdd