'use client';
import { AuthProvider} from "@/hooks/useAuth";
import { LayoutProps } from "@/types/layout";

export default function Layout({ children }: LayoutProps) {

    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}