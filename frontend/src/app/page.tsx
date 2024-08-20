"use client";

import {Dashboard} from "@/lib/components/Dashboard";

export default function Home() {
    return (
        <main className="d-flex flex-column container" style={{"margin": "70px auto 50px auto"}}>
            <Dashboard/>
        </main>
    );
}
