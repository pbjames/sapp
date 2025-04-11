import { Button } from '@/components/ui/button';

export const Cta = () => {
    return (
        <section id="cta" className="bg-muted/50 w-full py-16">
            <div className="mx-auto w-full max-w-5xl place-items-center gap-8 px-4 lg:grid lg:grid-cols-2">
                {/* Left text column (centered on mobile, left-aligned on larger screens) */}
                <div className="space-y-4 text-center lg:col-start-1 lg:text-left">
                    <h2 className="text-3xl font-bold md:text-4xl">
                        All Your
                        <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                            {' '}
                            Ideas & Concepts{' '}
                        </span>
                        In One Interface
                    </h2>
                    <p className="text-muted-foreground mt-4 mb-8 text-xl lg:mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque, beatae. Ipsa tempore ipsum iste quibusdam illum
                        ducimus eos. Quasi, sed!
                    </p>
                </div>

                {/* Button container (centered on all screen sizes) */}
                <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row lg:col-start-2">
                    <Button className="w-full md:w-auto">Request a Demo</Button>
                    <Button variant="outline" className="w-full md:w-auto">
                        View all features
                    </Button>
                </div>
            </div>
        </section>
    );
};
