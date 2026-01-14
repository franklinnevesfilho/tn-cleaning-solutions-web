'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login, user, loading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/solutions/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // No need to setUser locally — context will update automatically
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const textInputClasses = "border rounded-lg px-4 py-2 md:py-3 lg:py-4 md:text-lg";

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        gap-5
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-lg
        lg:max-w-xl
        xl:max-w-2xl
        ">
          <h2 className="text-4xl font-bold">Login</h2>
          <form
            className="
            flex 
            flex-col 
            space-y-4 
            border 
            border-gray-700
            dark:border-gray-300
            p-6 
            md:p-8
            lg:p-10
            rounded-lg 
            shadow-lg
            w-full
            "
            onSubmit={handleLogin}
          >
            <input
              className={textInputClasses}
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className={textInputClasses}
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              className="rounded-lg px-4 py-2 md:py-3 lg:py-4 md:text-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              type="submit"
            >
              Login
            </button>
          </form>
          {error && <div className="text-red-600 md:text-lg">{error}</div>}
      </div>
    </div>
  );
}
