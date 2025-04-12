import * as React from 'react';

import { NavDocuments } from '@/components/nav-documents';
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
    Users,
} from 'lucide-react';

const data = {
    user: {
        name: 'fred',
        email: 'fred@gmail.com',
        avatar: '/avatars/shadcn.jpg',
    },
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
    navSecondary: [
        {
            title: 'Settings',
            url: '/app/settings',
            icon: <LayoutDashboard className="size-5" />,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <span className="text-base font-semibold">
                                    SAPP
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
