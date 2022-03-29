import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CSVReader from "react-csv-reader";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    tableHead: {
        width: "100%",
    },
    timeSpentTable: {
        padding: theme.spacing(2),
        width: '50%',
        margin: '10px',
    },
    manDayTable: {
        padding: theme.spacing(2),
        width: '50%',
        margin: '10px',
    },
    csvTable: {
        textAlign: "center",
        padding: theme.spacing(2),
        width: "75%",
        margin: '10px',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        boxShadow: "none",
        margin: 'auto',
    },
    text: {
        padding: theme.spacing(1),
        textAlign: 'center',
    },
    button: {
        padding: theme.spacing(1),
        margin: '10px',
        textAlign: 'center',
        border: '1px solid #ccc',
        display: 'block',
    },
}));

function createData(name: string, initEstimate: number, spent: number, result: number) {
    return {name, initEstimate, spent, result};
}

function createResultData(businessDay: number, hourLate: number, manDayLate: number) {
    return {businessDay, hourLate, manDayLate};
}

function createTo320hData(label: string, to320hInit: number, to320hResult: number) {
    return {label, to320hInit, to320hResult};
}

const TimeSpentList = () => {
    const classes = useStyles();

    const initialStates = {
        openInit_tmp: 0,
        openSpent_tmp: 0,
        openResult_tmp: 0,
        solvedInit_tmp: 0,
        solvedSpent_tmp: 0,
        solvedResult_tmp: 0,
        ipInit_tmp: 0,
        ipSpent_tmp: 0,
        ipResult_tmp: 0,
        closeInit_tmp: 0,
        closeSpent_tmp: 0,
        closeResult_tmp: 0,
        susInit_tmp: 0,
        susSpent_tmp: 0,
        susResult_tmp: 0,
        totalInit_tmp: 0,
        totalSpent_tmp: 0,
        totalResult_tmp: 0,
        month: 0,
        day: 0,
    }

    const [state, setState] = useState(initialStates);

    let {
        openInit_tmp,
        openSpent_tmp,
        solvedInit_tmp,
        solvedSpent_tmp,
        ipInit_tmp,
        ipSpent_tmp,
        closeInit_tmp,
        closeSpent_tmp,
        susInit_tmp,
        susSpent_tmp,
        month,
        day,
    } = state;

    const [openInit, setOpenInit] = React.useState(0);
    const [openSpent, setOpenSpent] = React.useState(0);
    const [openResult, setOpenResult] = React.useState(0);
    const [solvedInit, setSolvedInit] = React.useState(0);
    const [solvedSpent, setSolvedSpent] = React.useState(0);
    const [solvedResult, setSolvedResult] = React.useState(0);
    const [ipInit, setIpInit] = React.useState(0);
    const [ipSpent, setIpSpent] = React.useState(0);
    const [ipResult, setIpResult] = React.useState(0);
    const [closeInit, setCloseInit] = React.useState(0);
    const [closeSpent, setCloseSpent] = React.useState(0);
    const [closeResult, setCloseResult] = React.useState(0);
    const [susInit, setSusInit] = React.useState(0);
    const [susSpent, setSusSpent] = React.useState(0);
    const [susResult, setSusResult] = React.useState(0);
    const [totalInit, setTotalInit] = React.useState(0);
    const [totalSpent, setTotalSpent] = React.useState(0);
    const [totalResult, setTotalResult] = React.useState(0);
    const [businessDayConversion, setBusinessDayConversion] = React.useState(320);
    const [csvList, setCsvList] = React.useState([]);

    useEffect(() => {
        setBusinessDayConversion(((320 / Number(month)) * Number(day)))
    }, [month, day]);


    // 集計ボタン押下
    const handleClick = (dataList: any) => {

        dataList.forEach((x: any) => {

            if (x.includes("オープン")) {
                openInit_tmp = Number(x[4]) + openInit_tmp;
                openSpent_tmp = Number(x[3]) + openSpent_tmp;
            } else if (x.includes("解決済")) {
                solvedInit_tmp = Number(x[4]) + solvedInit_tmp;
                solvedSpent_tmp = Number(x[3]) + solvedSpent_tmp;
            } else if (x.includes("進行中")) {
                ipInit_tmp = Number(x[4]) + ipInit_tmp;
                ipSpent_tmp = Number(x[3]) + ipSpent_tmp;
            } else if (x.includes("クローズ")) {
                closeInit_tmp = Number(x[4]) + closeInit_tmp;
                closeSpent_tmp = Number(x[3]) + closeSpent_tmp;
            } else if (x.includes("保留")) {
                susInit_tmp = Number(x[4]) + susInit_tmp;
                susSpent_tmp = Number(x[3]) + susSpent_tmp;
            }
        });

        //以下各集計結果をセットしていく
        //オープンから
        setOpenInit(Number(openInit_tmp.toFixed(2)));
        setOpenSpent(Number(openSpent_tmp.toFixed(2)));
        setOpenResult(Number(openInit_tmp.toFixed(2)));

        // 解決済みの集計結果セット
        setSolvedInit(Number(solvedInit_tmp.toFixed(2)));
        setSolvedSpent(Number(solvedSpent_tmp.toFixed(2)));
        setSolvedResult(Number(solvedInit_tmp.toFixed(2)));

        // 進行中の集計結果セット
        setIpInit(Number(ipInit_tmp.toFixed(2)));
        setIpSpent(Number(ipSpent_tmp.toFixed(2)));
        setIpResult(Number((ipInit_tmp / 2).toFixed(2)));

        // クローズの集計結果セット
        setCloseInit(Number(closeInit_tmp.toFixed(2)));
        setCloseSpent(Number(closeSpent_tmp.toFixed(2)));
        setCloseResult(Number(closeInit_tmp.toFixed(2)));

        // 保留の集計結果セット
        setSusInit(Number(susInit_tmp.toFixed(2)));
        setSusSpent(Number(susSpent_tmp.toFixed(2)));
        setSusResult(Number(susInit_tmp.toFixed(2)));

        //総計
        setTotalInit(Number((openInit_tmp + solvedInit_tmp + ipInit_tmp + closeInit_tmp + susInit_tmp).toFixed(2)));
        setTotalSpent(Number((openSpent_tmp + solvedSpent_tmp + ipSpent_tmp + closeSpent_tmp + susSpent_tmp).toFixed(2)));
        setTotalResult(Number((solvedInit_tmp + (ipInit_tmp / 2) + closeInit_tmp + susInit_tmp).toFixed(2)));

        setCsvList(dataList);
    };

    const estimateRows = [
        createData('オープン', openInit, openSpent, openResult),
        createData('解決済み', solvedInit, solvedSpent, solvedResult),
        createData('進行中', ipInit, ipSpent, ipResult),
        createData('クローズ', closeInit, closeSpent, closeResult),
        createData('保留', susInit, susSpent, susResult),
        createData('総計', totalInit, totalSpent, totalResult),
    ];

    const to320hRows = [
        createTo320hData('320hまで残り', (320 - totalInit), (320 - totalResult)),
    ];

    const resultRows = [
        createResultData(businessDayConversion, (businessDayConversion - totalResult), (businessDayConversion - totalResult) / 8),
    ];


    const handleChange = (event:any) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <TableContainer component={Paper} className={classes.timeSpentTable}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: "bold"}} width="25%">ステータス</TableCell>
                                <TableCell style={{fontWeight: "bold"}} width="25%" align="right">合計/初期見積もり</TableCell>
                                <TableCell style={{fontWeight: "bold"}} width="25%" align="right">合計/消費時間</TableCell>
                                <TableCell style={{fontWeight: "bold"}} width="25%" align="right">集計結果</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {estimateRows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.initEstimate}</TableCell>
                                    <TableCell align="right">{row.spent}</TableCell>
                                    <TableCell align="right">{row.result}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Table aria-label="simple table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell style={{fontWeight: "bold"}} width="25%"> </TableCell>
                                <TableCell style={{fontWeight: "bold"}} width="25%" align="right">初期見積もり</TableCell>
                                <TableCell style={{fontWeight: "bold"}} width="25%" align="right"> </TableCell>
                                <TableCell style={{fontWeight: "bold"}} width="25%" align="right">消化工数</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {to320hRows.map((row) => (
                                <TableRow key={row.label}>
                                    <TableCell component="th" scope="row">
                                        {row.label}
                                    </TableCell>
                                    <TableCell align="right">{row.to320hInit.toFixed(2)}</TableCell>
                                    <TableCell align="right"> </TableCell>
                                    <TableCell align="right">{row.to320hResult.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} className={classes.manDayTable}>
                    <Table aria-label="simple table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell style={{fontWeight: "bold"}} width="20%">営業日換算</TableCell>
                                <TableCell style={{fontWeight: "bold"}} width="30%" align="right">何時間遅れている</TableCell>
                                <TableCell style={{fontWeight: "bold"}} width="30%" align="right">何人日遅れている</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resultRows.map((row) => (
                                <TableRow key={row.businessDay}>
                                    <TableCell component="th" scope="row">
                                        {Number.isNaN(row.businessDay) ? 0 : row.businessDay.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="right">{Number.isNaN(row.hourLate) ? 0 : row.hourLate.toFixed(2)}</TableCell>
                                    <TableCell align="right">{Number.isNaN(row.manDayLate) ? 0 : row.manDayLate.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className={classes.text}>
                        <TextField id="month" name="month" label="今月の営業日数を入力" variant="outlined" onChange={handleChange} className={classes.text}/>
                        <TextField id="day" name="day" label="今日の営業日数を入力" variant="outlined" onChange={handleChange} className={classes.text}/>
                    </div>
                    <div className={classes.button}>
                        <CSVReader
                            onFileLoaded={handleClick}
                        />
                    </div>
                </TableContainer>
            </Paper>
            <Paper className={classes.paper}>
                <TableContainer component={Paper} className={classes.csvTable}>
                    <Table aria-label="simple table">
                        {csvList.map((row, index) =>
                            index === 0 ?
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight: "bold"}} width="15%">{row[0]}</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} width="25%">{row[1]}</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} width="10%">{row[2]}</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} width="12%">{row[3]}</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} width="12%">{row[4]}</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} width="12%">{row[5]}</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} width="14%">{row[6]}</TableCell>
                                </TableRow>
                            </TableHead> :
                            <TableBody>
                                <TableRow key={row[0]}>
                                    <TableCell>{row[0]}</TableCell>
                                    <TableCell>{row[1]}</TableCell>
                                    <TableCell>{row[2]}</TableCell>
                                    <TableCell>{row[3]}</TableCell>
                                    <TableCell>{row[4]}</TableCell>
                                    <TableCell>{row[5]}</TableCell>
                                    <TableCell>{row[6]}</TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Paper>
        </div>



    );
}

export default TimeSpentList;
