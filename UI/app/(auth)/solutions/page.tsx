'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SolutionsDefaultPage() {
    // loading state
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        const navigate = async () => {
            if (!loading) {
                if (user) {
                    await router.push("/solutions/dashboard");
                } else {
                    await router.push("/login");
                }
            }
        };
        navigate();
    }, [loading, user, router]);
    return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
}