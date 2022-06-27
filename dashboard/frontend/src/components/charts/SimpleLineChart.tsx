import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from './chartData';
import { ChartLine } from './chartLines';

type Props = {
    data: ChartData[];
    width?: number;
    height?: number;
    lines: ChartLine[];
    type?: string;
    labelKey?: string;
    disableGrid?: boolean;
    disableLegend?: boolean;
    disableTooltip?: boolean;
};

const SimpleLineChart: React.FC<Props> = (props) => {
    return (
        <ResponsiveContainer width="100%" height="80%">
            <LineChart
                data={props.data}
                width={props.width}
                height={props.height}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                key="1"
            >
                {!props.disableGrid ? <CartesianGrid strokeDasharray="3 3" /> : null}
                <XAxis dataKey="name" minTickGap={20} />
                <YAxis domain={[0, 100]} />
                {!props.disableTooltip ? <Tooltip /> : null}
                {!props.disableLegend ? <Legend /> : null}
                {props.lines.map((line) => (
                    <Line
                        key={line.dataKey}
                        type={line.type}
                        dataKey={line.dataKey}
                        stroke={line.stroke}
                        dot={false}
                        activeDot={{ r: 8 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

SimpleLineChart.defaultProps = {
    data: [],
    lines: [],
    type: '',
    labelKey: '',
    disableGrid: false,
    disableLegend: false,
    disableTooltip: false,
};

export default SimpleLineChart;
