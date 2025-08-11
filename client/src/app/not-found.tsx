import Link from "next/link";

export default function NotFound(): React.ReactNode {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <h1 className="font-extrabold text-5xl mb-10">404 Not Found</h1>
            <p>Could not find requested resource</p>
            <Link className="hover:text-blue-700 underline" href="/home">
                Return Home
            </Link>
        </div>
    );
}
