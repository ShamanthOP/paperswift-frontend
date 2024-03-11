import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
    const routes = [
        {
            href: `/exams`,
            label: "Exams",
        },
        {
            href: `/courses`,
            label: "Courses",
        },
        {
            href: `/teachers`,
            label: "Teachers",
        },
        {
            href: `/departments`,
            label: "Departments",
        },
        {
            href: `/degrees`,
            label: "Degrees",
        },
        {
            href: `/schemes`,
            label: "Schemes",
        },
    ];

    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
        >
            {routes.map((route) => {
                return (
                    <NavLink
                        key={route.href}
                        to={route.href}
                        className={({ isActive }) =>
                            cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                isActive
                                    ? "text-black dark:text-white"
                                    : "text-muted-foreground"
                            )
                        }
                        end
                    >
                        {route.label}
                    </NavLink>
                );
            })}
        </nav>
    );
}
