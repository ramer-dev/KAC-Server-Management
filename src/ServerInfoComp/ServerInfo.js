import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CpuStatus from "./Status/CpuStatus";
import MemoryStatus from "./Status/MemoryStatus";
import StorageStatus from "./Status/StorageStatus";
import InfoServerTableList from "./LogTable/InfoServerTableList";

const styles = theme => ({
    serverInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        fontSize: '2rem',
        flexDirection: 'column'
    },
    form: {
        display: 'flex'
    },
    selection: {
        width: 1780,
        height: '3.5rem',
        fontSize: '3rem',
    },
    dark:{
        width: 1780,
        height: '3.5rem',
        fontSize: '3rem',
        color: 'white'
    },
    statusUpperSide:{
        display:'flex',
        flexDirection: 'row'
    },
    tables: {
        height: 840,
        overflowY: 'hidden'
    }
});

class ServerInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: '',
            selected: '',
            hasError: false,
            ready: true
        }
    }

    callApi = async () => {
        if(this.state.ready) {
        const response = await fetch('http://localhost:5000/api/information/list');
            return await response.json()
        }
    };

    beginChange = () => {
        if(typeof this.props.value === "undefined" || this.props.value === null || this.props.value === "") {

        } else {
            this.setState({
                selected: this.props.value
            })
        }
        console.log(this.props.value)
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({item: res}))
            // .then(() => this.setState({selected:this.state.item[0].server_name}))
            .then(() => this.beginChange())
            .catch(err => console.log(err));

    }

    componentWillUnmount() {
        this.setState({ready:false})
    }

    handleClick() {
        this.setState(state => ({hasError: !state.selected}));
    }


    render() {
        const {classes} = this.props;
        const filteredComponents = (d) => {
            let i = 0;
            return d.map((c) => {
                i++;
                return <MenuItem style={this.props.dark ? {
                    backgroundColor:'#121212',color:'white'}:null} key={i} value={c.server_name} server_name={c.server_name}>
                    {c.server_name} </MenuItem>
            });
        };

        const {hasError} = this.state;



        const handleChange = event => {
            this.setState({
                selected: event.target.value
            });
            this.handleClick()

        };

        return (
            <div className={classes.serverInfo}>
                <form className={classes.form} autoComplete={"off"} style={{marginTop:15}}>
                    <FormControl error={hasError}>
                        <InputLabel htmlFor="name">
                            Name
                        </InputLabel>
                        <Select
                            defaultValue={'local'}
                            className={this.props.dark ? classes.dark : classes.selection}
                            value={this.state.selected}
                            onChange={handleChange}
                            displayEmpty={false}
                        >
                            {filteredComponents(Array.from(this.state.item))}
                        </Select>
                    </FormControl>
                </form>
                <div className={classes.tables}>
                    <div className={classes.statusUpperSide}>
                        {/*status*/}
                        <CpuStatus name={this.state.selected}/>
                        <MemoryStatus name={this.state.selected} />
                        <StorageStatus name={this.state.selected}/>
                    </div>
                    <br/>
                    <hr/>
                {/*  alertlogs  */}
                <InfoServerTableList name={this.state.selected} dark={this.props.dark}/>
                </div>

            </div>
        )
    }
}


export default withStyles(styles)(ServerInfo);