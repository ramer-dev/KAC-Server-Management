import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


class dateComponent extends React.Component {
    state = {
        startDate: new Date()
    };

    handleChange = (date) => {
        this.setState({
            startDate: date
        });

    };

    handleSelect = (date) => {
        this.props.getter(date);
    }

    render() {
        return (
            <DatePicker
                dateFormat={"yyyy/MM/dd"}
                selected={this.state.startDate}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            />
        );
    }
}

export default dateComponent