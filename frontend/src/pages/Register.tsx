import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { registerThunk } from "../store/thunks/authThunk";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { resetLoad } from "../store/reducers/authSlice";

interface Credentials {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

export default function Register() {
    useDocumentTitle("Register");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        status,
        registerError: error,
        isAuth,
    } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData);
        const credentials: Credentials = {
            name: formObject.name as string,
            email: formObject.email as string,
            password: formObject.password as string,
            confirmPassword: formObject.confirmPassword as string,
        };

        // if (credentials.password !== credentials.confirmPassword) {
        //     alert("Passwords do not match");
        //     return;
        // }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(credentials.email)) {
        //     alert("Invalid email format");
        //     return;
        // }

        dispatch(registerThunk(credentials));
    }

    useEffect(() => {
        if (!error && status === "succeeded") {
            navigate("/login", {
                state: {
                    message: {
                        register:
                            "Registration Successful.,Please Login to Continue.",
                    },
                },
            });
        } else {
            return;
        }
        return () => {
            dispatch(resetLoad());
        };
    }, [dispatch, error, navigate, status]);

    useEffect(() => {
        if (isAuth) navigate("/dashboard");
    }, [isAuth, navigate]);

    return (
        <div className="container">
            {status === "loading" && <Loader />}
            <Card className="md:w-80 shadow-lg dark:shadow-primary-foreground drop-shadow-lg">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="authform">
                        <div className="form-span">
                            <Label htmlFor="user-name">Name</Label>
                            <Input
                                className="auth-input"
                                type="text"
                                name="name"
                                id="user-name"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
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
                        <div className="form-span">
                            <Label htmlFor="user-confirm-password">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    className="auth-input"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    id="user-confirm-password"
                                    placeholder="Confirm your Password"
                                    required
                                />
                                <div
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-fit"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
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
                        <Button type="submit">Register</Button>
                        {error.message && (
                            <p className="text-red-500">{error.message}</p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
