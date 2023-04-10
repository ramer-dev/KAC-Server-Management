import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'
import ServerDelete from "./ServerDelete";
import ServerEdit from "./ServerEdit";
const fontColor = {color:'white'}

class ServerList extends React.Component{

    render(){
        return (
        <TableRow>
            <TableCell style={this.props.dark ? fontColor : null}>{this.props.id}</TableCell>
            <TableCell style={this.props.dark ? fontColor : null}>{this.props.server_name}</TableCell>
            <TableCell style={this.props.dark ? fontColor : null}>{this.props.nickname}</TableCell>
            <TableCell style={this.props.dark ? fontColor : null}>{this.props.os}</TableCell>
            <TableCell style={this.props.dark ? fontColor : null}>{this.props.model_name}</TableCell>
            <TableCell style={this.props.dark ? fontColor : null}>{this.props.ip}</TableCell>
            <TableCell style={this.props.dark ? fontColor : null}>{this.props.iloip}</TableCell>
            <TableCell style={this.props.dark ? fontColor : null}>{this.props.rack}</TableCell>
            <TableCell><ServerEdit stateRefresh={this.props.stateRefresh} num={this.props.num} id={this.props.id} server_name={this.props.server_name}
            nickname={this.props.nickname} os={this.props.os} model_name={this.props.model_name} ip={this.props.ip} iloip={this.props.iloip} rack={this.props.rack}/></TableCell>
            <TableCell><ServerDelete stateRefresh={this.props.stateRefresh} num={this.props.num}/></TableCell>
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
export default ServerList;