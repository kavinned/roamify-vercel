import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { loginThunk } from "../store/thunks/authThunk";
import Loader from "../components/Loader";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

interface Credentials {
    email: string;
    password: string;
}

export default function Login() {
    useDocumentTitle("Login");
    const dispatch = useAppDispatch();
    const {
        status,
        loginError: error,
        isAuth,
    } = useAppSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams] = useSearchParams();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSuccessMessage([]);
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData);
        const credentials: Credentials = {
            email: formObject.email as string,
            password: formObject.password as string,
        };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
            alert("Invalid email format");
            return;
        }
        dispatch(loginThunk(credentials));
    }

    useEffect(() => {
        if (location.state?.message?.register) {
            const messageArray = location.state.message.register.split(",");
            setSuccessMessage(messageArray);
            const timer = setTimeout(() => {
                setSuccessMessage([]);
                navigate(location.pathname, { replace: true });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [location, navigate]);

    useEffect(() => {
        const location = searchParams.get("redirect") || "dashboard";
        if (isAuth) navigate(`/${location}`);
    }, [isAuth, navigate, searchParams, status]);

    return (
        <div className="container relative">
            {status === "loading" && <Loader />}
            <Card className="md:w-80 shadow-lg dark:shadow-secondary drop-shadow-lg">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="authform">
                        <div className="form-span">
                            <Label htmlFor="user-email">Email</Label>
                            <Input
                                className="auth-input"
                                type="email"
                                name="email"
                                id="user-email"
                                placeholder="Enter an Email Address"
                                required
                            />
                        </div>
                        <div className="form-span">
                            <Label htmlFor="user-password">Password</Label>
                            <div className="relative">
                                <Input
                                    className="auth-input"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="user-password"
                                    placeholder="Enter a Password"
                                    required
                                />
                                <div
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-fit"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <AiFillEye size={20} />
                                    ) : (
                                        <AiFillEyeInvisible size={20} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button type="submit">Login</Button>
                        <p className="mt-2 text-sm">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-500">
                                Register
                            </Link>
                        </p>
                        {successMessage.length > 0 && (
                            <div className="success-message text-green-500 mb-4">
                                {successMessage.map((msg, index) => (
                                    <p key={index}>{msg}</p>
                                ))}
                            </div>
                        )}
                        {error.message && (
                            <p className="text-red-500">{error.message}</p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}





