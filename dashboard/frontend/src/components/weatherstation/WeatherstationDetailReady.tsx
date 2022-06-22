import { Typography, Table, TableBody, TableRow, TableCell, Chip } from '@mui/material';
import { GatewayViewModel } from 'shared/dto';

type Props = {
    data: GatewayViewModel;
};

const WeatherstationDetailReady: React.FC<Props> = ({ data }) => {
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
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ fontWeight: 'bold' }}>Stav</Typography>
                        </TableCell>
                        <TableCell>
                            {data.state ? (
                                <Chip label="Aktivní" color="success" />
                            ) : (
                                <Chip label="Čekající" color="warning" />
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default WeatherstationDetailReady;
