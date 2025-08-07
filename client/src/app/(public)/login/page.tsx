import React from "react";
import { Stack } from "@mantine/core";
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import "./loginform.css";
import RegistrationLink from "./RegistrationLink";

export default function LoginPage(): React.ReactElement {
    return (
        <div className="login-page">
            <main className="login-panel">
                <header className="login-header">
                    <h1 className="text-[1.5rem] font-bold">My App</h1>
                </header>

                <Stack justify="center" className="login-form">
                    <Suspense>
                        <LoginForm />
                    </Suspense>
                </Stack>

                <footer className="login-footer">
                    <RegistrationLink />
                </footer>
            </main>
        </div>
    );
}
