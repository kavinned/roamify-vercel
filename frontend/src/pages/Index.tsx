import { Earth, MapPin, ListChecks, LayoutDashboard } from "lucide-react";
import Hero from "../components/Hero";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAppSelector } from "../store/store";
import IndexCardBg from "../components/IndexCardBg";
import { motion } from "motion/react";

export default function Index() {
    useDocumentTitle();
    const { isAuth } = useAppSelector((state) => state.auth);

    const features = [
        {
            icon: Earth,
            name: "City Search",
            description: "Search for cities to plan your trips.",
            href: "/search",
            cta: "Go to Search",
            className:
                "lg:row-start-2 lg:row-end-4 lg:col-start-2 lg:col-end-3",
            background: (
                <IndexCardBg
                    position="left"
                    blurPosition="right"
                    backgroundSize="cover"
                    width="3/4"
                    imagePath="assets/globe.jpg"
                    opacity={30}
                    className="bg-no-repeat bg-center"
                />
            ),
            enableGradient: true,
            gradientColors: [
                "rgba(0, 158, 96, 0.1)",
                "rgba(0, 158, 96, 0.3)",
                "rgba(0, 158, 96, 0.5)",
                "rgba(0, 158, 96, 0.7)",
                "rgba(0, 158, 96, 0.9)",
                "transparent",
            ],
            animateGradient: true,
            gradientClassName:
                "top-0 -right-36 w-3/4 h-[40rem] opacity-20 dark:opacity-10 xl:w-1/2 mix-blend-difference",
        },
        {
            icon: MapPin,
            name: "City Details",
            description: "View detailed information about cities.",
            href: "/city?name=Barcelona",
            cta: "Check out a City",
            className:
                "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
            background: (
                <IndexCardBg
                    position="right"
                    blurPosition="left"
                    backgroundSize="cover"
                    width="3/4"
                    imagePath="assets/city.jpg"
                    opacity={30}
                    className="bg-no-repeat bg-center"
                />
            ),
            enableGradient: true,
            gradientColors: [
                "rgba(158, 15, 158, 0.3)",
                "rgba(158, 15, 158, 0.1)",
                "rgba(158, 15, 158, 0.2)",
                "rgba(158, 15, 158, 0.4)",
                "rgba(158, 15, 158, 0.6)",
                "transparent",
            ],
            animateGradient: true,
            gradientClassName:
                "bottom-0 -left-36 w-3/4 h-[40rem] opacity-20 dark:opacity-10 xl:w-1/2 mix-blend-difference",
        },
        {
            icon: ListChecks,
            name: "Itinerary Management",
            description: "Create, edit, and manage your itineraries.",
            href: isAuth ? "/itineraries" : "/login?redirect=itineraries",
            cta: isAuth ? "View Itineraries" : "Login to Itinerary",
            className:
                "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
            background: (
                <IndexCardBg
                    position="right"
                    blurPosition="left"
                    backgroundSize="cover"
                    width="1/2"
                    imagePath="assets/note.jpg"
                    opacity={30}
                    className="bg-no-repeat bg-[right_bottom_20%]"
                />
            ),
            enableGradient: true,
            gradientColors: [
                "rgba(255, 158, 96, 0.1)",
                "rgba(255, 158, 96, 0.3)",
                "rgba(255, 158, 96, 0.5)",
                "rgba(255, 158, 96, 0.7)",
                "rgba(255, 158, 96, 0.9)",
                "transparent",
            ],
            animateGradient: true,
            gradientClassName:
                "top-0 -left-36 w-1/2 h-[30rem] opacity-20 dark:opacity-10 mix-blend-difference",
        },
        {
            icon: LayoutDashboard,
            name: "Dashboard",
            description: "View your dashboard with all your trip information.",
            href: isAuth ? "/dashboard" : "/login",
            cta: isAuth ? "View Dashboard" : "Login to Dashboard",
            className:
                "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
            background: (
                <IndexCardBg
                    position="left"
                    blurPosition="right"
                    backgroundSize="cover"
                    width="3/4"
                    imagePath="assets/chart.jpg"
                    opacity={30}
                    className="bg-no-repeat bg-center"
                />
            ),
            enableGradient: true,
            gradientColors: [
                "rgba(158, 15, 0, 0.3)",
                "rgba(158, 15, 0, 0.1)",
                "rgba(158, 15, 0, 0.2)",
                "rgba(158, 15, 0, 0.4)",
                "rgba(158, 15, 0, 0.6)",
                "transparent",
            ],
            animateGradient: true,
            gradientClassName:
                "bottom-0 -right-36 w-3/4 h-[40rem] opacity-20 dark:opacity-10 xl:w-1/2 mix-blend-difference",
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center">
            <Hero />
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full h-full"
            >
                <BentoGrid className="p-10 md:grid-rows-3 md:grid-cols-2 auto-rows-[20vh]">
                    {features.map((feature, idx) => (
                        <BentoCard
                            className={`${feature.className} md:pt-5`}
                            background={feature.background}
                            Icon={feature.icon}
                            description={feature.description}
                            name={feature.name}
                            cta={feature.cta}
                            href={feature.href}
                            key={idx}
                            enableGradient={feature.enableGradient}
                            gradientColors={feature.gradientColors}
                            animateGradient={feature.animateGradient}
                            gradientClassName={feature.gradientClassName}
                        />
                    ))}
                </BentoGrid>
            </motion.div>
        </div>
    );
}
