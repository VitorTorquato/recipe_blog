"use client";

import { ChefHat, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SearchSuggestions } from "@/components/search-suggestions/searchSuggestions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const recipeCategories = [
  { name: "Breakfast", href: "/recipes/breakfast" },
  { name: "Appetizers", href: "/recipes/appetizers" },
  { name: "Mains", href: "/recipes/mains" },
  { name: "Desserts", href: "/recipes/desserts" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Recipe Blog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-foreground hover:text-primary transition-colors font-medium">
                Recipes
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {recipeCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link href="/recipes">All Recipes</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
          </nav>

          <div className="hidden md:block">
            <SearchSuggestions className="w-64" />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <div className="space-y-2">
                <span className="text-foreground font-medium">Recipes</span>
                <div className="pl-4 space-y-2">
                  {recipeCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/recipes"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Recipes
                  </Link>
                </div>
              </div>

              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <div className="pt-4">
                <SearchSuggestions />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
