import { Link } from '@tanstack/react-router';

export function Nav() {
    return (
        <div className="flex gap-2 border-b border-black p-2">
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{' '}
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
        </div>
    );
}
