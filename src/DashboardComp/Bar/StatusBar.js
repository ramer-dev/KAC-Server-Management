import React from "react";
import {Pie} from "react-chartjs-2";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
    cpuPercentage: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-30%',
        paddingBottom: '25%',
        fontWeight: 'bold',
        fontSize: 20
    },
    cpu: {
        margin: '10px 0 0 10px',
    },
});

class StatusBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mount: false,
            data: {
                legend: {
                    display: false,
                    labels: {
                        fontColor: "#e2e2e2",
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
                        data: [0, 1],
                        backgroundColor: ['rgba(65,158,249,0.5)',
                            'rgba(235,0,23,0.6)',


                        ],
                        hoverBackgroundColor: [
                            'rgba(65,158,249,0.5)',
                            'rgba(235,23,0,1)'
                        ],

                        borderColor: [
                            '#419ef9',
                            'rgba(235,23,0,1)'
                        ],
                        borderWidth: 3,
                        borderAlign: 'inner',
                        hoverBorderColor: [
                            '#419ef9',
                            'rgba(235,23,0,1)'
                        ],
                        hoverBorderWidth: 5,


                    }],

            },

            lightoptions: {
                cutoutPercentage: 90,
                rotation: Math.PI,
                circumference: Math.PI,
                title: {
                    display: true,
                    text: '서버 총계',
                    fontSize: 24,
                    fontColor: '#000000',
                    fontWeight: 'normal'
                }
            },
            darkoptions: {
                cutoutPercentage: 90,
                rotation: Math.PI,
                circumference: Math.PI,
                title: {
                    display: true,
                    text: '서버 총계',
                    fontSize: 24,
                    fontColor: '#e2e2e2',
                    fontWeight: 'normal'
                }
            }
        }

    }


    callAbnormalApi = async () => {
        const res = await fetch('http://localhost:5000/api/alert/count');
        return await res.json()

    };

    stateRefresh = () => {

        this.callAbnormalApi()
            .then((res) => {
                if (this.state.mount) {
                    this.setState({
                        data: {
                            datasets: [{
                                data: [res[0].status - res[1].status, res[1].status]
                            }]
                        }
                    });
                }
            })
            .catch(err => console.log(err));

    };

    componentDidMount() {
        this.setState({mount: true});
        this.stateRefresh();
        setInterval(this.stateRefresh, 10000)
        // if (!this.props.dark) {
        //
        // }
    }

    componentWillUnmount() {
        this.setState({mount: false})
    }


    render() {
        const {classes} = this.props;
        return (
            <div className={classes.cpu}>
                <Pie className={classes.chart} data={this.state.data}
                     legend={this.state.data.legend}
                     width={100} height={40}

                     options={this.props.dark ? this.state.darkoptions : this.state.lightoptions}
                />
                <h1 className={classes.cpuPercentage}>{this.state.data.datasets[0].data[0] + ''}</h1>

            </div>
        );
    }
}

export default withStyles(styles)(StatusBar)