import { Card } from '@mui/material';

type Props = {
    content: string | JSX.Element;
};

const Error: React.FC<Props> = ({ content }) => {
    return <Card sx={{ mt: 2, p: 2, backgroundColor: '#d32f2f', color: 'white' }}>{content}</Card>;
};

export default Error;
