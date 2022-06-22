export type ChartLine = {
    type: string;
    dataKey: string;
    stroke: string;
};

export const lines = [
    {
        type: 'monotone',
        dataKey: 'temperature',
        stroke: '#8884d8',
    },
    {
        type: 'monotone',
        dataKey: 'humidity',
        stroke: '#82ca9d',
    },
];
