import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/register')({
    component: RouteComponent,
});

function RouteComponent() {
    const [details, setDetails] = useState({
        username: '',
        address: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(details);
    };

    return (
        <div className="flex flex-grow items-center justify-center">
            <form className="flex w-full max-w-sm flex-col" onSubmit={submit}>
                <h1 className="mb-1 text-2xl font-semibold">Sign Up</h1>
                <p className="mb-4 text-sm">
                    Already signed up?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
                <Label htmlFor="username" className="mb-2">
                    Username
                </Label>
                <Input
                    id="username"
                    placeholder="Username"
                    className="mb-4"
                    onChange={(e) =>
                        setDetails({ ...details, username: e.target.value })
                    }
                />
                <Label htmlFor="username" className="mb-2">
                    Wallet Address
                </Label>
                <Input
                    id="address"
                    placeholder="Address"
                    className="mb-4"
                    onChange={(e) =>
                        setDetails({
                            ...details,
                            address: e.target.value,
                        })
                    }
                />
                <Label htmlFor="password" className="mb-2">
                    Password
                </Label>
                <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    className="mb-2"
                    onChange={(e) =>
                        setDetails({ ...details, password: e.target.value })
                    }
                />
                <Button
                    className="mt-4"
                    type="submit"
                    disabled={
                        !details.username ||
                        !details.address ||
                        !details.password
                    }
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
