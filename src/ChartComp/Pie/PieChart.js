import React from 'react';
import {Pie} from 'react-chartjs-2';

let type = [];
let value = [];

// let sum = 0;

class PieChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            visible: true,
            data: {
                legend: {
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

                datasets: [
                    {
                        data: [0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(65,158,249,0.0)',
                            'rgba(230,106,210,0.0)',
                            'rgba(255,206,86,0.0)',
                            'rgba(253,93,147,0.0)',
                            'rgba(253,93,147,0.0)',
                            'rgba(253,93,147,0.0)',
                            'rgba(253,93,147,0.0)',
                            'rgba(253,93,147,0.0)',

                        ],
                        hoverBackgroundColor: [
                            '#419ef9',
                            '#e66ad2',
                            '#FFCE56',
                            '#fd4e69',
                            '#46fd43',
                            '#fd8046',
                            '#8e92fd',
                            '#7a7b79',
                            '#f5e58a',
                            '#84f0da',
                            '#e692a9'
                        ],

                        borderColor: [
                            '#419ef9',
                            '#e66ad2',
                            '#FFCE56',
                            '#fd4e69',
                            '#46fd43',
                            '#fd8046',
                            '#8e92fd',
                            '#7a7b79',
                            '#f5e58a',
                            '#84f0da',
                            '#e692a9'
                        ],
                        borderWidth: 3,
                        borderAlign: 'inner',
                        hoverBorderColor: [
                            '#419ef9',
                            '#e66ad2',
                            '#FFCE56',
                            '#fd4e69',
                            '#46fd43',
                            '#fd8046',
                            '#8e92fd',
                            '#7a7b79',
                            '#f5e58a',
                            '#84f0da',
                            '#e692a9'
                        ],
                        hoverBorderWidth: 5,
                    }],
                options: {
                    onClick: (e, element) => {
                        if(element.length > 0){
                            let ind = element;
                            console.log(ind);
                        }
                    },
                    rotation: -1,
                    title: {
                        display: true,
                        text: 'alert info'
                    }
                }
            }
        }
    }

    stateRefresh = () => {
        type = [];
        value = [];
        this.callApi()
            .then(res => {
                res.map((t) => {
                    type.push(t.label);
                    value.push(t.count)
                });
                this.state.data.labels = type;
                this.state.data.datasets[0].data = value;
            })
    };


    render() {
        return (
            <div style={{marginBottom: 20}}>
                {this.state.visible
                    ?
                    <Pie data={this.state.data} options={this.state.data.options} legend={this.state.data.legend}
                         width={800}
                         height={900}/>
                    :
                    <div style={{padding: '50%'}}>
                        There's no disability for a week.
                    </div>}
            </div>
        );
    }

// componentDidMount() {
//     this.stateRefresh()
//     setInterval(this.stateRefresh, 5000)
// }


    callApi = async () => {
        const response = await fetch('http://localhost:5000/api/alert/pie');
        return await response.json();
    };

    componentDidMount() {
        this.stateRefresh();
        setInterval(this.stateRefresh, 60000 * 60)
    }

}

export default PieChart;