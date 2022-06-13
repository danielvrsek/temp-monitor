import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ApiClient from '../api/ApiClient';
import Error from '../common/Error';
import Loading from '../common/Loading';
import { GatewayViewModel, WorkspaceViewModel } from 'shared/src/dto';
import WorkspaceDetailReady from '../components/workspace/WorkspaceDetailReady';
import WeatherstationListReady from '../components/weatherstation/WeatherstationListReady';
import UserListReady from '../components/weatherstation/UserWeatherStationListReady';

type Props = {
    index: number;
    value: number;
    children: JSX.Element;
};

const TabPanel: React.FC<Props> = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const WorkspaceDetailPage = () => {
    const [gateways, setGateways] = useState<GatewayViewModel[]>();
    const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceViewModel>();
    const [value, setValue] = useState<number>(-1);
    const [detailStatus, setDetailStatus] = useState('loading');
    const [listStatus, setListStatus] = useState('loading');

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (_: any, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const param = parseInt(searchParams.get('tab') ?? '');
        setValue(param ? param : 0);
    }, [searchParams, setValue]);

    useEffect(() => {
        if (value !== -1) {
            setSearchParams({ tab: value.toString() });
        }
    }, [value, setSearchParams]);

    useEffect(() => {
        ApiClient.getGateways()
            .then((response) => {
                setGateways(response.data);
                setListStatus('success');
            })
            .catch((error) => {
                setListStatus('error');
                return error;
            });
    }, []);

    useEffect(() => {
        ApiClient.getCurrentWorkspace()
            .then((response) => {
                setCurrentWorkspace(response.data);
                setDetailStatus('success');
            })
            .catch((error) => {
                setDetailStatus('error');
                return error;
            });
    }, []);

    let detailResult;
    let listResult;

    switch (detailStatus) {
        case 'success':
            detailResult = <WorkspaceDetailReady data={currentWorkspace as WorkspaceViewModel} />;
            break;
        case 'error':
            detailResult = <Error content="Error" />;
            break;
        default:
            detailResult = <Loading />;
            break;
    }

    switch (listStatus) {
        case 'success':
            listResult = <WeatherstationListReady data={gateways} />;
            break;
        case 'error':
            listResult = <Error content="Error" />;
            break;
        default:
            listResult = <Loading />;
            break;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <div style={{ marginBottom: '20px' }}>{detailResult}</div>
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Seznam stanic" {...a11yProps(0)} />
                        <Tab label="Seznam uživatelů" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {listResult}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserListReady />
                </TabPanel>
            </Box>
        </Container>
    );
};

export default WorkspaceDetailPage;
