import { ReportsResponse } from '@/lib/api/profile';
import { Button } from './ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table';
import { Link } from '@tanstack/react-router';

export function Reports({ reports }: { reports: ReportsResponse }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Type</TableHead>
                    <TableHead className="w-[200px]">Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[160px]">Created</TableHead>
                    <TableHead className="w-[140px] text-right">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reports.map((report) => (
                    <TableRow key={report.id}>
                        <TableCell className="font-medium">
                            {report.type}
                        </TableCell>
                        <TableCell className="font-medium">
                            {report.title}
                        </TableCell>
                        <TableCell className="text-gray-500">
                            {report.description}
                        </TableCell>
                        <TableCell className="text-gray-500">
                            {new Date(report.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                }
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            <Link to={`/app/reports/${report.id}`}>
                                <Button>Go to report</Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
