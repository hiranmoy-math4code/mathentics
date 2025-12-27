"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RewardDisplay } from "@/components/RewardDisplay";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Check authentication status
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                // Fetch user profile including avatar
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("role, avatar_url, full_name")
                    .eq("id", user.id)
                    .single();
                setUserProfile(profile);
                setUserRole(profile?.role || null);
            }
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            if (session?.user) {
                supabase
                    .from("profiles")
                    .select("role, avatar_url, full_name")
                    .eq("id", session.user.id)
                    .single()
                    .then(({ data }) => {
                        setUserProfile(data);
                        setUserRole(data?.role || null);
                    });
            } else {
                setUserProfile(null);
                setUserRole(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    const getDashboardLink = () => {
        if (userRole === "admin") return "/admin/dashboard";
        return "/student/dashboard";
    };

    const navLinks = [
        { name: "Courses", href: "/courses" },
        { name: "Test Series", href: "/test-series" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 ${isScrolled
                    ? "bg-white/70 backdrop-blur-lg border-b border-white/20 py-2 shadow-lg shadow-black/5"
                    : "bg-white/50 backdrop-blur-md border-b border-white/10 py-3"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative h-12 w-auto transition-all group-hover:scale-105">
                            <Image
                                src="/mathlogo.png"
                                alt="math4code Academy Logo"
                                width={500}
                                height={100}
                                className="h-12 w-auto object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Auth Buttons / Profile */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                {/* Dashboard Button */}
                                <Link href={getDashboardLink()}>
                                    <Button variant="ghost" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                                        <LayoutDashboard className="w-4 h-4" />
                                        <span className="text-sm font-medium">Dashboard</span>
                                    </Button>
                                </Link>

                                {/* Profile Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="p-0 w-10 h-10 rounded-full hover:ring-2 hover:ring-indigo-200 transition-all">
                                            {userProfile?.avatar_url ? (
                                                <Image
                                                    src={userProfile.avatar_url}
                                                    alt={userProfile?.full_name || "Profile"}
                                                    width={40}
                                                    height={40}
                                                    className="w-10 h-10 rounded-full object-cover shadow-md hover:shadow-lg transition-shadow"
                                                    priority
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-md hover:shadow-lg transition-shadow">
                                                    {user.email?.[0].toUpperCase()}
                                                </div>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-64 p-2">
                                        {/* User Info Header */}
                                        <div className="px-3 py-3 mb-2 border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                {userProfile?.avatar_url ? (
                                                    <Image
                                                        src={userProfile.avatar_url}
                                                        alt={userProfile?.full_name || "Profile"}
                                                        width={40}
                                                        height={40}
                                                        className="w-10 h-10 rounded-full object-cover shadow-md"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                        {user.email?.[0].toUpperCase()}
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                                        {user.email?.split('@')[0]}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <DropdownMenuItem asChild>
                                            <Link href="/student/settings" className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-indigo-50 transition-colors">
                                                <User className="w-4 h-4 text-indigo-600" />
                                                <span className="text-sm font-medium text-gray-700">Profile</span>
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href={getDashboardLink()} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-indigo-50 transition-colors">
                                                <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                                                <span className="text-sm font-medium text-gray-700">Dashboard</span>
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator className="my-2" />

                                        <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-rose-50 transition-colors">
                                            <LogOut className="w-4 h-4 text-rose-600" />
                                            <span className="text-sm font-medium text-rose-600">Sign out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <Button variant="ghost" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/auth/sign-up">
                                    <Button className="bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20 rounded-full px-6">
                                        Sign up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-[60px] left-0 right-0 bg-white border-b border-slate-200 z-40 md:hidden overflow-hidden shadow-xl"
                    >
                        <div className="p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors"
                                >
                                    <span className="font-medium">{link.name}</span>
                                    <ChevronRight className="w-4 h-4 opacity-50" />
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-slate-100">
                                {user ? (
                                    <div className="space-y-2">
                                        <Link href={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="outline" className="w-full justify-start gap-2 border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                                                <LayoutDashboard className="w-4 h-4" />
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <Button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} variant="outline" className="w-full justify-start gap-2 border-rose-200 text-rose-600 hover:bg-rose-50">
                                            <LogOut className="w-4 h-4" />
                                            Sign out
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="outline" className="w-full justify-center border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                                                Log in
                                            </Button>
                                        </Link>
                                        <Link href="/auth/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button className="w-full justify-center bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
                                                Sign up
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
