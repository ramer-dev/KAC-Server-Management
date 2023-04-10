import React, {Component} from 'react';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Title from "./Title";
import MenuList from "./MenuList";
import audioFile from "../audio/move yourself synth.mp3"

const drawerWidth = 240;

const styles = theme => ({

    root: {
        display: 'flex',
    },
    appBar: {

        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginTop: 5
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    dark: {
        width: drawerWidth,
        flexShrink: 0,
    },
    darkPaper: {
        width: drawerWidth,
        backgroundColor: '#2d2d2d',
    },

    drawerHeader: {
        height: 130,
        display: 'flex',
        alignItems: 'center',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    'MuiTypography-root .MuiToolbar-h6 MuiTypography-h6 MuiTypography-noWrap': {
        fontSize: '5rem'
    },
    footer: {
        position: 'fixed',
        bottom: 0,
        margin: '0 0 5px 5px',
        width: `240`,
        textAlign: 'center',
        fontSize: "14px"
    }


});


class Menu extends React.Component {
    state = {
        play: false,
        path: audioFile
    };
    audio = new Audio(this.state.path);

    constructor(props) {
        super(props);
        this.state = {
            error: 0,
            openValue: false

        }
    }

    callAlert = () => {
        this.props.callAlert()
            .then(res => this.setState({error: res}))
    };

    componentDidMount() {
        this.callAlert();
        setInterval(this.callAlert, 1000);
        this.audio.addEventListener('ended', () => {
            // this.audio.loop = true;
            this.setState({play: false})
        })
    }

    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => {
            this.setState({play: false})
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.error !== this.state.error) {
            if (prevState.error < this.state.error) {
                // prevError = prevProps.error;
                this.togglePlay();
                console.log('alert aremd')
            }
        }
    }

    togglePlay = () => {
        // this.state.play ? this.audio.play() : this.audio.pause();
        this.audio.play().then(r => console.log(r)).catch(err => console.log(err));
    };

    render() {
        const theme = () => {
            this.useTheme()
        };


        const {classes} = this.props;

        // const barStyle = () => {
        //     return {minHeight: '140px'};
        //
        // }

        const normalBarStyle = {
            minHeight: '140px',
        };

        const abnormalBarStyle = {
            minHeight: '140px',
            backgroundColor: '#d32500'
        };


        const handleDrawerOpen = () => {
            this.setState({openValue: true});
        };

        const handleDrawerClose = () => {
            this.setState({openValue: false});
        };


        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    style={this.state.error > 0 ? abnormalBarStyle : normalBarStyle}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.openValue,
                    })}
                >

                    <Toolbar>


                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.openValue && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Title getAlert={this.props.callAlert}/>


                    </Toolbar>

                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.openValue}
                    classes={
                        this.props.dark ?
                            {
                                paper: classes.darkPaper,
                            } : {
                                paper: classes.drawerPaper,
                            }
                    }
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ?
                                this.props.dark ? <ChevronLeftIcon style={{color: "white"}}/> : <ChevronLeftIcon/>
                                : this.props.dark ?
                                    <ChevronRightIcon style={this.props.dark ? {color: "white"} : null}/> :
                                    <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <MenuList
                        dark={this.props.dark}
                        clickDashBoard={this.props.clickDashBoard}
                        clickServerInfo={this.props.clickServerInfo}
                        clickAlertInfo={this.props.clickAlertInfo}
                        clickSetting={this.props.clickSetting}
                        clickChart={this.props.clickChart}
                    />
                    <IconButton aria-label={"dark"} onClick={this.props.darkFunction}>
                        {this.props.dark
                            ? <Brightness2Icon style={{color: "white"}}/>
                            : <Brightness2OutlinedIcon/>
                        }
                    </IconButton>
                    <footer className={classes.footer}
                            style={this.props.dark ? {color: 'white'} : null}>
                        dev by 신희상
                    </footer>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(Menu)
