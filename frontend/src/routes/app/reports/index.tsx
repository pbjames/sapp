import Dashboard from '@/components/dashboard/dashboard';
import { Reports } from '@/components/reports';
import { Card } from '@/components/ui/card';
import { ProtectedRoute } from '@/context/ProtectedRouteContext';
import profile, { ReportsResponse } from '@/lib/api/profile';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/app/reports/')({
    component: RouteComponent,
});

function RouteComponent() {
    const reportsQ = useQuery<ReportsResponse>({
        queryKey: ['reports'],
        queryFn: () => {
            return profile.getReports(localStorage.getItem('auth_token') || '');
        },
    });

    if (reportsQ.status == 'error') {
        return <div>Error: {reportsQ.error.message}</div>;
    }

    return (
        <ProtectedRoute>
            <Dashboard>
                <Card className="w-full gap-1 p-4">
                    <h1 className="text-xl font-bold">Your Reports</h1>
                    {reportsQ.status === 'pending' ? (
                        <div className="flex h-full w-full items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <Reports reports={reportsQ.data} />
                    )}
                </Card>
            </Dashboard>
        </ProtectedRoute>
    );
}
