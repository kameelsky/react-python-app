import styles from "@app/lib/styles/styles.module.css";
import { Stack } from "@mantine/core";
import React, { Suspense } from "react";
import LoginForm from "./LoginForm";
import "./loginform.css";
import RegistrationModalLink from "./registration/RegistrationModalLink";

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
                    <RegistrationModalLink link="Having trouble with login?" />
                </footer>
            </div>
        </div>
    );
}
