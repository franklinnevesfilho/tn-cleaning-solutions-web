'use client';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoadingPage() {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/solutions/dashboard");
    }else{
      router.replace("/solutions/login"); 
    }
  }, [loading, user, router]);

  if (loading || user) {
    return (
      loading && user == null ?(
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : null
    );
  }

  // This will only render if user is null and not loading
  return null;
}