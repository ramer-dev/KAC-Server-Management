import React from 'react';
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});



class DetailView extends React.Component {


    handleClickOpen = () => {
        // e.preventDefault();
        this.props.clickServerInfo(this.props.name);
    };
    render() {
        // const {classes} = this.props;
        return (
            <div>
                {/*<form onSubmit={this.handleClickOpen}>*/}
                <Button variant={"contained"} color={"primary"} onClick={this.handleClickOpen}>
                    <SubdirectoryArrowLeftIcon/>

                </Button>
                {/*</form>*/}
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

export default withStyles(styles)(DetailView);