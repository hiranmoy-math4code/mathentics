"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface StudentFilterBarProps {
    onSearchChange: (search: string) => void;
    onPriceFilter: (priceTypes: string[]) => void;
    onSortChange: (sort: string) => void;
    activeFilters: {
        search: string;
        priceTypes: string[];
        sort: string;
    };
}

export default function StudentFilterBar({
    onSearchChange,
    onPriceFilter,
    onSortChange,
    activeFilters,
}: StudentFilterBarProps) {
    const [search, setSearch] = useState(activeFilters.search);
    const [selectedPriceTypes, setSelectedPriceTypes] = useState<string[]>(activeFilters.priceTypes);
    const [sortBy, setSortBy] = useState(activeFilters.sort);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        onSearchChange(value);
    };

    const handlePriceToggle = (priceType: string) => {
        const newPriceTypes = selectedPriceTypes.includes(priceType)
            ? selectedPriceTypes.filter(p => p !== priceType)
            : [...selectedPriceTypes, priceType];
        setSelectedPriceTypes(newPriceTypes);
        onPriceFilter(newPriceTypes);
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
        onSortChange(value);
    };

    const clearAllFilters = () => {
        setSearch("");
        setSelectedPriceTypes([]);
        setSortBy("newest");
        onSearchChange("");
        onPriceFilter([]);
        onSortChange("newest");
    };

    const activeFilterCount = selectedPriceTypes.length + (search ? 1 : 0);

    return (
        <div className="space-y-4">
            {/* Search and Filter Row */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search test series..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                    />
                    {search && (
                        <button
                            onClick={() => handleSearchChange("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4 text-slate-400" />
                        </button>
                    )}
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                    {/* Price Filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="gap-2 border-slate-200 dark:border-slate-700"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Price
                                {selectedPriceTypes.length > 0 && (
                                    <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                                        {selectedPriceTypes.length}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Filter by Price</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={selectedPriceTypes.includes("free")}
                                onCheckedChange={() => handlePriceToggle("free")}
                            >
                                Free
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={selectedPriceTypes.includes("paid")}
                                onCheckedChange={() => handlePriceToggle("paid")}
                            >
                                Paid
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Sort Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="gap-2 border-slate-200 dark:border-slate-700"
                            >
                                Sort
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortChange}>
                                <DropdownMenuRadioItem value="newest">
                                    Newest First
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="oldest">
                                    Oldest First
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="price-low">
                                    Price: Low to High
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="price-high">
                                    Price: High to Low
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="popular">
                                    Most Popular
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Clear Filters */}
                    {activeFilterCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="text-slate-600 dark:text-slate-400"
                        >
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-wrap gap-2"
                >
                    {search && (
                        <Badge
                            variant="secondary"
                            className="gap-1 pl-2 pr-1 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                        >
                            "{search}"
                            <button
                                onClick={() => handleSearchChange("")}
                                className="ml-1 hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded-full p-0.5"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    )}
                    {selectedPriceTypes.map(priceType => (
                        <Badge
                            key={priceType}
                            variant="secondary"
                            className="gap-1 pl-2 pr-1 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        >
                            {priceType}
                            <button
                                onClick={() => handlePriceToggle(priceType)}
                                className="ml-1 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full p-0.5"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
