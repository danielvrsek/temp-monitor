import { Card, CardContent, CardHeader, Divider, Grid, IconButton, MenuItem, MenuList, Popover } from '@mui/material';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Sector, Cell, AreaChart, YAxis, Area, CartesianGrid, SectorProps } from 'recharts';
import { UserDeviceSensorViewModel, UserRoleDto } from 'shared/dto';
import { useWebSocketClient } from '../../api/webSocketClient';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useUserDeviceSensorStore } from '../../stores/userDeviceSensor.store ';
import { useWorkspaceContext } from '../../common/contexts/AuthContext';
import Loading from '../../common/Loading';
import { useNavigate } from 'react-router-dom';

type ChartData = {
    label: string;
    value: number;
    valueMin: number;
    valueMax: number;
    unit: string;
};

type Props = {
    data: UserDeviceSensorViewModel;
};

const UserDeviceSensorValue: React.FC<Props> = ({ data }) => {
    const [workspaceContext] = useWorkspaceContext();
    const [, userDeviceSensorStore] = useUserDeviceSensorStore(data.id);
    const webSocketClient = useWebSocketClient();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const navigate = useNavigate();

    const [areaData, setAreaData] = useState<ChartData[]>([]);
    const areaDataRef = useRef(areaData);

    const handleOpenSettings = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorEl(null);
    };

    const handleRemoveGateway = () => {
        userDeviceSensorStore?.delete(data).then(() => handleCloseSettings());
    };

    const [chartData, setChartData] = useState<ChartData[] | null>(null);

    useEffect(() => {
        areaDataRef.current = areaData;
    }, [areaData]);

    useEffect(() => {
        const updateData = () => {
            webSocketClient?.queryDeviceSensorValueData(data.id).then((res) => {
                const newData = {
                    label: data.name,
                    value: res.value,
                    valueMin: res.valueMin,
                    valueMax: res.valueMax,
                    unit: res.unit,
                };

                const getData = (): ChartData[] => {
                    return [
                        ...areaDataRef.current.slice(0, 9),
                        ...Array.from({ length: 9 - areaDataRef.current.length }, () => ({
                            label: '',
                            value: 0,
                            valueMin: 0,
                            valueMax: 0,
                            unit: '',
                        })),
                    ];
                };

                const valueDomainMax = getValueMax(res.valueMax);
                setAreaData([newData, ...getData()]);
                setChartData([
                    newData,
                    {
                        label: '',
                        value: valueDomainMax - res.value,
                        valueMin: res.valueMin,
                        valueMax: valueDomainMax,
                        unit: '',
                    },
                ]);
            });
        };

        const interval = setInterval(() => updateData(), 2000);
        updateData();

        return () => clearInterval(interval);
    }, [webSocketClient, data, areaDataRef, setAreaData]);

    const handleItemOnClick = () => {
        navigate(`/device-sensors/${data.id}`);
    };

    const popover = workspaceContext?.roles.includes(UserRoleDto.Admin) ? (
        <div>
            <IconButton onClick={handleOpenSettings} aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleCloseSettings}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuList>
                    <MenuItem onClick={handleItemOnClick}>Detail</MenuItem>
                    <MenuItem onClick={handleRemoveGateway}>Remove device sensor</MenuItem>
                </MenuList>
            </Popover>
        </div>
    ) : (
        <></>
    );

    return (
        <Grid item xs={12} sm={6} md={4} lg={12}>
            <Card>
                <CardHeader title={data.name} action={popover} />
                <Divider />
                <CardContent>
                    {chartData && (
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <PieChart width={200} height={100}>
                                    <Pie
                                        activeIndex={0}
                                        activeShape={renderActiveShape}
                                        data={chartData}
                                        cx={40}
                                        cy={40}
                                        innerRadius={25}
                                        outerRadius={32}
                                        startAngle={220}
                                        endAngle={-45}
                                        fill="#8884d8"
                                        paddingAngle={0}
                                        dataKey="value"
                                    >
                                        <Cell key={`cell-${0}`} fill={'#0088FE'} />
                                        <Cell key={`cell-${1}`} fill={'#D1D1D1'} />
                                    </Pie>
                                </PieChart>
                            </Grid>
                            <Grid item xs={10}>
                                <AreaChart
                                    width={900}
                                    height={250}
                                    data={areaData}
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                >
                                    <CartesianGrid />
                                    <YAxis domain={[0, getValueMax(chartData[0].valueMax)]} />
                                    <Area dataKey="value" stroke="#0088FE" fill="#0088FE" isAnimationActive={false} />
                                </AreaChart>
                            </Grid>
                        </Grid>
                    )}
                    {!chartData && <Loading />}
                </CardContent>
            </Card>
        </Grid>
    );
};

const getValueMax = (maxValue: number): number => {
    const points = [100, 1000, 2000, 5000, 10000];
    for (var point of points) {
        if (maxValue <= point) {
            return point;
        }
    }

    return points[0];
};

const renderActiveShape = (props: SectorProps & { payload: ChartData }) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

    return (
        <g>
            <text fontSize={'35'} x={cx! + innerRadius! * 2 - 10} y={cy! + 15} textAnchor="left">
                {`${payload.value.toFixed(2)}${payload.unit}`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
};

export default UserDeviceSensorValue;
