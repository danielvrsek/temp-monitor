import { Container, Typography, Table, TableRow, TableCell } from '@mui/material';

const WorkspaceDetailReady = (props) => {

    return (
        <Container sx={{ pt: 4 }}>
            <Typography variant="h3" mb={3}>{props.data.name}</Typography>
            <Table>
                <TableRow>
                    <TableCell><Typography sx={{ fontWeight: 'bold' }}>Id</Typography></TableCell>
                    <TableCell>{props.data.id}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Typography sx={{ fontWeight: 'bold' }}>Počet stanic</Typography></TableCell>
                    <TableCell>{props.data.weatherstations}</TableCell>
                </TableRow>
            </Table>
        </Container>
    )
};

export default WorkspaceDetailReady;