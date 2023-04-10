import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class AlertServerDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    enterFunction = (event) => {

        if ((event.code === "Space" && this.state.open) || (event.code === "Enter" && this.state.open))
            this.deleteAlert(this.props.id)
                .then(()=> this.props.stateRefresh());
            this.handleClickClose()
    };

    componentDidMount() {
        document.addEventListener("keydown", this.enterFunction, false)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.enterFunction, false)
    }

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

    // 고객의 id가 매개변수로 들어왔을 때 삭제 진행
    deleteServer(id) {
        const url = 'http://localhost:5000/api/servers/' + id;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            this.props.stateRefresh();
        });

    }


    render() {
        return (
            <div>
                <Button variant={"contained"} color={"secondary"} onClick={this.handleClickOpen}
                        label={"삭제"}>삭제</Button>
                <Dialog onClose={this.handleClickClose} open={this.state.open} onEscapeKeyDown={this.handleClickClose}>
                    <DialogTitle onClose={this.handleClickClose}>
                        해제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 서버 알람이 해소됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"secondary"} onKeyDown={(e) => this.enterFunction(e)}
                                onClick={(e) => this.deleteServer(this.props.id)}>삭제</Button>
                        <Button variant={"outlined"} onClick={() => this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default AlertServerDelete;