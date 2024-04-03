import { Link, useLocation } from "react-router-dom";
import { AppdataContext } from "../context/AppContext";
import { useContext } from "react";
import { cn } from "../models/helpers/cn";

export const navigation = [
    { name: "Home", href: "/" },
    { name: "Create mappings", href: "/create-mappings" },
    { name: "View log", href: "/view-log" },
];

function Navbar() {
    const { uploadedFile } = useContext(AppdataContext);
    const { pathname } = useLocation();

    return (
        <nav className="w-full h-[6%] p-2 bg-gray-800 flex items-center space-x-4">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                        pathname === item.href
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-6 py-2 text-sm font-medium"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                >
                    {item.name}
                </Link>
            ))}
            <p className="px-6 py-2 !ml-auto text-white">{uploadedFile?.name}</p>
        </nav>
    );
}

export default Navbar;
