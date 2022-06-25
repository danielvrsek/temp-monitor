import { Container, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { UserDeviceViewModel } from 'shared/dto';

type Props = {
    data: UserDeviceViewModel;
};

const UserDeviceDetailReady: React.FC<Props> = ({ data }) => {
    return (
        <Container sx={{ pt: 4 }}>
            <Typography variant="h3" mb={3}>
                {data.name}
            </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ fontWeight: 'bold' }}>Id</Typography>
                        </TableCell>
                        <TableCell>{data.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ fontWeight: 'bold' }}>Vytvořeno</Typography>
                        </TableCell>
                        <TableCell>{new Date(data.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Container>
    );
};

export default UserDeviceDetailReady;
