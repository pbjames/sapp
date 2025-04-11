import { Button } from './ui/button';
import { buttonVariants } from './ui/button';
import { HeroCards } from './HeroCards';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export const Hero = () => {
    return (
        <section className="container mx-auto grid items-center gap-x-6 gap-y-8 px-4 py-10 sm:py-16 md:py-24 lg:grid-cols-2 lg:py-32">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
                <main className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
                    <h1 className="inline">
                        <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent">
                            Shadcn
                        </span>{' '}
                        landing page
                    </h1>{' '}
                    for{' '}
                    <h2 className="inline">
                        <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent">
                            React
                        </span>{' '}
                        developers
                    </h2>
                </main>

                <p className="text-muted-foreground mx-auto text-base sm:text-lg md:w-10/12 md:text-xl lg:mx-0">
                    Build your React landing page effortlessly with the required
                    sections for your project.
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                    <Button className="w-full sm:w-auto">Get Started</Button>
                    <a
                        rel="noreferrer noopener"
                        href=""
                        target="_blank"
                        className={`flex w-full items-center justify-center sm:w-auto sm:justify-start ${buttonVariants({ variant: 'outline' })} `}
                    >
                        Github Repository
                        <GitHubLogoIcon className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </div>

            {/* Hero Cards Section */}
            <div className="z-10">
                <HeroCards />
            </div>

            {/* Optional Shadow Element */}
            <div className="shadow"></div>
        </section>
    );
};
