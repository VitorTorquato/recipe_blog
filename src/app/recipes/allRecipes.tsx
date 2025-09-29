"use client";

import { Filter, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

import { Pagination } from "@/components/pagination/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchRecipes } from "@/lib/utils/actions/getRecipes";
import { RecipeCard } from "../../components/receipes/recipe-card/recipe-card";
import { getRecipesData } from "../../lib/utils/actions/get-data";
import type { HomeRecipeProps } from "../../lib/utils/home.type";

const RECIPES_PER_PAGE = 9;

const categories = [
  { value: "all", label: "All Categories" },
  { value: "breakfast", label: "Breakfast" },
  { value: "appetizers", label: "Appetizers" },
  { value: "mains", label: "Mains" },
  { value: "desserts", label: "Desserts" },
];

const difficulties = [
  { value: "all", label: "All Difficulties" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export function AllRecipesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [recipes, setRecipes] = useState<HomeRecipeProps>({ objects: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    searchParams.get("difficulty") || "all",
  );
  const currentPage = Number.parseInt(searchParams.get("page") || "1");

  // Load recipes data
  useEffect(() => {
    async function loadRecipes() {
      try {
        setLoading(true);
        const recipesData = await getRecipesData();
        setRecipes(recipesData);
      } catch (err) {
        setError('Failed to load recipes');
        console.error('Error loading recipes:', err);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);
  // Filter recipes based on search and filters
  const filteredRecipes = useMemo(() => {
    let filteredData = [...recipes.objects];

    // Apply search filter
    if (searchQuery.trim()) {
      filteredData = searchRecipes(filteredData, searchQuery.trim());
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filteredData = filteredData.filter(
        (recipe) => recipe.metadata.category === selectedCategory,
      );
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      filteredData = filteredData.filter(
        (recipe) => recipe.metadata.difficulty?.toLowerCase() === selectedDifficulty,
      );
    }

    return filteredData;
  }, [recipes.objects, searchQuery, selectedCategory, selectedDifficulty]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + RECIPES_PER_PAGE,
  );

  // Update URL when filters change
  const updateUrl = (
    newSearchQuery: string,
    newCategory: string,
    newDifficulty: string,
    page = 1,
  ) => {
    const params = new URLSearchParams();

    if (newSearchQuery.trim()) params.set("search", newSearchQuery.trim());
    if (newCategory !== "all") params.set("category", newCategory);
    if (newDifficulty !== "all") params.set("difficulty", newDifficulty);
    if (page > 1) params.set("page", page.toString());

    const queryString = params.toString();
    const newUrl = queryString ? `/recipes?${queryString}` : "/recipes";

    router.push(newUrl, { scroll: false });
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(searchQuery, selectedCategory, selectedDifficulty);
  };

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateUrl(searchQuery, category, selectedDifficulty);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    updateUrl(searchQuery, selectedCategory, difficulty);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    router.push("/recipes");
  };

  // Update state when URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "all");
    setSelectedDifficulty(searchParams.get("difficulty") || "all");
  }, [searchParams]);

  const hasActiveFilters =
    searchQuery.trim() ||
    selectedCategory !== "all" ||
    selectedDifficulty !== "all";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Error Loading Recipes</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            All Recipes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of delicious recipes from breakfast
            to dessert
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <form
            onSubmit={handleSearch}
            className="flex gap-4 max-w-2xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Filter by:
              </span>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedDifficulty}
              onValueChange={handleDifficultyChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} size="sm">
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            {filteredRecipes.length === 0 ? (
              "No recipes found matching your criteria"
            ) : (
              <>
                Showing {startIndex + 1}-
                {Math.min(
                  startIndex + RECIPES_PER_PAGE,
                  filteredRecipes.length,
                )}{" "}
                of {filteredRecipes.length} recipe
                {filteredRecipes.length !== 1 ? "s" : ""}
              </>
            )}
          </p>
        </div>

        {/* Recipes Grid */}
        {paginatedRecipes.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {paginatedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.slug}
                  recipe={recipe}
                  showCategory={true}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/recipes"
              searchParams={searchParams}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                No recipes found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
