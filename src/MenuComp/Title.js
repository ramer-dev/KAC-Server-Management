import Typography from "@material-ui/core/Typography";
import React from "react";
import {withStyles} from "@material-ui/core";

const textVar = ['정상 동작 중!', '이상 없음!', '특이사항 없음!'];

const styles = theme => ({
    titleText: {
        marginTop: 15
    }
})

let randomResult = 0;

randomResult = Math.floor(textVar.length * Math.random());
setInterval(() => {
    randomResult = Math.floor(textVar.length * Math.random())
}, 600000);

class Title extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            alert: false,
            servers: '',
            multi: false,
            error: 0,
            memory: '',
        }
    }

    callAlert = () => {
        this.props.getAlert()
            .then(res => this.setState({error: res}))
    }

    callApi = async () => {
        const response = await fetch('http://localhost:5000/api/alert/judgeError');
        const body = await response.json();
        body.length > 1
            ? this.setState({multi: true, alert: true})
            : body.length === 1
            ? this.setState({alert: true, multi: false})
            : this.setState({multi: false, alert: false});
        return body
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Typography variant="h1" noWrap className={classes.titleText}>
                    {this.state.text}
                </Typography>
            </div>

        )
    }


    textSwap = () => {
        this.callApi()
            .then(res => {

                    if (this.state.alert && this.state.multi) {
                        this.setState({text: res.length + '개의 장애 알림 발생'});
                        // console.log('multiple device error occurred')
                    } else if (this.state.alert) {
                        this.setState({text: JSON.stringify(res).substr(17).replace('"}]', '') + '에서 장애가 발생하였습니다.'})
                        // console.log('single device error occurred')
                    } else {
                        this.setState({text: textVar[randomResult]})
                        // console.log('all device has set to normal state')
                    }
                }
            )
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.textSwap();
        this.alertRefresh();
        setInterval(this.alertRefresh, 2000);
        this.setState({text: 'Loading Text...'})
    }

    alertRefresh = () => {
        this.callAlert();
        this.textSwap()
    }


}

export default withStyles(styles)(Title);