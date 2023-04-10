import React, {Component} from "react";
import {Bar} from 'react-chartjs-2';

let days = [0, 0, 0, 0, 0, 0, 0];
let sum = 0;

class StickChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: true,
            visible: true,
            data: {
                labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets: [
                    {
                        label: '요일별 장애 건수',
                        borderColor: 'rgba(255,99,132,1)',
                        backgroundColor: 'rgba(255,93,132,0)',
                        borderWidth: 3,
                        hoverBackgroundColor: 'rgba(255,93,132,1)',
                        hoverBorderColor: 'rgba(255,99,132,1)',

                        data: [0, 0, 0, 0, 0, 0, 0]
                        // borderSkipped
                    }
                ],
                legend: false,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,

                            }
                        }]
                    }
                }
            }
        }
    }

    callApi = async () => {
        if (this.state.ready) {
            const res = await fetch('http://localhost:5000/api/servers/chart/weekdays');
            return await res.json()
        }
    };

    stateRefresh = () => {

        this.callApi()
            .then(res => {
                    res.map((t) => {
                        days[t.day - 1] = t.count;
                        return days;
                    });
                    this.state.data.datasets[0].data = days;
                    for (let i = 0; days.length > i; i++) {
                        sum += days[i]
                    }
                    if (sum === 0)
                        this.setState({visible: false});
                }
            ).catch(err => console.log(err));
    };

    componentDidMount() {

        this.stateRefresh();

        setInterval(this.stateRefresh, 360000)

    }

    componentWillUnmount() {
        this.setState({ready: false})
    }

    render() {
        return (
            <div>
                    <Bar
                        data={this.state.data}
                        width={800}
                        height={900}
                        scale={this.state.data.scales}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,

                                    }
                                }]
                            }
                        }}
                    />

            </div>
        )
    }
}

export default StickChart;