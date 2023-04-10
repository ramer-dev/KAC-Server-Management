import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Pie} from "react-chartjs-2";

const styles = theme => ({
    memory: {
        margin: 10
    },
    memoryPercentage: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-33%',
    },
    chart: {
        position: 'relative',
        paddingBottom: '33%',
    }
});


class MemoryStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
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
                    'RAM Level',
                    'Remains'
                ],
                datasets: [
                    {
                        data: [0, 100],
                        backgroundColor: [
                            'rgba(249,155,91,0.5)',
                            'rgba(230,106,210,0.0)',


                        ],
                        hoverBackgroundColor: [
                            '#f99b5b',
                            '#9c989e'
                        ],

                        borderColor: [
                            '#f99b5b',
                            'rgba(155,155,155,0.2)'
                        ],
                        borderWidth: 3,
                        borderAlign: 'inner',
                        hoverBorderColor: [
                            '#f99b5b',
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
                        text: 'Memory'
                    }
                }
            }
        }

    }

    callApi = async (ip) => {
        if (ip !== '' && this.state.display) {
            const response = await fetch('http://localhost:5000/api/snmp/ram/' + ip);
            return await response.json()
        } else {
            return {'ram': 0}
        }
    };

    requestIP = async (name) => {
        if (this.props.name !== '') {
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
                                data: [res.ram, (100 - res.ram)]

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
                                        data: [res.ram, (100 - res.ram)]
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
        this.setState({display: true})
    }

    componentWillUnmount() {
        this.setState({name: '', display: false})
    }

    render() {

        const {classes} = this.props;
        return (

            <div className={classes.memory}>
                <Pie className={classes.chart} data={this.state.data} options={this.state.data.options}
                     legend={this.state.data.legend}
                     width={600} height={400}/>
                <h1 className={classes.memoryPercentage}>{this.state.data.datasets[0].data[0] + ' %'}</h1>
            </div>
        )
    }
}

export default withStyles(styles)(MemoryStatus)