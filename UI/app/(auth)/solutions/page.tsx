'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function SolutionsDefaultPage() {
    // loading state
    const {user, loading} = useAuth();
    const router = useRouter();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }
    else{
        if(user){
            router.push("/solutions/dashboard");
        }
        else{
            router.push("/login");
        }
    }
}