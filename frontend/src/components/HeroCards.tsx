import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const HeroCards = () => {
  return (
    <div
      // Hide this entire cards section on smaller screens, show on lg+
      // Remove the hard-coded width/height, let the container size itself
      // Use overflow-hidden to remove scrollbars
      className="
        hidden 
        lg:flex 
        relative 
        flex-wrap 
        gap-8 
        w-full 
        max-w-[700px] 
        min-h-[550px] 
        overflow-hidden 
      "
    >

    </div>
  );
};
