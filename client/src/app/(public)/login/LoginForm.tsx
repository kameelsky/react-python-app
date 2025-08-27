"use client";

import Button from "@app/lib/components/Button";
import LayoutOverlay from "@app/lib/components/LayoutOverlay";
import { sessionAuth } from "@app/lib/serverActions/authentication";
import { PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notification } from "antd";
import CryptoJS from "crypto-js";
import { Lock, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LoginForm(): React.ReactNode {
    const [blurEffect, setBlurEffect] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const form = useForm({
        mode: "controlled",
        initialValues: {
            user_login: "",
            provided_password: "",
        },
        validate: {
            user_login: (value) => (value.length === 0 ? "Provide your login." : null),
            provided_password: (value) => (value.length === 0 ? "Provide your password." : null),
        },
    });

    useEffect(() => {
        if (searchParams.get("msg") === "login required") notificationApi.open({ type: "info", message: "Login required", description: "You need to login first.", placement: "top" });
    }, [searchParams, notificationApi]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (formData: typeof form.values) => {
        setBlurEffect(true);
        const responseData = await sessionAuth({ ...formData, provided_password: CryptoJS.MD5(formData.provided_password).toString() });
        notificationApi.open({
            type: responseData.success ? "success" : "error",
            message: responseData.success ? "Login Successful" : "Login Failed",
            description: responseData.success ? (
                <>
                    Welcome back <strong>{responseData.body?.name}</strong>!<br /> Logged in with <strong>{responseData.body?.role}</strong> privileges.
                </>
            ) : (
                responseData.message
            ),
            placement: "top",
            duration: responseData.success ? 2.5 : 5,
            pauseOnHover: true,
            showProgress: responseData.success ? true : false,
            onClose: responseData.success
                ? () => {
                      router.push("/home");
                  }
                : () => {
                      setBlurEffect(false);
                  },
        });
    };

    return (
        <LayoutOverlay visible={blurEffect}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                {notificationContextHolder}
                <TextInput ref={inputRef} label="Login" withAsterisk key={form.key("user_login")} {...form.getInputProps("user_login")} leftSection={<User />} />
                <PasswordInput label="Password" className="mt-3" withAsterisk key={form.key("provided_password")} {...form.getInputProps("provided_password")} leftSection={<Lock />} />
                <Button color="black" fullWidth className="mt-10" type="submit">
                    Log in
                </Button>
            </form>
        </LayoutOverlay>
    );
}
