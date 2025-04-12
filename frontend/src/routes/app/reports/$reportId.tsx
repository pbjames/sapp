import Dashboard from '@/components/dashboard/dashboard';
import { Reports } from '@/components/reports';
import { Card } from '@/components/ui/card';
import { ProtectedRoute } from '@/context/ProtectedRouteContext';
import { ReportResponse } from '@/lib/api/profile';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/reports/$reportId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { reportId } = Route.useParams();
    const reportsQ = useQuery<ReportResponse>({
        queryKey: ['reports', reportId],
        queryFn: () => {
            return {
                id: '1',
                title: 'Poop coin',
                chat: 'You should create poop coin',
                images: [],
                createdAt: new Date().getTime(),
            };
        },
    });

    if (reportsQ.status == 'pending') {
        return <div>Loading...</div>;
    }

    if (reportsQ.status == 'error') {
        return <div>Error: {reportsQ.error.message}</div>;
    }

    return (
        <ProtectedRoute>
            <Dashboard>
                <Card className="w-full gap-1 p-4">
                    <h1 className="text-xl font-bold">Report Summary</h1>
                    <h2 className="text-lg font-bold">{reportsQ.data.title}</h2>
                    <p className="text-sm text-gray-500">
                        {new Date(reportsQ.data.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                        {reportsQ.data.chat}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {reportsQ.data.images.map((image) => (
                            <img
                                key={image}
                                src={image}
                                alt="Report Image"
                                className="h-32 w-32 rounded-lg object-cover"
                                loading="lazy"
                            />
                        ))}
                    </div>
                </Card>
            </Dashboard>
        </ProtectedRoute>
    );
}
