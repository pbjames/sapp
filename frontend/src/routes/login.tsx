import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import auth from '@/lib/api/auth';

export const Route = createFileRoute('/login')({
    component: RouteComponent,
});

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters long'),
});

type LoginValues = z.infer<typeof loginSchema>;

function RouteComponent() {
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isValid },
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: LoginValues) => {
        try {
            await auth.login(data);
            nav({ to: '/app' });
        } catch (error: Error | any) {
            console.error('Login failed:', error);
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
                className="flex w-full max-w-sm flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="mb-1 text-2xl font-semibold">Login</h1>
                <p className="text-sm">
                    Not signed up?{' '}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Sign up
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
                    Login
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
