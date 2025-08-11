"use client";

import Button from "@app/lib/components/Button";
import { ServerResponse } from "@app/lib/data/types";
import { POST } from "@app/lib/requests";
import { printSuccess } from "@app/lib/serverActions/terminal";
import { Modal, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notification } from "antd";
import CryptoJS from "crypto-js";
import { Lock, Mail, User } from "lucide-react";

interface RegisterData {
    user_name: string;
    user_surname: string;
    user_email: string;
    user_login: string;
    user_password: string;
}

interface RegisteredUserResponseBody {
    user: {
        ID: number;
        Name: string;
        Surname: string;
        Email: string;
        Login: string;
    };
}

export default function RegistrationLink(): React.ReactElement {
    const [isOpened, modalHandlers] = useDisclosure(false);
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const form = useForm({
        mode: "controlled",
        initialValues: {
            user_name: "John",
            user_surname: "Smith",
            user_email: "john.smith@domain.com",
            user_login: "j.smith",
            user_password: "pass1$",
        },
        validate: {
            user_name: (value) => (value.length === 0 ? "Name is required" : null),
            user_surname: (value) => (value.length === 0 ? "Surname is required" : null),
            user_email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            user_login: (value) => (value.length === 0 ? "Login is required" : null),
            user_password: (value) => {
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(value) || !/[0-9]/.test(value)) {
                    return "Password must include at least one special character '[!@#$%^&*(),.?\":{}|<>]' and number";
                }
            },
        },
    });

    const handleSubmit = async (formData: typeof form.values) => {
        const userData: RegisterData = { ...formData, user_password: CryptoJS.MD5(formData.user_password).toString() };
        const responseData = (await POST("/auth/register", userData)) as ServerResponse<RegisteredUserResponseBody>;
        notificationApi.open({
            type: responseData.success ? "success" : "error",
            message: responseData.success ? "Registration completed!" : "Registration failed.",
            description: responseData.success ? "You have succesfully registered your account." : `${responseData.message}`,
            placement: "bottom",
            // duration: responseData.success ? 2 : 5,
            duration: responseData.success ? 0.5 : 5,
            onClose: responseData.success ? modalHandlers.close : undefined,
        });
        if (responseData.success) {
            const user = responseData.body!.user;
            printSuccess(`New user has registered; ${user.Name} ${user.Surname}: ID: ${user.ID}; Email: ${user.Email}; Login: ${user.Login};`);
        }
    };

    return (
        <>
            <p onClick={modalHandlers.open} className="hover:text-blue-700 underline cursor-pointer">
                Create an account
            </p>
            <Modal opened={isOpened} onClose={modalHandlers.close} closeOnClickOutside={false} title="Register a new account">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput label="Name" withAsterisk key={form.key("user_name")} {...form.getInputProps("user_name")} />
                    <TextInput label="Surname" withAsterisk key={form.key("user_surname")} {...form.getInputProps("user_surname")} />
                    <TextInput label="Email" withAsterisk key={form.key("user_email")} {...form.getInputProps("user_email")} leftSection={<Mail />} />
                    <TextInput label="Login" withAsterisk key={form.key("user_login")} {...form.getInputProps("user_login")} leftSection={<User />} />
                    <PasswordInput label="Password" withAsterisk key={form.key("user_password")} {...form.getInputProps("user_password")} leftSection={<Lock />} />
                    <Button color="black" fullWidth className="mt-10" type="submit">
                        Register
                    </Button>
                </form>
            </Modal>
            {notificationContextHolder}
        </>
    );
}
