import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, User, Clock, Star, ChevronRight, Filter, Award } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CourseThumbnail } from "@/components/ui/CourseThumbnail";
import { getTenantId } from "@/lib/tenant";

export { metadata } from './metadata';

export default async function TestSeriesPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string }>;
}) {
    const { q, category } = await searchParams;
    const supabase = await createClient();

    const tenantId = getTenantId();

    // Build query with tenant filtering
    let query = supabase
        .from("courses")
        .select("*, profiles:creator_id(full_name)")
        .eq("is_published", true)
        .eq("course_type", "test_series")
        .order("created_at", { ascending: false })
        .range(0, 19);

    // Add tenant filter
    if (tenantId) {
        query = query.eq("tenant_id", tenantId);
    }

    if (q) {
        query = query.ilike("title", `%${q}%`);
    }

    if (category) {
        query = query.eq("category", category);
    }

    const { data: testSeries } = await query;

    const categories = [
        { label: "IIT-JAM Mathematics", value: "iit_jam" },
        { label: "CSIR NET Mathematical Sciences", value: "csir_net" },
        { label: "GATE Mathematics", value: "gate" },
        { label: "Foundation Courses", value: "foundation" },
        { label: "Advanced Topics", value: "advanced" }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            {/* Hero Section */}
            <div className="pt-28 pb-12 bg-[#0f172a] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10"></div>

                <div className="container max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="w-8 h-8 text-green-400" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                                Test Series
                            </h1>
                        </div>
                        <p className="text-lg text-slate-400 mb-8">
                            Prepare for competitive exams with our comprehensive test series. Practice with real exam patterns, get instant results, and track your progress.
                        </p>

                        {/* Search Bar in Hero */}
                        <div className="relative max-w-xl">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-500" />
                            </div>
                            <form>
                                <input
                                    type="search"
                                    name="q"
                                    defaultValue={q}
                                    placeholder="Search for test series, exams, or topics..."
                                    className="w-full pl-11 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all shadow-lg backdrop-blur-sm"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container max-w-[1200px] mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <div className="hidden lg:block w-64 shrink-0 space-y-8">
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Filter className="w-4 h-4" /> Filters
                            </h3>
                            <div className="space-y-2">
                                <Link href="/test-series" className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!category ? "bg-green-50 text-green-700" : "text-slate-600 hover:bg-slate-100"}`}>
                                    All Categories
                                </Link>
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.value}
                                        href={`/courses?category=${cat.value}`}
                                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${category === cat.value ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"}`}
                                    >
                                        {cat.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filters */}
                    <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                        <div className="flex gap-2">
                            <Link href="/test-series">
                                <Badge variant={!category ? "default" : "outline"} className="whitespace-nowrap py-2 px-4 text-sm bg-green-600 hover:bg-green-700">
                                    All
                                </Badge>
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat.value}
                                    href={`/courses?category=${cat.value}`}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${category === cat.value ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"}`}
                                >
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Test Series Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {testSeries?.map((series) => (
                                <Link key={series.id} href={`/courses/${series.id}`} className="group h-full">
                                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                                        {/* Thumbnail */}
                                        <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                            <CourseThumbnail
                                                src={series.thumbnail_url}
                                                title={series.title}
                                                category="Test Series"
                                                className="w-full h-full"
                                            />
                                            <div className="absolute top-3 right-3 bg-green-600 text-white backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                                                Test Series
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                                                {series.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">
                                                {series.description}
                                            </p>

                                            {/* Meta Info */}
                                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 border-t border-slate-100 pt-4">
                                                <div className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    <span className="truncate max-w-[100px]">{(series.profiles as any)?.full_name || "Instructor"}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Award className="w-3 h-3" />
                                                    <span>Multiple Tests</span>
                                                </div>
                                                <div className="flex items-center gap-1 ml-auto text-amber-500 font-medium">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span>4.8</span>
                                                </div>
                                            </div>

                                            {/* Price & Action */}
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="text-lg font-bold text-slate-900">
                                                    {series.price > 0 ? `₹ ${series.price}` : "Free"}
                                                </div>
                                                <span className="text-sm font-medium text-green-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    View Details <ChevronRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {(!testSeries || testSeries.length === 0) && (
                                <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900 mb-1">No test series found</h3>
                                    <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
