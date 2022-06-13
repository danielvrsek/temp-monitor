import { Card } from '@mui/material';

const Error = (props) => {
    return <Card sx={{ mt: 2, p: 2, backgroundColor: '#d32f2f', color: 'white' }}>{props.content}</Card>;
};

export default Error;
