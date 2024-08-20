import type {Metadata} from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Inter} from "next/font/google";
import {ReactQueryClientProvider} from "@/lib/components/ReactQueryClientProvider";
import {Navbar} from "@/lib/components/Navbar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Verx Test",
    description: "Verx Project",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ReactQueryClientProvider>
            <html lang="en">
                <body className="bg-body-secondary">
                    <Navbar/>
                    <main>{children}</main>
                </body>
            </html>
        </ReactQueryClientProvider>
    );
}
