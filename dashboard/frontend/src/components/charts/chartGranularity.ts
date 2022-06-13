export type ChartGranularity = {
    label: string;
    value: number;
};

export const granularityList: ChartGranularity[] = [
    {
        label: 'automaticky',
        value: 0,
    },
    {
        label: '1 minuta',
        value: 60,
    },
    {
        label: '5 minut',
        value: 5 * 60,
    },
    {
        label: '10 minut',
        value: 10 * 60,
    },
    {
        label: '30 minut',
        value: 30 * 60,
    },
    {
        label: '1 hodina',
        value: 3600,
    },
    {
        label: '1 den',
        value: 24 * 3600,
    },
];
