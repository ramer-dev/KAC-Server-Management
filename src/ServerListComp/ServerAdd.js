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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import GroupAdd from './GroupAdd'

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class ServerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            server_name: '',
            nickname: '',
            os: '',
            model_name: '',
            ip: '',
            iloip: '',
            rack: '',
            ipvalue: false,
            ilovalue: false,
            open: false,
            groupOpen: false,
            newGroup: ''
        }
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        if (!(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/).test(this.state.ip)) {
            if (!(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/).test(this.state.iloip)) {
                this.setState({ilovalue: true});
                return;
            }
            this.setState({ipvalue: true});
            return;
        }
        this.addServer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();

                this.setState({
                    server_name: '',
                    nickname: '',
                    os: '',
                    model_name: '',
                    ip: '',
                    iloip: '',
                    rack: '',
                    open: false

                });
            })
            .then(() => this.props.stateRefresh())
            .catch(err => console.log(err))
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


    // handleFileChange = (e) => {
    //     this.setState({
    //         file: e.target.files[0],
    //         fileName: e.target.value
    //     })
    // };

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        // console.log(e.target.value);

    };
    getRackState = (data) => {
        this.setState({rack:data})
    }

    addServer = () => {
        const url = 'http://localhost:5000/api/servers';
        const data = {
            server_name: this.state.server_name,
            nickname: this.state.nickname,
            os: this.state.os,
            ip: this.state.ip,
            iloip: this.state.iloip,
            model_name: this.state.model_name,
            rack: this.state.rack
        };
        const config = {
            headers: {
                'content-type': 'application/json' // 파일 전송시의 규약
            }
        };
        return post(url, data, config);
    };


    render() {

        return (
            <div>
                <Button variant={"contained"} color={"primary"} onClick={this.handleClickOpen}>서버 추가</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>서버 추가</DialogTitle>
                    <DialogContent>
                        <TextField label={"서버명"} type={"text"} name={"server_name"} value={this.state.server_name}
                                   onChange={this.handleValueChange}/> <br/>
                        <TextField label={"닉네임"} type={"text"} name={"nickname"} value={this.state.nickname}
                                   onChange={this.handleValueChange}/><br/>
                        {/*<TextField label={"OS"} type={"text"} name={"os"} value={this.state.os}*/}
                        {/*           onChange={this.handleValueChange}/><br/>*/}
                        <FormControl>
                            <InputLabel id="demo-simple-select-helper-label">OS</InputLabel>
                            <Select label={'OS'} onChange={this.handleValueChange} name={"os"}
                                    style={{width: 200, height: 40, marginTop: 5,}} defaultValue={'Windows'}>
                                <MenuItem value={'Windows'}>Windows</MenuItem>
                                <MenuItem value={'Linux'}>Linux</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>

                        <TextField label={"모델명"} type={"text"} name={"model_name"} value={this.state.model_name}
                                   onChange={this.handleValueChange}/><br/>
                        <TextField label={"IP"} type={"text"} name={"ip"} value={this.state.ip}
                                   color={this.state.ipvalue ? "secondary" : null}
                                   helperText={this.state.ipvalue ? "IP 주소를 올바르게 입력해주세요." : null}
                                   error={this.state.ipvalue}
                                   onChange={this.handleValueChange}/><br/>
                        <TextField label={"ILO IP"} type={"text"} name={"iloip"} value={this.state.iloip}
                                   color={this.state.ilovalue ? "secondary" : null}
                                   helperText={this.state.ilovalue ? "IP 주소를 올바르게 입력해주세요." : null}
                                   error={this.state.ilovalue}
                                   onChange={this.handleValueChange}/><br/>


                        <GroupAdd stateRefresh={this.props.stateRefresh} getRackState={this.getRackState}/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"primary"} onClick={this.handleFormSubmit}>추가</Button>
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.rack !== this.state.rack) {
            if (this.state.rack === 'add') {
                this.setState({groupOpen: true})
            }
        }

    }
}

export default withStyles(styles)(ServerAdd);