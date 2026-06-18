import Navbar from "@/components/layout/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />

            <main className="w-full">
                <h1 className="text-center mx-auto mt-50 text-5xl">
                    Home Page
                </h1>
            </main>
        </>
    );
}
