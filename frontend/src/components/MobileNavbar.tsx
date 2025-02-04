import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logoutThunk } from "../store/thunks/authThunk";
import { Menu, X } from "lucide-react";

export default function MobileNavbar() {
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await dispatch(logoutThunk());
        closeMenu();
        navigate("/login");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="md:hidden">
            <button
                onClick={toggleMenu}
                className="text-gray-500 focus:outline-none"
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>
            <div
                ref={menuRef}
                id="m-navbar"
                className={`fixed top-16 left-0 bg-background z-50 w-full drop-shadow-lg transform transition-all duration-300 ease-in-out ${
                    isOpen ? "h-0" : "h-auto"
                }`}
                style={{ height: isOpen ? "auto" : 0, overflow: "hidden" }}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink
                        to="/"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        onClick={closeMenu}
                    >
                        Home
                    </NavLink>
                    {isAuth && (
                        <>
                            <NavLink
                                to="/dashboard"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                onClick={closeMenu}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/search"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                onClick={closeMenu}
                            >
                                Search
                            </NavLink>
                            <NavLink
                                to="/itineraries"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                onClick={closeMenu}
                            >
                                Itineraries
                            </NavLink>
                        </>
                    )}
                    {!isAuth ? (
                        <>
                            <NavLink
                                to="/login"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                onClick={closeMenu}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                onClick={closeMenu}
                            >
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <NavLink
                            to="/logout"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={handleLogout}
                        >
                            Logout
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}
