import Dashboard from '@/components/dashboard/dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
    component: RouteComponent,
});

function RouteComponent() {
    return <Dashboard/>;
}
