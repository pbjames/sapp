import { createFileRoute } from '@tanstack/react-router';

import { About } from '@/components/index/About';
import { Cta } from '@/components/index/Cta';
import { FAQ } from '@/components/index/FAQ';
import { Features } from '@/components/index/Features';
import { Hero } from '@/components/index/Hero';
import { HowItWorks } from '@/components/index/HowItWorks';
import { Pricing } from '@/components/index/Pricing';
import { ScrollToTop } from '@/components/index/ScrollToTop';

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
            {
                // <Cta />
            }
            {
                // <Pricing />
            }
            <FAQ />
            <ScrollToTop />
        </>
    );
}
