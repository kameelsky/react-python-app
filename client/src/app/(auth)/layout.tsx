import SessionRefresher from "@app/lib/components/SessionRefresh";

export default function AuthLayout({ children }: { children: Readonly<React.ReactNode> }): React.ReactNode {
    return (
        <main>
            {children}
            <SessionRefresher />
        </main>
    );
}
