import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'
import DetailView from "./DetailView";
import AlertDelete from "./AlertDelete";
const dark = {color : 'white'};

class AlertList extends React.Component{

    render(){
        return (

        <TableRow>
            <TableCell style={this.props.dark ? dark : null}>{this.props.id}</TableCell>
            <TableCell style={this.props.dark ? dark : null}>{this.props.name}</TableCell>
            <TableCell style={this.props.dark ? dark : null}>{this.props.error}</TableCell>
            <TableCell style={this.props.dark ? dark : null}>{this.props.date_created}</TableCell>
            <TableCell><DetailView stateRefresh={this.props.stateRefresh} id={this.props.num} clickServerInfo={this.props.clickServerInfo} name={this.props.name}/></TableCell>
            <TableCell><AlertDelete stateRefresh={this.props.stateRefresh} id={this.props.num} /></TableCell>
        </TableRow>
        )
    }
}
export default AlertList;