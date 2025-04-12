import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';

const zoraImg = 'https://img.cryptorank.io/coins/zora1718819483850.png';

export const Hero = () => {
    return (
        <section className="mx-auto grid w-full max-w-5xl items-center gap-x-6 gap-y-8 px-4 py-10 sm:py-16 md:py-24 lg:grid-cols-2 lg:py-32">
            <img className="absolute hidden pl-[50%] lg:block" src={zoraImg} />
            {/* Left Content */}
            <div className="w-full space-y-6 text-center sm:min-w-lg lg:text-left">
                <main className="w-full text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
                    <h1 className="inline">
                        <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent">
                            Analyze
                        </span>{' '}
                        Zora Coins
                    </h1>{' '}
                    for{' '}
                    <h1 className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent">
                        Earning as a Creator
                    </h1>
                </main>

                <p className="text-muted-foreground mx-auto text-base sm:text-lg md:w-10/12 md:text-xl lg:mx-0">
                    Level up your Zora experience with our powerful analytics
                    tool.
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                    <Button asChild>
                        <Link to="/login" className="w-full sm:w-auto">
                            Get Started{' '}
                        </Link>
                    </Button>
                    <Link
                        to="/app"
                        className={`flex w-full items-center justify-center sm:w-auto sm:justify-start ${buttonVariants({ variant: 'outline' })} `}
                    >
                        Github Repository
                        <GitHubLogoIcon className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
            <div className="shadow"></div>
        </section>
    );
};
