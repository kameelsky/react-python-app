import SessionRefresher from "@app/lib/components/SessionRefresh";

export default function AuthLayout({ children }: { children: Readonly<React.ReactNode> }): React.ReactElement {
    return (
        <main>
            {children}
            <SessionRefresher />
        </main>
    );
}
