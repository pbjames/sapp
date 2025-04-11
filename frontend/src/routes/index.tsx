import { About } from '@/components/About';
import { Cta } from '@/components/Cta';
import { FAQ } from '@/components/FAQ';
import { Features } from '@/components/Features';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Newsletter } from '@/components/Newsletter';
import { Pricing } from '@/components/Pricing';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Services } from '@/components/Services';
import { Team } from '@/components/Team';
import { Testimonials } from '@/components/Testimonials';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <>
            <Hero />
            <About />
            <HowItWorks />
            <Features />
            <Cta />
            <Pricing />
            <FAQ />
            <ScrollToTop />
        </>
    );
}
