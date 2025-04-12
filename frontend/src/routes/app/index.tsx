import Dashboard from '@/components/dashboard/dashboard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import { TrendingResponse } from '@/lib/api/analysis';
import { ProfileResponse } from '@/lib/api/profile';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ChartLine, ChartNoAxesCombined, Coins, Copy } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ProtectedRoute } from '@/context/ProtectedRouteContext';

// We can define beforeMatch if we need more complex route protection logic
export const Route = createFileRoute('/app/')({
    component: ProtectedAppRoute,
});

function ProtectedAppRoute() {
    return (
        <ProtectedRoute>
            <Dashboard>app</Dashboard>
        </ProtectedRoute>
    );
}
