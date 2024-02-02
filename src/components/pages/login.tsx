import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

const LoginPage = () => {
    const auth = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const onLogin = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/login/`,
                {
                    username,
                    password,
                    email,
                }
            );

            if (res.status === 200) {
                auth.setKey(res.data.key);
                toast.success("You are successfully logged in!");
                navigate("/");
            } else {
                toast.error("Unable to login with this credentials.");
            }
        } catch (e) {
            toast.error("Unable to login with this credentials.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                        Log in to Paper-Swift
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials below to log in your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label>Username</Label>
                        <Input
                            id="username"
                            type="username"
                            placeholder="your username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={onLogin}>
                        Log in
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
