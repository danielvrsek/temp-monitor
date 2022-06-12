import { Grid, Typography } from '@mui/material';

const Line = (props) => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <Typography variant="subtitle1">{props.header}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography sx={{lineHeight: 2}} variant='body2'>{props.content}</Typography>
            </Grid>
        </Grid>
    )
};

export default Line;