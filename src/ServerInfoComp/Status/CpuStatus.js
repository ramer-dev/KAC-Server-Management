import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Pie} from "react-chartjs-2";
import AbortController from "abort-controller/dist/abort-controller";

const styles = theme => ({
    cpu: {
        margin: 10
    },
    cpuPercentage: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-33%',
    },
    chart: {
        position: 'relative',
    }
});


class CpuStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.selected,
            ip: 0,
            data: {
                legend: {
                    display: false,
                    position: "right",
                    fullWidth: true,
                    reverse: false,
                    fontSize: '24px',
                    labels: {
                        fontColor: "#858585",
                        boxWidth: 16,
                        padding: 25,
                        fontSize: 16,
                        lineWidth: 0
                    }
                },
                labels: [
                    'CPU Level',
                    'Remains'
                ],
                datasets: [
                    {
                        data: [0, 100],
                        backgroundColor: ['rgba(65,158,249,0.5)',
                            'rgba(230,106,210,0.0)',


                        ],
                        hoverBackgroundColor: [
                            'rgba(65,158,249,0.5)',
                            '#9c989e'
                        ],

                        borderColor: [
                            '#419ef9',
                            'rgba(155,155,155,0.2)'
                        ],
                        borderWidth: 3,
                        borderAlign: 'inner',
                        hoverBorderColor: [
                            '#419ef9',
                            '#9c989e'
                        ],
                        hoverBorderWidth: 5,


                    }],
                options: {
                    cutoutPercentage: 90,
                    rotation: Math.PI,
                    circumference: Math.PI,
                    title: {
                        display: true,
                        text: 'CPU'
                    }
                }
            }
        }

    }

    // callWithTimeout = async (url, timeout) => {
    //     const abortController = new AbortController();
    //     const signal = abortController.signal;
    //
    //     setTimeout(() => abortController.abort(), timeout)
    //
    //     fetch(url, signal)
    //         .then(result => result.json())
    //         .then(console.log)
    //         .catch(e => console.log(e.message));
    // }


    callApi = async (ip) => {
        if (ip !== '') {
            const response = await fetch('http://localhost:5000/api/snmp/cpu/' + ip);

            return await response.json()
        } else {
            return {'cpu': 0}
        }
    };

    requestIP = async (name) => {
        if (name !== '' || name !== undefined) {
            const response = await fetch('http://localhost:5000/api/alert/getip/' + name);
            const body = await response.json();
            return body[0].ip
        }
    };

    stateRefresh = () => {
        this.requestIP(this.props.name)
            .then(res => {
                this.callApi(res)
                    .then(res => this.setState({
                        data: {
                            datasets: [{
                                data: [res.cpu, (100 - res.cpu)]

                            }]
                        }
                    }))
            })
            .catch(err => console.log(err));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.name !== this.props.name) {
            this.requestIP(this.props.name)
                .then(res => {
                    this.callApi(res)
                        .then(res => {
                            this.setState({
                                data: {
                                    datasets: [{
                                        data: [res.cpu, (100 - res.cpu)]
                                    }]
                                }
                            })

                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err))
                .then(() => this.stateRefresh())
        }
    }

    componentDidMount() {

        setInterval(this.stateRefresh, 60000)
    }

    componentWillUnmount() {
        this.setState({name: ''})
    }

    render() {

        const {classes} = this.props;
        return (

            <div className={classes.cpu}>
                <Pie className={classes.chart} data={this.state.data} options={this.state.data.options}
                     legend={this.state.data.legend}

                     width={600} height={400}/>
                <h1 className={classes.cpuPercentage}>{this.state.data.datasets[0].data[0] + ' %'}</h1>
            </div>
        )
    }
}

export default withStyles(styles)(CpuStatus)