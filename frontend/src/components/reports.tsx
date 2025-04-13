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
                    <TableHead>Content</TableHead>
                    <TableHead className="w-[160px]">Created</TableHead>
                    <TableHead className="w-[140px] text-right">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reports
                    .slice()
                    .reverse()
                    .map((report) => (
                        <TableRow key={report.id}>
                            <TableCell>{report.report_type}</TableCell>
                            <TableCell>
                                {report.content.length > 40
                                    ? `${report.content.slice(0, 40)}...`
                                    : report.content}
                            </TableCell>
                            <TableCell>
                                {new Date(report.created_at).toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    }
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <Link
                                    to={`/app/reports/$reportId`}
                                    params={{ reportId: report.id }}
                                >
                                    <Button>Go to report</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}
