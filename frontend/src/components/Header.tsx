import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logoutThunk } from "../store/thunks/authThunk";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import MobileNavbar from "./MobileNavbar";
import { motion } from "motion/react";

export default function Header() {
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function handleLogout(event: { preventDefault: () => void }) {
        event.preventDefault();
        await dispatch(logoutThunk());
        navigate("/login");
    }

    return (
        <header className="fixed top-0 z-50 bg-background/65 backdrop-blur-md h-16 w-full drop-shadow-xl">
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-between h-full px-4"
            >
                <MobileNavbar />
                <div className="hidden md:flex items-center gap-4">
                    <NavLink to="/" className="font-bold text-xl">
                        Roamify
                    </NavLink>
                    {isAuth && (
                        <div className="flex items-center gap-4">
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/search">Search</NavLink>
                            <NavLink to="/itineraries">Itineraries</NavLink>
                        </div>
                    )}
                </div>
                <div className="hidden md:flex items-center justify-self-end gap-2 ">
                    {!isAuth ? (
                        <>
                            <Button asChild variant="default">
                                <NavLink to="/login">Login</NavLink>
                            </Button>
                            <Button asChild variant="secondary">
                                <NavLink to="/register">Register</NavLink>
                            </Button>
                        </>
                    ) : (
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                    <ModeToggle />
                </div>
                <span className="md:hidden absolute top-1/2 right-4 -translate-y-1/2">
                    <ModeToggle />
                </span>
            </motion.nav>
        </header>
    );
}
