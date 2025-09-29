// "use client";

// import { Search } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import type React from "react";
// import { useEffect, useRef, useState } from "react";
// import type { RecipeProps } from "@/components/receipes/receipes";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { searchRecipes } from '../../lib/utils/actions/getRecipes';

// interface SearchSuggestionsProps {
//   onSearch?: (query: string) => void;
//   placeholder?: string;
//   className?: string;
// }

// export function SearchSuggestions({
//   onSearch,
//   placeholder = "Search recipes...",
//   className = "",
// }: SearchSuggestionsProps) {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<RecipeProps[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (query.trim().length > 1) {
//       const results = searchRecipes(query.trim()).slice(0, 5);
//       setSuggestions(results);
//       setIsOpen(results.length > 0);
//       setSelectedIndex(-1);
//     } else {
//       setSuggestions([]);
//       setIsOpen(false);
//       setSelectedIndex(-1);
//     }
//   }, [query]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (query.trim()) {
//       if (selectedIndex >= 0 && suggestions[selectedIndex]) {
//         window.location.href = `/recipe/${suggestions[selectedIndex].id}`;
//       } else {
//         if (onSearch) {
//           onSearch(query.trim());
//         } else {
//           window.location.href = `/recipes?search=${encodeURIComponent(query.trim())}`;
//         }
//       }
//       setIsOpen(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (!isOpen) return;

//     switch (e.key) {
//       case "ArrowDown":
//         e.preventDefault();
//         setSelectedIndex((prev) =>
//           prev < suggestions.length - 1 ? prev + 1 : prev,
//         );
//         break;
//       case "ArrowUp":
//         e.preventDefault();
//         setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
//         break;
//       case "Enter":
//         e.preventDefault();
//         if (selectedIndex >= 0 && suggestions[selectedIndex]) {
//           window.location.href = `/recipe/${suggestions[selectedIndex].id}`;
//         } else {
//           handleSubmit(e);
//         }
//         break;
//       case "Escape":
//         setIsOpen(false);
//         setSelectedIndex(-1);
//         inputRef.current?.blur();
//         break;
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     const colors = {
//       breakfast: "bg-orange-100 text-orange-800",
//       appetizers: "bg-purple-100 text-purple-800",
//       mains: "bg-blue-100 text-blue-800",
//       desserts: "bg-pink-100 text-pink-800",
//     };
//     return (
//       colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
//     );
//   };

//   return (
//     <div ref={searchRef} className={`relative ${className}`}>
//       <form onSubmit={handleSubmit} className="flex items-center space-x-2">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input
//             ref={inputRef}
//             type="search"
//             placeholder={placeholder}
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={handleKeyDown}
//             onFocus={() =>
//               query.trim().length > 1 &&
//               suggestions.length > 0 &&
//               setIsOpen(true)
//             }
//             className="pl-10"
//             autoComplete="off"
//           />
//         </div>
//         <Button type="submit" size="sm" className="hidden md:flex">
//           Search
//         </Button>
//       </form>

//       {/* Search Suggestions Dropdown */}
//       {isOpen && suggestions.length > 0 && (
//         <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
//           <CardContent className="p-0">
//             <div className="max-h-80 overflow-y-auto">
//               {suggestions.map((recipe, index) => (
//                 <Link
//                   key={recipe.recipes.objects[0].metadata.title}
//                   href={`/recipe/${recipe.recipes.objects[0].slug}`}
//                   className={`flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b last:border-b-0 ${
//                     selectedIndex === index ? "bg-muted" : ""
//                   }`}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <div className="relative w-12 h-12 flex-shrink-0">
//                     <Image
//                       src={recipe.recipes.objects[0].metadata.image.url}
//                       alt={recipe.recipes.objects[0].metadata.title}
//                       fill
//                       className="object-cover rounded"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-medium text-foreground truncate">
//                       {recipe.recipes.objects[0].metadata.title}
//                     </h4>
//                     <div className="flex items-center gap-2 mt-1">
//                       <Badge
//                         variant="secondary"
//                         className={`text-xs capitalize ${getCategoryColor(recipe.recipes.objects[0].metadata.category)}`}
//                       >
//                         {recipe.recipes.objects[0].metadata.category}
//                       </Badge>
//                       {recipe.recipes.objects[0].metadata.cooktime && (
//                         <span className="text-xs text-muted-foreground">
//                           {recipe.recipes.objects[0].metadata.cooktime}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//               <div className="p-3 border-t bg-muted/50">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="w-full justify-start text-primary"
//                   onClick={() => {
//                     if (onSearch) {
//                       onSearch(query.trim());
//                     } else {
//                       window.location.href = `/recipes?search=${encodeURIComponent(query.trim())}`;
//                     }
//                     setIsOpen(false);
//                   }}
//                 >
//                   <Search className="h-4 w-4 mr-2" />
//                   Search for "{query}" in all recipes
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
