import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Select, MenuItem, Button, Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { ChartGranularity } from './chartGranularity';
import { WeatherDataViewModel } from 'shared/dto';

type Props = {
    data: WeatherDataViewModel[];
    dateFrom: Date;
    dateTo: Date;
    granularity: number;
    availableGranularity: ChartGranularity[];
    updateDateFrom: (dateFrom: Date | null) => void;
    updateDateTo: (dateFrom: Date | null) => void;
    updateGranularity: (granularity: number) => void;
    handleReset: () => void;
};

const ChartControls: React.FC<Props> = (props) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={{ xs: 3, sm: 2 }} style={{ padding: '8px 0 16px' }}>
                <Grid item xs={12} sm={3}>
                    <DateTimePicker
                        label="Date from"
                        value={props.dateFrom}
                        maxDateTime={props.dateTo}
                        onChange={props.updateDateFrom}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <DateTimePicker
                        label="Date to"
                        value={props.dateTo}
                        minDateTime={props.dateFrom}
                        maxDateTime={new Date()}
                        onChange={props.updateDateTo}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Select
                        size="small"
                        value={props.granularity}
                        onChange={(e) => props.updateGranularity(e.target.value as number)}
                    >
                        {props.availableGranularity.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="contained" onClick={props.handleReset}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default ChartControls;
