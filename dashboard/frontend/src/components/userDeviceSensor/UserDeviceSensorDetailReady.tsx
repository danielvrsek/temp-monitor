import { Typography, Table, TableBody, TableRow, TableCell, Chip } from '@mui/material';
import { UserDeviceSensorViewModel } from 'shared/dto';

type Props = {
    data: UserDeviceSensorViewModel;
};

const UserDeviceSensorDetailReady: React.FC<Props> = ({ data }) => {
    return (
        <div>
            <Typography mt={8} variant="h3">
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
                            <Typography sx={{ fontWeight: 'bold' }}>Přidáno</Typography>
                        </TableCell>
                        <TableCell>{new Date(data.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default UserDeviceSensorDetailReady;
