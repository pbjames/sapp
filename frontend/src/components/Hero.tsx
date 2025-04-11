import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section
      className="
        container 
        mx-auto 
        px-4 
        grid 
        items-center 
        gap-y-8 
        gap-x-6 
        lg:grid-cols-2 
        py-10 
        sm:py-16 
        md:py-24 
        lg:py-32
      "
    >
      {/* Left Content */}
      <div className="space-y-6 text-center lg:text-left">
        <main
          className="
            text-3xl 
            sm:text-4xl 
            md:text-5xl 
            font-bold 
            leading-tight
          "
        >
          <h1 className="inline">
            <span
              className="
                inline 
                bg-gradient-to-r 
                from-[#F596D3]  
                to-[#D247BF] 
                text-transparent 
                bg-clip-text
              "
            >
              Analyse
            </span>{" "}
            Zora Coins
          </h1>{" "}
          for{" "}
          <h2 className="inline">
            <span
              className="
                inline 
                bg-gradient-to-r 
                from-[#61DAFB] 
                via-[#1fc0f1] 
                to-[#03a3d7] 
                text-transparent 
                bg-clip-text
              "
            >
              Earning as a creator
            </span>{" "}
          </h2>
        </main>

        <p
          className="
            text-base 
            sm:text-lg 
            md:text-xl 
            text-muted-foreground 
            md:w-10/12 
            mx-auto 
            lg:mx-0
          "
        >
          Build your React landing page effortlessly with the required sections
          for your project.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
          <Button className="w-full sm:w-auto">Get Started</Button>
          <a
            rel="noreferrer noopener"
            href=""
            target="_blank"
            className={`
              w-full 
              sm:w-auto 
              flex 
              items-center 
              justify-center 
              sm:justify-start 
              ${buttonVariants({ variant: "outline" })}
            `}
          >
            Current Trending Coins
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
