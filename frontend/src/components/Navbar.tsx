import { useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { buttonVariants } from './ui/button';
import { Menu, Flame } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { Link } from '@tanstack/react-router';

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: '#features',
        label: 'Features',
    },
    {
        href: '#about',
        label: 'About us',
    },
    {
        href: '#faq',
        label: 'FAQ',
    },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <header className="dark:bg-background sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700">
            <NavigationMenu className="mx-auto w-full max-w-5xl [&>div]:w-full">
                <NavigationMenuList className="flex h-14 w-full justify-between px-4">
                    <NavigationMenuItem className="flex font-bold">
                        <Link to="/" className="ml-2 flex text-xl font-bold">
                            <Flame className="text-primary mr-2 h-6 w-6" />
                            SAPP
                        </Link>
                    </NavigationMenuItem>

                    {/* mobile */}
                    <span className="flex md:hidden">
                        <ModeToggle />

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger className="px-2">
                                <Menu
                                    className="flex h-5 w-5 md:hidden"
                                    onClick={() => setIsOpen(true)}
                                >
                                    <span className="sr-only">Menu Icon</span>
                                </Menu>
                            </SheetTrigger>

                            <SheetContent side={'left'}>
                                <SheetHeader>
                                    <SheetTitle className="text-xl font-bold">
                                        SAPP
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                                    {routeList.map(
                                        ({ href, label }: RouteProps) => (
                                            <Link
                                                key={label}
                                                to={href}
                                                onClick={() => setIsOpen(false)}
                                                className={buttonVariants({
                                                    variant: 'ghost',
                                                })}
                                            >
                                                {label}
                                            </Link>
                                        )
                                    )}
                                    <a
                                        rel="noreferrer noopener"
                                        href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                                        target="_blank"
                                        className={`w-[110px] border ${buttonVariants(
                                            {
                                                variant: 'secondary',
                                            }
                                        )}`}
                                    >
                                        <GitHubLogoIcon className="mr-2 h-5 w-5" />
                                        Github
                                    </a>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </span>

                    {/* desktop */}
                    <nav className="hidden gap-2 md:flex">
                        {routeList.map((route: RouteProps, i) => (
                            <Link
                                to={route.href}
                                key={i}
                                className={`text-[17px] ${buttonVariants({
                                    variant: 'ghost',
                                })}`}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden gap-2 md:flex">
                        <Link
                            to="/login"
                            className={`border ${buttonVariants({ variant: 'secondary' })}`}
                        >
                            Login
                        </Link>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};
