import { ModeToggle } from "../mode-toggle";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";

const Navbar = () => {
    return (
        <div className="flex h-16 items-center border-b px-10">
            <h1 className="text-2xl font-bold whitespace-nowrap pr-6">
                Paper-Swift
            </h1>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
                <Search />
                <ModeToggle />
                <UserNav />
            </div>
        </div>
    );
};

export default Navbar;
