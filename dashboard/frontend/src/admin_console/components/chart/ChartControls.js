import React from "react";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Select, MenuItem, Button, Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";


const ChartControls = (props) => {
    const getGranularity = () => {
        let granularity = [];

        props.availableGranularity.forEach((item) => {
            granularity.push(<MenuItem key={item.granularity} value={item.granularity}>{item.name}</MenuItem>);
        });
        return granularity;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={{ xs: 3, sm:2 }} style={{ padding: "8px 0 16px"}}>
                <Grid item xs={12} sm={3}>
                    <DateTimePicker
                        label="Date from"
                        value={props.dateFrom}
                        maxDateTime={props.dateTo}
                        onChange={props.handleDateFrom}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />  
                </Grid>
                <Grid item xs={12} sm={3}>
                    <DateTimePicker
                        label="Date to"
                        value={props.dateTo}
                        minDateTime={props.dateFrom}
                        maxDateTime={new Date()}
                        onChange={props.handleDateTo}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />  
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Select size="small" value={props.granularity} onChange={props.handleGranularity}>
                        {getGranularity()}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="contained" onClick={props.handleReset}>Reset</Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default ChartControls;
