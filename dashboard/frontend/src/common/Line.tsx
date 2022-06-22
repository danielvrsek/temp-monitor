import { Grid, Typography } from '@mui/material';

type Props = {
    header: string;
    content: string | JSX.Element;
};

const Line: React.FC<Props> = ({ header, content }) => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <Typography variant="subtitle1">{header}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography sx={{ lineHeight: 2 }} variant="body2">
                    {content}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Line;
