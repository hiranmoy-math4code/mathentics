"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Loader2, Search, Trophy, TrendingUp, Users, ChevronDown, FileSpreadsheet, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExamResult {
    attempt_id: string;
    student_id: string;
    full_name: string;
    email: string;
    avatar_url: string | null;
    status: string;
    submitted_at: string | null;
    total_marks: number | null;
    obtained_marks: number | null;
    percentage: number | null;
    rank: number | null;
}

export default function ExamResultsPage() {
    const params = useParams();
    const examId = params.examId as string;
    const [results, setResults] = useState<ExamResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [examTitle, setExamTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(50); // 50 results per page

    useEffect(() => {
        fetchResults();
    }, [examId]);

    const fetchResults = async () => {
        setLoading(true);
        const supabase = createClient();

        // 1. Fetch exam details
        const { data: examData } = await supabase
            .from("exams")
            .select("title, total_marks")
            .eq("id", examId)
            .single();

        if (examData) {
            setExamTitle(examData.title);
        }

        // 2. Fetch exam attempts
        const { data: attempts, error: attemptsError } = await supabase
            .from("exam_attempts")
            .select("id, student_id, status, created_at")
            .eq("exam_id", examId)
            .eq("status", "submitted");

        if (attemptsError) {
            console.error("Error fetching attempts:", attemptsError);
            setLoading(false);
            return;
        }

        if (!attempts || attempts.length === 0) {
            setResults([]);
            setLoading(false);
            return;
        }

        // 3. Fetch results for these attempts
        const attemptIds = attempts.map(a => a.id);

        const { data: resultsData } = await supabase
            .from("results")
            .select("attempt_id, obtained_marks, percentage")
            .in("attempt_id", attemptIds);

        // 4. Fetch profiles
        const studentIds = [...new Set(attempts.map(a => a.student_id))];
        const { data: profiles } = await supabase
            .from("profiles")
            .select("id, full_name, email, avatar_url")
            .in("id", studentIds);

        // 5. Merge data
        const resultsMap = new Map(resultsData?.map(r => [r.attempt_id, r]) || []);
        const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);

        const merged = attempts.map(attempt => {
            const result = resultsMap.get(attempt.id);
            const profile = profilesMap.get(attempt.student_id);

            return {
                attempt_id: attempt.id,
                student_id: attempt.student_id,
                full_name: profile?.full_name || "Unknown",
                email: profile?.email || "",
                avatar_url: profile?.avatar_url || null,
                status: attempt.status,
                submitted_at: attempt.created_at,
                total_marks: examData?.total_marks || 0,
                obtained_marks: result?.obtained_marks || 0,
                percentage: result?.percentage || 0,
                rank: null as number | null
            };
        });

        // 6. Sort and rank
        const sorted = merged.sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
        sorted.forEach((result, index) => {
            result.rank = index + 1;
        });

        setResults(sorted);
        setLoading(false);
    };

    const filteredResults = results.filter(
        (result) =>
            result.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredResults.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    // Reset to page 1 when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Export to Excel (XLSX) with professional formatting
    const exportToXLSX = async () => {
        const xlsxModule = await import('xlsx');
        const XLSX = xlsxModule.default || xlsxModule;

        // Get best results per student
        const studentBestResults = new Map<string, ExamResult>();
        results.forEach(result => {
            const existing = studentBestResults.get(result.student_id);
            if (!existing || (result.percentage || 0) > (existing.percentage || 0)) {
                studentBestResults.set(result.student_id, result);
            }
        });

        const bestResults = Array.from(studentBestResults.values())
            .sort((a, b) => (a.rank || 999) - (b.rank || 999));

        // Prepare data for Excel
        const excelData = bestResults.map(r => ({
            'Rank': r.rank || '-',
            'Name': r.full_name || 'Unknown',
            'Email': r.email,
            'Status': r.status,
            'Submitted At': r.submitted_at ? format(new Date(r.submitted_at), 'yyyy-MM-dd HH:mm') : '-',
            'Score': r.obtained_marks || 0,
            'Total Marks': r.total_marks || 0,
            'Percentage': r.percentage ? `${r.percentage}%` : '-'
        }));

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(excelData);

        // Set column widths
        ws['!cols'] = [
            { wch: 6 },  // Rank
            { wch: 25 }, // Name
            { wch: 30 }, // Email
            { wch: 12 }, // Status
            { wch: 18 }, // Submitted At
            { wch: 8 },  // Score
            { wch: 12 }, // Total Marks
            { wch: 12 }  // Percentage
        ];

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Results');

        // Download
        XLSX.writeFile(wb, `${examTitle.replace(/[^a-z0-9]/gi, '_')}_results_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
    };

    // Export to PDF with professional formatting
    const exportToPDF = async () => {
        const { jsPDF } = await import('jspdf');
        const autoTableModule = await import('jspdf-autotable');
        const autoTable = autoTableModule.default;

        // Get best results per student
        const studentBestResults = new Map<string, ExamResult>();
        results.forEach(result => {
            const existing = studentBestResults.get(result.student_id);
            if (!existing || (result.percentage || 0) > (existing.percentage || 0)) {
                studentBestResults.set(result.student_id, result);
            }
        });

        const bestResults = Array.from(studentBestResults.values())
            .sort((a, b) => (a.rank || 999) - (b.rank || 999));

        // Create PDF
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(examTitle || 'Exam Results', 14, 20);

        // Add metadata
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy HH:mm')}`, 14, 28);
        doc.text(`Total Students: ${bestResults.length}`, 14, 34);

        // Prepare table data
        const tableData = bestResults.map(r => [
            r.rank || '-',
            r.full_name || 'Unknown',
            r.email,
            r.obtained_marks || 0,
            r.total_marks || 0,
            r.percentage ? `${r.percentage}%` : '-'
        ]);

        // Add table
        if (typeof autoTable === 'function') {
            autoTable(doc, {
                startY: 40,
                head: [['Rank', 'Name', 'Email', 'Score', 'Total', 'Percentage']],
                body: tableData,
                theme: 'grid',
                headStyles: {
                    fillColor: [79, 70, 229], // Indigo
                    textColor: 255,
                    fontStyle: 'bold',
                    halign: 'center'
                },
                styles: {
                    fontSize: 9,
                    cellPadding: 3
                },
                columnStyles: {
                    0: { halign: 'center', cellWidth: 15 }, // Rank
                    1: { cellWidth: 50 }, // Name
                    2: { cellWidth: 60 }, // Email
                    3: { halign: 'right', cellWidth: 20 }, // Score
                    4: { halign: 'right', cellWidth: 20 }, // Total
                    5: { halign: 'center', cellWidth: 25 }  // Percentage
                },
                alternateRowStyles: {
                    fillColor: [245, 247, 250]
                }
            });
        } else {
            console.error("AutoTable is not a function", autoTable);
            alert("PDF Export failed: Library not loaded correctly. Please try again.");
            return;
        }

        // Download
        doc.save(`${examTitle.replace(/[^a-z0-9]/gi, '_')}_results_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "graded":
                return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-none">Completed</Badge>;
            case "submitted":
                return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-none">Submitted</Badge>;
            case "in_progress":
                return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-none">In Progress</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/exams">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                {examTitle || "Exam Results"}
                            </h1>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                View and analyze student performance
                            </p>
                        </div>
                    </div>
                    <div className="self-end md:self-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    disabled={loading || results.length === 0}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/10"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    <span className="hidden sm:inline">Export Results</span>
                                    <span className="sm:hidden">Export</span>
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={exportToXLSX} className="cursor-pointer">
                                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                                    Excel (XLSX)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={exportToPDF} className="cursor-pointer">
                                    <FileText className="w-4 h-4 mr-2 text-red-600" />
                                    PDF Document
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Students</p>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">{results.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Avg. Score</p>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                                        {results.length > 0
                                            ? Math.round(results.reduce((sum, r) => sum + (r.percentage || 0), 0) / results.length)
                                            : 0}%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Top Score</p>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                                        {results.length > 0 ? Math.max(...results.map(r => r.percentage || 0)) : 0}%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Table */}
                <Card className="border-none shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-black text-slate-900 dark:text-white">
                                Student Results
                            </CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    placeholder="Search students..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                            </div>
                        ) : filteredResults.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                                    <Users className="w-8 h-8 text-slate-400" />
                                </div>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">No results found</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b border-slate-100 dark:border-slate-800 hover:bg-transparent">
                                            <TableHead className="font-black text-slate-700 dark:text-slate-300">Rank</TableHead>
                                            <TableHead className="font-black text-slate-700 dark:text-slate-300">Student</TableHead>
                                            <TableHead className="font-black text-slate-700 dark:text-slate-300">Status</TableHead>
                                            <TableHead className="font-black text-slate-700 dark:text-slate-300">Submitted</TableHead>
                                            <TableHead className="text-right font-black text-slate-700 dark:text-slate-300">Score</TableHead>
                                            <TableHead className="text-right font-black text-slate-700 dark:text-slate-300">Percentage</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedResults.map((result) => (
                                            <TableRow
                                                key={result.attempt_id}
                                                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                            >
                                                <TableCell>
                                                    <div className={cn(
                                                        "flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm",
                                                        result.rank === 1 && "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-yellow-500/25",
                                                        result.rank === 2 && "bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-lg shadow-slate-400/25",
                                                        result.rank === 3 && "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-500/25",
                                                        result.rank && result.rank > 3 && "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                                    )}>
                                                        {result.rank || "-"}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="w-10 h-10 border-2 border-slate-200 dark:border-slate-700">
                                                            <AvatarImage src={result.avatar_url || ""} />
                                                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                                                                {result.full_name?.charAt(0) || result.email?.charAt(0) || "?"}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold text-slate-900 dark:text-white">
                                                                {result.full_name || "Unknown User"}
                                                            </p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                                {result.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(result.status)}</TableCell>
                                                <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                                                    {result.submitted_at
                                                        ? format(new Date(result.submitted_at), "MMM d, yyyy HH:mm")
                                                        : "-"}
                                                </TableCell>
                                                <TableCell className="text-right font-semibold text-slate-900 dark:text-white">
                                                    {result.obtained_marks !== null ? (
                                                        <span>
                                                            {result.obtained_marks}{" "}
                                                            <span className="text-slate-400 text-xs">/ {result.total_marks}</span>
                                                        </span>
                                                    ) : "-"}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {result.percentage !== null ? (
                                                        <Badge
                                                            className={cn(
                                                                "font-bold",
                                                                result.percentage >= 70 && "bg-gradient-to-r from-emerald-500 to-teal-600 text-white",
                                                                result.percentage >= 40 && result.percentage < 70 && "bg-gradient-to-r from-amber-500 to-orange-600 text-white",
                                                                result.percentage < 40 && "bg-gradient-to-r from-rose-500 to-red-600 text-white"
                                                            )}
                                                        >
                                                            {result.percentage}%
                                                        </Badge>
                                                    ) : "-"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>

                    {/* Pagination Controls */}
                    {!loading && filteredResults.length > 0 && (
                        <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    Showing <span className="font-semibold text-slate-900 dark:text-white">{startIndex + 1}</span> to{" "}
                                    <span className="font-semibold text-slate-900 dark:text-white">{Math.min(endIndex, filteredResults.length)}</span> of{" "}
                                    <span className="font-semibold text-slate-900 dark:text-white">{filteredResults.length}</span> results
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className="dark:border-slate-700"
                                    >
                                        First
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="dark:border-slate-700"
                                    >
                                        Previous
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }

                                            return (
                                                <Button
                                                    key={pageNum}
                                                    variant={currentPage === pageNum ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={cn(
                                                        "w-10",
                                                        currentPage === pageNum
                                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                                            : "dark:border-slate-700"
                                                    )}
                                                >
                                                    {pageNum}
                                                </Button>
                                            );
                                        })}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="dark:border-slate-700"
                                    >
                                        Next
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                        className="dark:border-slate-700"
                                    >
                                        Last
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
