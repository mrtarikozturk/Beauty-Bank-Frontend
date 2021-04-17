import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

//TODO: Bu component sadece iki yerde kullanilmis ancak oralarda da islevi yok. Gereksiz ise silelim.

const TicketTable = ({tableHeader, ticketsData}) => {
    return (
        <>
            <Typography component="h2" variant="h6" color="secondary" gutterBottom>
                {tableHeader}
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Ticket ID</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Create Date</TableCell>
                        <TableCell>Service Type</TableCell>
                        <TableCell>Phone Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ticketsData?.map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell>{ticket.id}</TableCell>
                            <TableCell>{ticket.owner.username}</TableCell>
                            <TableCell>{ticket.created_at}</TableCell>
                            <TableCell>{ticket.service_type}</TableCell>
                            <TableCell>{ticket.phone_number}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export { TicketTable };