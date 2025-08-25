import React from "react";
import { Stack } from "@mantine/core";
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import "./loginform.css";
import styles from "@app/lib/styles/styles.module.css";
import RegistrationLink from "./RegistrationLink";

export default function LoginPage(): React.ReactNode {
    return (
        <div className={`login-page ${styles.background}`}>
            <div className="login-panel">
                <div className="login-header">
                    <h1 className="text-[1.5rem] font-bold neon">My App</h1>
                </div>

                <Stack justify="center" className="login-form">
                    <Suspense>
                        <LoginForm />
                    </Suspense>
                </Stack>

                <footer className="login-footer">
                    <RegistrationLink />
                </footer>
            </div>
        </div>
    );
}
