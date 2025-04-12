import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import auth from '@/lib/api/auth';

export const Route = createFileRoute('/register')({
    component: RouteComponent,
});

const registerSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    wallet_address: z
        .string()
        .min(1, 'Wallet address is required')
        .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters long'),
});

type RegisterValues = z.infer<typeof registerSchema>;

function RouteComponent() {
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        clearErrors,
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: RegisterValues) => {
        try {
            await auth.register(data);
            nav({ to: '/app' });
        } catch (error: Error | any) {
            console.error('Registration failed:', error);
            setError('root', {
                type: 'manual',
                message: error.message,
            });
            return;
        }
    };

    return (
        <div className="flex flex-grow items-center justify-center">
            <form
                className="my-8 flex w-full max-w-sm flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="mb-1 text-2xl font-semibold">Sign Up</h1>
                <p className="text-sm">
                    Already signed up?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </p>

                <Label htmlFor="username" className="mt-4 mb-2">
                    Username
                </Label>
                <Input
                    id="username"
                    placeholder="Username"
                    {...register('username')}
                    onChange={(e) => {
                        clearErrors('root');
                        register('username').onChange(e);
                    }}
                />
                {errors.username && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.username.message}
                    </span>
                )}

                <Label htmlFor="wallet_address" className="mt-4 mb-2">
                    Wallet Address
                </Label>
                <Input
                    id="wallet_address"
                    placeholder="0x..."
                    {...register('wallet_address')}
                    onChange={(e) => {
                        clearErrors('root');
                        register('username').onChange(e);
                    }}
                />
                {errors.wallet_address && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.wallet_address.message}
                    </span>
                )}

                <Label htmlFor="password" className="mt-4 mb-2">
                    Password
                </Label>
                <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    className="mb-1"
                    {...register('password')}
                    onChange={(e) => {
                        clearErrors('root');
                        register('username').onChange(e);
                    }}
                />
                {errors.password && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                    </span>
                )}

                <Button className="mt-4" type="submit" disabled={!isValid}>
                    Sign Up
                </Button>
                {errors.root && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.root.message}
                    </span>
                )}
            </form>
        </div>
    );
}
