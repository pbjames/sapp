import Dashboard from '@/components/dashboard/dashboard';
import { Card } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Dashboard>
            <Card className="w-full p-4">
                <h1 className="text-2xl font-bold">Your Profile</h1>
            </Card>
        </Dashboard>
    );
}
