import React from 'react';
import {post} from 'axios'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import GroupAdd from "./GroupAdd"

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class ServerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            server_name: this.props.server_name,
            nickname: this.props.nickname,
            os: this.props.os,
            model_name: this.props.model_name,
            ip: this.props.ip,
            iloip: this.props.iloip,
            open: false,
            rack: this.props.rack
        }
    }

    getRackState = (data) => {
        this.setState({rack:data})
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.editServer(this.props.num)
            .then(() => {
                this.props.stateRefresh();

                this.setState({
                    server_name: '',
                    nickname: '',
                    os: '',
                    model_name: '',
                    ip: '',
                    iloip: '',
                    open: false
                });
            });
    };

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClickClose = () => {
        this.setState({
            open: false

        });
    };

    handleValueChange = (e) => {
        let nextState = {};
        console.log(e.target.value)
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };

    rackHandleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(nextState);

    };

    editServer = (id) => {
        const url = 'http://localhost:5000/api/servers/' + id;
        const data = {
            server_name: this.state.server_name,
            nickname: this.state.nickname,
            os: this.state.os,
            ip: this.state.ip,
            iloip: this.state.iloip,
            model_name: this.state.model_name,
            rack: this.state.rack,
            id: this.props.num
        }
        const config = {
            headers: {
                'content-type': 'application/json' // 파일 전송시의 규약
            }
        };
        return post(url, data, config);
    };

    render() {
        // const {classes} = this.props;
        return (
            <div>
                <Button variant={"contained"} color={"primary"} onClick={this.handleClickOpen}>수정</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>서버 수정</DialogTitle>
                    <DialogContent>
                        <TextField label={"서버명"} type={"text"} name={"server_name"}
                                   defaultValue={this.state.server_name}
                                   onChange={this.handleValueChange}/> <br/>
                        <TextField label={"닉네임"} type={"text"} name={"nickname"} defaultValue={this.state.nickname}
                                   onChange={this.handleValueChange}/><br/>
                        {/*<TextField label={"OS"} type={"text"} name={"os"} defaultValue={this.props.os}*/}
                        {/*           onChange={this.handleValueChange}/><br/>*/}
                        <Select label={'OS'} onChange={this.handleValueChange} name={"os"} defaultValue={this.state.os}
                                style={{width: 200, marginTop: 5, marginBottom: 5,}}>
                            <MenuItem value={'Windows'}>Windows</MenuItem>
                            <MenuItem value={'Linux'}>Linux</MenuItem>
                        </Select><br/>
                        <TextField label={"모델명"} type={"text"} name={"model_name"} defaultValue={this.state.model_name}
                                   onChange={this.handleValueChange}/><br/>
                        <TextField label={"IP"} type={"text"} name={"ip"} defaultValue={this.state.ip}
                                   onChange={this.handleValueChange}/><br/>
                        <TextField label={"ILO IP"} type={"text"} name={"iloip"} defaultValue={this.state.iloip}
                                   onChange={this.handleValueChange}/><br/>

                        <GroupAdd onChange={this.rackHandleValueChange} rack={this.props.rack} value={this.state.newrack} getRackState={this.getRackState}/>

                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"primary"} onClick={this.handleFormSubmit}>수정</Button>
                        <Button variant={"outlined"} color={"primary"} onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>

            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>서버 추가</h1>
                서버명: <input type={"text"} name={"server_name"} value={this.state.server_name} onChange={this.handleValueChange}/>
                닉네임: <input type={"text"} name={"nickname"} value={this.state.nickname} onChange={this.handleValueChange}/>
                OS: <input type={"text"} name={"os"} value={this.state.os} onChange={this.handleValueChange}/>
                모델명: <input type={"text"} name={"model_name"} value={this.state.model_name} onChange={this.handleValueChange}/>
                IP: <input type={"text"} name={"ip"} value={this.state.ip} onChange={this.handleValueChange}/>
            <button type={"submit"}>추가하기</button>

            </form>*/
        )
    }
}

export default withStyles(styles)(ServerEdit);