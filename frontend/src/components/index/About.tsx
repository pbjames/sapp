import { Statistics } from './Statistics';
import pilot from '@/assets/pilot.png';

export const About = () => {
    return (
        <section id="about" className="w-full">
            <div className="bg-muted/50 rounded-lg border py-12">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 md:flex-row md:gap-12">
                    {/* Image: centered on mobile */}
                    <img
                        src={pilot}
                        alt="Pilot"
                        className="mx-auto w-[300px] rounded-lg object-contain"
                    />

                    {/* Text and statistics */}
                    <div className="flex flex-col justify-between text-center md:text-left">
                        <div className="pb-6">
                            <h2 className="text-3xl font-bold md:text-4xl">
                                <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                                    About
                                </span>{' '}
                                SAPP
                            </h2>
                            <p className="text-muted-foreground mt-4 text-xl">
                                SAPP is a powerful analytics tool designed to
                                help creators plan and create content on the
                                Zora platform. Effortlessly track your portfolio
                                and use our custom AI to generate insights about
                                your content.
                            </p>
                        </div>

                        <Statistics />
                    </div>
                </div>
            </div>
        </section>
    );
};
