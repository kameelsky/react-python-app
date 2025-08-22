"use client";

import { Button as MantineButton, ButtonProps as MantineButtonProps } from "@mantine/core";
import { ButtonHTMLAttributes, MouseEvent, useRef } from "react";
import effects from "@app/lib/styles/effects.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    MantineButtonProps & {
        ripple?: boolean;
    };

export default function Button({ children, ripple = true, onClick, ...otherProps }: ButtonProps): React.ReactElement {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (ripple && buttonRef.current) {
            const button = buttonRef.current;
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.position = "relative";
            button.style.overflow = "hidden";

            const rippleSpan = document.createElement("span");
            rippleSpan.className = effects.ripple;
            rippleSpan.style.left = `${x}px`;
            rippleSpan.style.top = `${y}px`;
            button.appendChild(rippleSpan);

            setTimeout(() => {
                rippleSpan.remove();
            }, 700);
        }
        if (onClick) onClick(e);
    };

    return (
        <MantineButton ref={buttonRef} onClick={handleClick} {...otherProps}>
            {children}
        </MantineButton>
    );
}
