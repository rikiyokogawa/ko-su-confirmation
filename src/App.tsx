import React from 'react';
import { useTheme } from '@mui/material/styles';
import './App.css';
import TimeSpentList from "./components/TimeSpentList";
import {Grid, IconButton, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    doneOutlineIcon: {
        marginRight: theme.spacing(2),
    },
}));


const App = () => {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{color: "#ffffff", backgroundColor: theme.palette.primary.dark}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.doneOutlineIcon} color="inherit" aria-label="menu">
                        <DoneOutlineIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        保守工数集計
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid item xs={12}>
                <TimeSpentList/>
            </Grid>
        </div>
    );
}

export default App;
