import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'

const dark = {color:'white'};

class AlertServerList extends React.Component{

    render(){
        return (
        <TableRow>
            <TableCell style={this.props.dark ? dark : null}>{this.props.num}</TableCell>
            <TableCell style={this.props.dark ? dark : null}>{this.props.name}</TableCell>
            <TableCell style={this.props.dark ? dark : null}>{this.props.error}</TableCell>
            <TableCell style={this.props.dark ? dark : null}>{this.props.ip}</TableCell>
            <TableCell style={this.props.dark ? dark : null}>{this.props.iloip}</TableCell>
            <TableCell style={this.props.dark ? dark : null}>{this.props.date_created}</TableCell>
            <TableCell style={this.props.dark ? dark : null}>{this.props.date_figured}</TableCell>
        </TableRow>
        )
    }
// }
// class CustomerProfile extends React.Component{
//     render(){
//         return(
//             <div>
//                 <img src={this.props.server_name} alt={'profile'}/>
//                 <h2>{this.props.nickname}({this.props.id})</h2>
//             </div>
//         )
//     }
// }
//
//
// class CustomerInfo extends React.Component{
//     render(){
//         return(
//             <div>
//                 <p> {this.props.os}</p>
//                 <p> {this.props.model_name}</p>
//                 <p> {this.props.ip} </p>
//             </div>
//         )
//     }
}
export default AlertServerList;