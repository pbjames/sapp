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
import { TrendingResponse } from '@/lib/api/analysis';
import { ProfileResponse, ReportsResponse } from '@/lib/api/profile';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ChartLine, ChartNoAxesCombined, Coins } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ProtectedRoute } from '@/context/ProtectedRouteContext';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

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
        queryFn: () => {
            return {
                username: 'fred',
                wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                zora: {
                    displayName: 'Freddy Snow',
                    handle: 'fred',
                    bio: 'I am Fred Bloggs',
                    avatar: null,
                    following: 100,
                    followers: 200,
                    holdings: [
                        {
                            id: '1',
                            symbol: 'ETH',
                            name: 'Ethereum',
                            preview: null,
                            amount: 1,
                            value: 2000,
                            timeseries: [],
                        },
                        {
                            id: '2',
                            symbol: 'BTC',
                            name: 'Bitcoin',
                            preview: null,
                            amount: 0.5,
                            value: 25000,
                            timeseries: [
                                {
                                    stamp: 1672531199,
                                    price: 2000,
                                },
                                {
                                    stamp: 1672617599,
                                    price: 2100,
                                },
                            ],
                        },
                    ],
                },
            };
        },
    });

    const reportsQ = useQuery<ReportsResponse>({
        queryKey: ['reports'],
        queryFn: () => {
            return [
                {
                    id: '1',
                    title: 'My first report',
                    description: 'This is my first report',
                    createdAt: 1672531199,
                },
            ];
        },
    });

    const trendingQ = useQuery<TrendingResponse>({
        queryKey: ['trending'],
        queryFn: () => [
            {
                id: '1',
                name: 'SICK COIN',
                symbol: 'SICK',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
                timeseries: [
                    {
                        stamp: 1672531199,
                        price: 2000,
                    },
                    {
                        stamp: 1672617599,
                        price: 2100,
                    },
                ],
            },
            {
                id: '2',
                name: 'EPIC COIN',
                symbol: 'EPIC',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
                timeseries: [
                    {
                        stamp: 1672531199,
                        price: 2000,
                    },
                    {
                        stamp: 1672617599,
                        price: 2100,
                    },
                ],
            },
            {
                id: '3',
                name: 'LIT COIN',
                symbol: 'LIT',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
                timeseries: [
                    {
                        stamp: 1672531199,
                        price: 2000,
                    },
                    {
                        stamp: 1672617599,
                        price: 2100,
                    },
                ],
            },
            {
                id: '4',
                name: 'BRO COIN',
                symbol: 'BRO',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
                timeseries: [
                    {
                        stamp: 1672531199,
                        price: 2000,
                    },
                    {
                        stamp: 1672617599,
                        price: 2100,
                    },
                ],
            },
            {
                id: '5',
                name: 'WOKE COIN',
                symbol: 'WOKE',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
                timeseries: [
                    {
                        stamp: 1672531199,
                        price: 2000,
                    },
                    {
                        stamp: 1672617599,
                        price: 2100,
                    },
                ],
            },
        ],
    });

    if (
        profileQ.status === 'pending' ||
        trendingQ.status === 'pending' ||
        reportsQ.status === 'pending'
    ) {
        return <div>Loading...</div>;
    }

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
                    <h1 className="text-xl font-bold">
                        Welcome back, {profileQ.data.username}
                    </h1>
                    <div className="mt-2 flex flex-row flex-wrap items-center gap-6">
                        <div className="flex flex-row items-center gap-2">
                            {profileQ.data.zora.avatar ? (
                                <img
                                    src={profileQ.data.zora.avatar}
                                    alt="Avatar"
                                    className="h-12 w-12 rounded-full"
                                />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                    {profileQ.data.zora.displayName[0]}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <h2 className="text-lg leading-5 font-semibold">
                                    {profileQ.data.zora.displayName}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {profileQ.data.zora.handle &&
                                        `@${profileQ.data.zora.handle}`}{' '}
                                    ({profileQ.data.wallet})
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm">
                                <span className="font-semibold text-gray-600">
                                    {profileQ.data.zora.following}
                                </span>{' '}
                                <span className="text-gray-500">following</span>
                            </span>
                            <span className="text-sm">
                                <span className="font-semibold text-gray-600">
                                    {profileQ.data.zora.followers}
                                </span>{' '}
                                <span className="text-gray-500">followers</span>
                            </span>
                        </div>
                    </div>
                </Card>
                <div className="mt-4 flex flex-row flex-wrap gap-4">
                    <Card className="flex flex-grow basis-0 flex-col p-4">
                        <div className="flex flex-row items-center gap-3">
                            <Coins className="h-6 w-6 text-gray-500" />
                            <div className="flex flex-col">
                                <h2 className="text-lg leading-5 font-semibold">
                                    Your Holdings
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {profileQ.data.zora.holdings.length} assets
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {profileQ.data.zora.holdings.map((holding) => (
                                <div
                                    key={holding.id}
                                    className="flex flex-row items-center gap-2"
                                >
                                    {holding.preview ? (
                                        <img
                                            src={holding.preview}
                                            alt={holding.name}
                                            className="h-12 w-12 rounded-full"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                            {holding.symbol}
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-semibold">
                                            {holding.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {holding.symbol} - {holding.amount}{' '}
                                            ({holding.value} USD)
                                        </p>
                                    </div>
                                    <button
                                        className="ml-auto"
                                        onClick={() => {
                                            setFocusedCoin({
                                                id: holding.id,
                                                name: holding.name,
                                                symbol: holding.symbol,
                                                timeseries: holding.timeseries,
                                            });
                                        }}
                                    >
                                        <ChartLine className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card className="flex flex-grow basis-0 flex-col p-4">
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
                                <div
                                    key={coin.id}
                                    className="flex flex-row items-center gap-2"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                        {coin.preview ? (
                                            <img
                                                src={coin.preview}
                                                alt={coin.name}
                                                className="h-12 w-12 rounded-full"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                                {coin.symbol}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-semibold">
                                            {coin.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {coin.symbol} - {coin.price} USD
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Market Cap: {coin.marketCap} USD (
                                            {coin.marketCapDelta24h > 0
                                                ? '+'
                                                : ''}
                                            {coin.marketCapDelta24h} USD)
                                        </p>
                                    </div>
                                    <button
                                        className="ml-auto"
                                        onClick={() => {
                                            setFocusedCoin({
                                                id: coin.id,
                                                name: coin.name,
                                                symbol: coin.symbol,
                                                timeseries: coin.timeseries,
                                            });
                                        }}
                                    >
                                        <ChartLine className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
                <Card className="mt-4 flex flex-grow basis-0 flex-col p-4">
                    <h1 className="mb-4 text-xl font-bold">Recent Reports..</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Title
                                </TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-[160px]">
                                    Created
                                </TableHead>
                                <TableHead className="w-[140px] text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reportsQ.data.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">
                                        {report.title}
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {report.description}
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {new Date(
                                            report.createdAt
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button>Go to report</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
                <Dialog
                    open={!!focusedCoin}
                    onOpenChange={() => setFocusedCoin(null)}
                >
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {focusedCoin?.name} ({focusedCoin?.symbol})
                            </DialogTitle>
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
