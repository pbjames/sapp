import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    BarChart,
    Camera,
    File,
    LayoutDashboard,
    Lightbulb,
    List,
    LogOut,
    Orbit,
    Users,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/app',
            icon: <LayoutDashboard className="size-5" />,
        },
        {
            title: 'Analyse Profile',
            url: '/app/analyse-profile',
            icon: <Users className="size-5" />,
        },
        {
            title: 'Analyse Coin',
            url: '/app/analyse-coin',
            icon: <BarChart className="size-5" />,
        },
        {
            title: 'Generate Ideas',
            url: '/app/generate-ideas',
            icon: <Lightbulb className="size-5" />,
        },
        {
            title: 'Previous Reports',
            url: '/app/reports',
            icon: <List className="size-5" />,
        },
    ],
    navClouds: [
        {
            title: 'Capture',
            icon: <Camera className="size-5" />,
            isActive: true,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Proposal',
            icon: <File className="size-5" />,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Prompts',
            icon: <Lightbulb className="size-5" />,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <Link
                        to="/app"
                        className="mt-4 ml-2 flex items-center space-x-2 md:mt-0"
                    >
                        <Orbit className="size-6" />
                        <span className="text-lg font-semibold">SAPP</span>
                    </Link>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => {
                        localStorage.removeItem('auth_token');
                        window.location.href = '/';
                    }}
                >
                    <LogOut className="size-4" />
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
