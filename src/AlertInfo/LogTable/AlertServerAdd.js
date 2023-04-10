import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class AlertServerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            server_name: '',
            nickname: '',
            os: '',
            model_name: '',
            ip: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
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
                    open: false
                });
            },
        this.addServerTable()
            .then((res) => {
                console.log(res.data);
            })
            );
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
        console.log(this.state.server_name);
    };

    addServer = () => {
        const url = 'http://localhost:5000/api/servers';
        const data = {
        server_name: this.state.server_name,
        nickname: this.state.nickname,
        os: this.state.os,
        ip: this.state.ip,
        model_name: this.state.model_name
    };
        const config = {
            headers: {
                'content-type': 'application/json' // 파일 전송시의 규약
            }
        };
        return post(url, data, config);
    };

    addServerTable = () => {
        const url = '/api/servers/table_create';
        const data = {server_name : this.state.server_name};
        return post(url, data);
    }


    render() {
        // const {classes} = this.props;
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
                        <TextField label={"OS"} type={"text"} name={"os"} value={this.state.os}
                                   onChange={this.handleValueChange}/><br/>
                        <TextField label={"모델명"} type={"text"} name={"model_name"} value={this.state.model_name}
                                   onChange={this.handleValueChange}/><br/>
                        <TextField label={"IP"} type={"text"} name={"ip"} value={this.state.ip}
                                   onChange={this.handleValueChange}/><br/>
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
}

export default withStyles(styles)(AlertServerAdd);