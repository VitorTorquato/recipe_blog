"use client";

import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { RecipesProps } from "@/lib/utils/home.type";
import { getRecipesData } from "../../lib/utils/actions/get-data";
import {
  getPopularSearchTerms,
  searchRecipes,
} from "../../lib/utils/actions/getRecipes";

interface SearchSuggestionsProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchSuggestions({
  onSearch,
  placeholder = "Search recipes...",
  className = "",
}: SearchSuggestionsProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<RecipesProps[]>([]);
  const [popularTerms, setPopularTerms] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recipes, setRecipes] = useState<RecipesProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recipes data on component mount
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const recipesData = await getRecipesData();
        setRecipes(recipesData.objects);
        const terms = getPopularSearchTerms(recipesData.objects);
        setPopularTerms(terms);
      } catch (err) {
        console.error("Error loading recipes:", err);
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchTerm: string) => {
      if (searchTerm.trim().length > 1) {
        const results = searchRecipes(recipes, searchTerm.trim()).slice(0, 5);
        setSuggestions(results);
        setIsOpen(results.length > 0 || searchTerm.trim().length > 0);
        setSelectedIndex(-1);
      } else if (searchTerm.trim().length === 0) {
        setSuggestions([]);
        setIsOpen(false);
        setSelectedIndex(-1);
      } else {
        setSuggestions([]);
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    },
    [recipes],
  );

  // Debounce search queries
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        window.location.href = `/recipe/${suggestions[selectedIndex].slug}`;
      } else {
        if (onSearch) {
          onSearch(query.trim());
        } else {
          window.location.href = `/recipes?search=${encodeURIComponent(query.trim())}`;
        }
      }
      setIsOpen(false);
    }
  };

  const handlePopularTermClick = (term: string) => {
    setQuery(term);
    if (onSearch) {
      onSearch(term);
    } else {
      window.location.href = `/recipes?search=${encodeURIComponent(term)}`;
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const maxIndex = query.trim()
      ? suggestions.length - 1
      : popularTerms.length - 1;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          if (query.trim() && suggestions[selectedIndex]) {
            window.location.href = `/recipe/${suggestions[selectedIndex].slug}`;
          } else if (!query.trim() && popularTerms[selectedIndex]) {
            handlePopularTermClick(popularTerms[selectedIndex]);
          }
        } else {
          handleSubmit(e);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      breakfast: "bg-orange-100 text-orange-800",
      appetizers: "bg-purple-100 text-purple-800",
      mains: "bg-blue-100 text-blue-800",
      desserts: "bg-pink-100 text-pink-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-1">
          {loading ? (
            <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          )}
          <Input
            ref={inputRef}
            type="search"
            placeholder={error ? "Search unavailable" : placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query.trim().length > 1 && suggestions.length > 0) {
                setIsOpen(true);
              }
            }}
            className="pl-10"
            autoComplete="off"
            disabled={loading || !!error}
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="hidden md:flex"
          disabled={loading || !!error}
        >
          Search
        </Button>
      </form>

      {/* Search Suggestions Dropdown */}
      {isOpen && !error && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {/* Recipe Suggestions */}
              {suggestions.length > 0 && (
                <>
                  {suggestions.map((recipe, index) => (
                    <Link
                      key={recipe.slug}
                      href={`/recipe/${recipe.slug}`}
                      className={`flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b last:border-b-0 ${
                        selectedIndex === index ? "bg-muted" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={recipe.metadata.image.url}
                          alt={recipe.metadata.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">
                          {recipe.metadata.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className={`text-xs capitalize ${getCategoryColor(recipe.metadata.category)}`}
                          >
                            {recipe.metadata.category}
                          </Badge>
                          {recipe.metadata.cooktime && (
                            <span className="text-xs text-muted-foreground">
                              {recipe.metadata.cooktime}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                  {query.trim() && (
                    <div className="p-3 border-t bg-muted/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-primary"
                        onClick={() => {
                          if (onSearch) {
                            onSearch(query.trim());
                          } else {
                            window.location.href = `/recipes?search=${encodeURIComponent(query.trim())}`;
                          }
                          setIsOpen(false);
                        }}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search for "{query}" in all recipes
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Popular Search Terms (shown when no query) */}
              {!query.trim() && popularTerms.length > 0 && (
                <>
                  <div className="p-3 border-b bg-muted/30">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Popular searches
                    </h4>
                  </div>
                  {popularTerms.map((term, index) => (
                    <button
                      key={term}
                      type="button"
                      className={`w-full text-left p-3 hover:bg-muted transition-colors border-b last:border-b-0 capitalize ${
                        selectedIndex === index ? "bg-muted" : ""
                      }`}
                      onClick={() => handlePopularTermClick(term)}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{term}</span>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* No results message */}
              {query.trim() && suggestions.length === 0 && (
                <div className="p-6 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No recipes found for "{query}"</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      if (onSearch) {
                        onSearch(query.trim());
                      } else {
                        window.location.href = `/recipes?search=${encodeURIComponent(query.trim())}`;
                      }
                      setIsOpen(false);
                    }}
                  >
                    Search all recipes
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
          <CardContent className="p-4 text-center text-muted-foreground">
            <p className="text-sm">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
