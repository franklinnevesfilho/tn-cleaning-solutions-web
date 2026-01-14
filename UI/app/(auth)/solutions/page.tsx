'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";

function SolutionsDefaultPage() {
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        
        if (user) {
            router.push("/solutions/dashboard");
        } else {
            router.push("/solutions/login");
        }
    }, [user, loading, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                    {loading ? "Loading..." : "Redirecting..."}
                </p>
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(SolutionsDefaultPage), {
    ssr: false,
});