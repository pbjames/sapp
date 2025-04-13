import Dashboard from '@/components/dashboard/dashboard';
import { Card } from '@/components/ui/card';
import { ProtectedRoute } from '@/context/ProtectedRouteContext';
import profile, { ReportResponse } from '@/lib/api/profile';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import React from 'react';

export const Route = createFileRoute('/app/reports/$reportId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { reportId } = Route.useParams({});
    const reportsQ = useQuery<ReportResponse>({
        queryKey: ['reports', reportId],
        queryFn: async () => {
            const report = await profile.getReport(
                reportId,
                localStorage.getItem('auth_token') || ''
            );
            console.log(report);
            return report;
        },
    });

    if (reportsQ.status == 'error') {
        return <div>Error: {reportsQ.error.message}</div>;
    }

    return (
        <ProtectedRoute>
            <Dashboard>
                {reportsQ.status === 'pending' ? (
                    <div className="flex h-full w-full items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : (
                    <>
                        <Card className="w-full gap-1 p-4">
                            <h1 className="text-xl font-bold">
                                Report Summary
                            </h1>
                            <p className="text-base text-gray-500">
                                {new Date(
                                    reportsQ.data.created_at
                                ).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </p>

                            <p className="text-lg">
                                {reportsQ.data.content
                                    .split('\n')
                                    .map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                            </p>
                            {reportsQ.data.image_data && (
                                <img
                                    src={reportsQ.data.image_data}
                                    alt="Report Image"
                                    className="h-32 w-32 rounded-lg object-cover"
                                    loading="lazy"
                                />
                            )}
                        </Card>
                    </>
                )}
            </Dashboard>
        </ProtectedRoute>
    );
}
