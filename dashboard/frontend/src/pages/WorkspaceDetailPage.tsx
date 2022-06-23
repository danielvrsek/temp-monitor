import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ApiClient from '../api/apiClient';
import Error from '../common/Error';
import Loading from '../common/Loading';
import { WorkspaceViewModel } from 'shared/dto';
import WorkspaceDetailReady from '../components/workspace/WorkspaceDetailReady';
import WeatherstationListLoader from '../components/weatherstation/WeatherstationListLoader';
import UserListLoader from '../components/weatherstation/UserListLoader';

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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceViewModel>();
    const [value, setValue] = useState<number>(-1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState();

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
        ApiClient.getCurrentWorkspace()
            .then((response) => {
                setCurrentWorkspace(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if (error) {
        return <Error content={error} />;
    }

    if (!currentWorkspace) {
        return <Loading />;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <div style={{ marginBottom: '20px' }}>
                <WorkspaceDetailReady data={currentWorkspace as WorkspaceViewModel} />
            </div>
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Seznam stanic" {...a11yProps(0)} />
                        <Tab label="Seznam uživatelů" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <WeatherstationListLoader />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserListLoader />
                </TabPanel>
            </Box>
        </Container>
    );
};

export default WorkspaceDetailPage;
