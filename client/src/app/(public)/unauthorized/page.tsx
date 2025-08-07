import Link from "next/link";

export default function AcessNotGrantedPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <h1 className="font-extrabold text-5xl mb-10">Access not granted</h1>
            <p>Your role has no permission to visit this site</p>
            <Link className="hover:text-blue-700 underline" href="/home">
                Return Home
            </Link>
        </div>
    );
}
