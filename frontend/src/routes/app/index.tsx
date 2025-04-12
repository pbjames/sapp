import Dashboard from '@/components/dashboard/dashboard';
import { Card } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import analysis, { TrendingResponse } from '@/lib/api/analysis';
import profile, { ProfileResponse, ReportsResponse } from '@/lib/api/profile';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChartLine, ChartNoAxesCombined, Coins, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ProtectedRoute } from '@/context/ProtectedRouteContext';
import { Reports } from '@/components/reports';

export const Route = createFileRoute('/app/')({
    component: RouteComponent,
});

function RouteComponent() {
    const isMobile = useIsMobile();
    const [focusedCoin, setFocusedCoin] = useState<{
        id: string;
        name: string;
        symbol: string;
        timeseries: {
            stamp: number;
            price: number;
        }[];
    } | null>(null);

    const profileQ = useQuery<ProfileResponse>({
        queryKey: ['profile'],
        queryFn: async () => {
            const p = await profile.getProfile(
                localStorage.getItem('auth_token') || ''
            );

            const holdings = p.holdings.map((holding) => {
                const timeseries = [];
                const now = Date.now();
                let current = holding.value;
                for (let i = 0; i < 100; i++) {
                    timeseries.push({
                        stamp: now - i * 1000 * 60 * 60,
                        price: current,
                    });
                    current =
                        current - (Math.random() * 0.15 - 0.075) * current;
                }
                return {
                    ...holding,
                    timeseries: timeseries.reverse(),
                };
            });

            return {
                ...p,
                holdings,
            };
        },
    });

    const reportsQ = useQuery<ReportsResponse>({
        queryKey: ['reports'],
        queryFn: async () => {
            return await profile.getReports(
                localStorage.getItem('auth_token') || ''
            );
            //return [];
        },
    });

    const trendingQ = useQuery<TrendingResponse>({
        queryKey: ['trending'],
        queryFn: async () => {
            return (await analysis.getTrending('')).map((coin) => {
                const timeseries = [];
                const now = Date.now();
                let current = coin.marketCap;
                for (let i = 0; i < 100; i++) {
                    timeseries.push({
                        stamp: now - i * 1000 * 60 * 60,
                        price: current,
                    });
                    current = current - (Math.random() * 0.15 - 0.05) * current;
                }
                return {
                    ...coin,
                    timeseries: timeseries.reverse(),
                };
            });
        },
    });

    if (profileQ.status === 'error') {
        return <div>Profile Error: {JSON.stringify(profileQ.error)}</div>;
    }

    if (trendingQ.status === 'error') {
        return <div>Trending Error: {JSON.stringify(trendingQ.error)}</div>;
    }

    if (reportsQ.status === 'error') {
        return <div>Reports Error: {JSON.stringify(reportsQ.error)}</div>;
    }

    return (
        <ProtectedRoute>
            <Dashboard>
                <Card className="w-full gap-1 p-4">
                    {profileQ.status == 'pending' ? (
                        <div className="flex h-[calc(122px-2rem)] w-full items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                        </div>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold">
                                Welcome back, {profileQ.data.username}
                            </h1>
                            <div className="mt-2 flex flex-row flex-wrap items-center gap-6">
                                <div className="flex flex-row items-center gap-2">
                                    {profileQ.data.avatar ? (
                                        <img
                                            src={profileQ.data.avatar}
                                            alt="Avatar"
                                            className="h-12 w-12 rounded-full"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                            {profileQ.data.displayName[0]}
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <h2 className="text-lg leading-5 font-semibold">
                                            {profileQ.data.displayName}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {profileQ.data.handle &&
                                                `@${profileQ.data.handle}`}{' '}
                                            ({profileQ.data.wallet})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Card>
                <div className="mt-4 flex flex-row flex-wrap gap-4">
                    <Card className="flex flex-grow basis-0 flex-col p-4">
                        {profileQ.status === 'pending' ? (
                            <div className="flex h-[calc(470px-2rem)] w-full items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-row items-center gap-3">
                                    <Coins className="h-6 w-6 text-gray-500" />
                                    <div className="flex flex-col">
                                        <h2 className="text-lg leading-5 font-semibold">
                                            Your Holdings
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {profileQ.data.holdings.length}{' '}
                                            assets
                                        </p>
                                    </div>
                                </div>
                                <div className="flex max-h-[calc(400px-2rem)] flex-col gap-2 overflow-y-auto">
                                    {profileQ.data.holdings.map((holding) => (
                                        <a
                                            href={
                                                'https://zora.co/coin/base:' +
                                                atob(holding.id).split('.')[1]
                                            }
                                            key={holding.id}
                                            className="flex flex-row items-center gap-2"
                                        >
                                            <img
                                                src={holding.preview!}
                                                alt={holding.name}
                                                className="h-12 w-12 rounded-full"
                                            />
                                            <div className="flex flex-col">
                                                <h3 className="text-lg font-semibold">
                                                    {holding.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Holdings{' '}
                                                    {holding.value < 0.01
                                                        ? '<$0.01'
                                                        : new Intl.NumberFormat(
                                                              'en-US',
                                                              {
                                                                  style: 'currency',
                                                                  currency:
                                                                      'USD',
                                                              }
                                                          ).format(
                                                              holding.value
                                                          )}
                                                </p>
                                            </div>
                                            <button
                                                className="mr-2 ml-auto"
                                                onClick={() => {
                                                    setFocusedCoin({
                                                        id: holding.id,
                                                        name: holding.name,
                                                        symbol: holding.symbol,
                                                        timeseries:
                                                            holding.timeseries,
                                                    });
                                                }}
                                            >
                                                <ChartLine className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                    </Card>
                    <Card className="flex flex-grow basis-0 flex-col p-4">
                        {trendingQ.status === 'pending' ? (
                            <div className="flex h-[calc(470px-2rem)] w-full items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-row items-center gap-3">
                                    <ChartNoAxesCombined className="h-6 w-6 text-gray-500" />
                                    <div className="flex flex-col">
                                        <h2 className="text-lg leading-5 font-semibold">
                                            Trending Coins
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {trendingQ.data.length} assets
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {trendingQ.data.map((coin) => (
                                        <a
                                            href={
                                                'https://zora.co/coin/base:' +
                                                coin.id
                                            }
                                            key={coin.id}
                                            className="flex flex-row items-center gap-2"
                                        >
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                                <img
                                                    src={coin.image}
                                                    alt={coin.name}
                                                    className="h-12 w-12 rounded-full"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-lg font-semibold">
                                                    {coin.name}
                                                </h3>
                                                <p
                                                    className={
                                                        'text-sm text-gray-500'
                                                    }
                                                >
                                                    Market Cap:{' '}
                                                    {new Intl.NumberFormat(
                                                        'en-US',
                                                        {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        }
                                                    ).format(
                                                        coin.marketCap
                                                    )}{' '}
                                                    (
                                                    <span
                                                        className={
                                                            'text-sm ' +
                                                            (coin.marketCapDelta24h >
                                                            0
                                                                ? 'text-green-500'
                                                                : 'text-red-500')
                                                        }
                                                    >
                                                        {coin.marketCapDelta24h >
                                                        0
                                                            ? '+'
                                                            : ''}
                                                        {new Intl.NumberFormat(
                                                            'en-US',
                                                            {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }
                                                        ).format(
                                                            Math.abs(
                                                                coin.marketCapDelta24h
                                                            )
                                                        )}
                                                    </span>
                                                    )
                                                </p>
                                            </div>
                                            <button
                                                className="mr-2 ml-auto"
                                                onClick={() => {
                                                    setFocusedCoin({
                                                        id: coin.id,
                                                        name: coin.name,
                                                        symbol: coin.symbol,
                                                        timeseries:
                                                            coin.timeseries,
                                                    });
                                                }}
                                            >
                                                <ChartLine className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                    </Card>
                </div>
                <Card className="mt-4 flex flex-grow basis-0 flex-col p-4">
                    {reportsQ.status === 'pending' ? (
                        <div className="flex h-[calc(670px-2rem)] w-full items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                        </div>
                    ) : (
                        <>
                            <h1 className="mb-4 text-xl font-bold">
                                Recent Reports..
                            </h1>
                            <Reports reports={reportsQ.data.slice(0, 3)} />
                            <div className="flex items-center justify-center">
                                <Link
                                    to="/app/reports"
                                    className="mt-2 w-fit text-sm text-gray-500 hover:text-gray-700 hover:underline"
                                >
                                    See all reports
                                </Link>
                            </div>
                        </>
                    )}
                </Card>
                <Dialog
                    open={!!focusedCoin}
                    onOpenChange={() => setFocusedCoin(null)}
                >
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{focusedCoin?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-2">
                            <ChartContainer
                                config={{
                                    price: {
                                        label: 'Desktop',
                                        color: 'var(--primary)',
                                    },
                                }}
                                className="aspect-auto h-[250px] w-full"
                            >
                                <AreaChart
                                    data={focusedCoin?.timeseries.map((d) => ({
                                        date: new Date(d.stamp).toISOString(),
                                        price: d.price,
                                    }))}
                                >
                                    <defs>
                                        <linearGradient
                                            id="fillDesktop"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="var(--color-desktop)"
                                                stopOpacity={1.0}
                                            />

                                            <stop
                                                offset="95%"
                                                stopColor="var(--color-desktop)"
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>

                                        <linearGradient
                                            id="fillMobile"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="var(--color-mobile)"
                                                stopOpacity={0.8}
                                            />

                                            <stop
                                                offset="95%"
                                                stopColor="var(--color-mobile)"
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid vertical={false} />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        width={40}
                                        tickFormatter={(value) =>
                                            value >= 1000
                                                ? `$${(value / 1000).toFixed(1)}k`
                                                : `$${value}`
                                        }
                                    />

                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        minTickGap={32}
                                        tickFormatter={(value) => {
                                            const date = new Date(value);

                                            return date.toLocaleDateString(
                                                'en-US',
                                                {
                                                    month: 'short',

                                                    day: 'numeric',
                                                }
                                            );
                                        }}
                                    />

                                    <ChartTooltip
                                        cursor={false}
                                        defaultIndex={isMobile ? -1 : 10}
                                        content={
                                            <ChartTooltipContent
                                                labelFormatter={(value) => {
                                                    return new Date(
                                                        value
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        }
                                                    );
                                                }}
                                                indicator="dot"
                                            />
                                        }
                                    />

                                    <Area
                                        dataKey="price"
                                        type="natural"
                                        fill="url(#fillMobile)"
                                        stroke="var(--color-mobile)"
                                        stackId="a"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </div>
                    </DialogContent>
                </Dialog>
            </Dashboard>
        </ProtectedRoute>
    );
}
