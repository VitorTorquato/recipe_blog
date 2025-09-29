// import { Navigation } from "@/components/navigation";
// import { RecipeGrid } from "@/components/recipe-card";
// import { getRecipesByCategory } from "@/lib/recipes-data";
// import { notFound } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// interface CategoryPageProps {
//   params: {
//     category: string;
//   };
// }

// const categoryNames = {
//   breakfast: "Breakfast",
//   appetizers: "Appetizers",
//   mains: "Main Dishes",
//   desserts: "Desserts",
// };

// const categoryDescriptions = {
//   breakfast: "Start your day right with these delicious breakfast recipes",
//   appetizers: "Perfect starters and small bites for any occasion",
//   mains: "Hearty and satisfying main course recipes",
//   desserts: "Sweet treats and indulgent desserts to end your meal",
// };

// export default function RecipesByCategory({ params }: CategoryPageProps) {
//   const { category } = params;

//   if (!Object.keys(categoryNames).includes(category)) {
//     notFound();
//   }

//   const recipes = getRecipesByCategory(category);
//   const categoryName = categoryNames[category as keyof typeof categoryNames];
//   const categoryDescription =
//     categoryDescriptions[category as keyof typeof categoryDescriptions];

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />

//       <div className="container mx-auto px-4 py-8">
//         {/* Category Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
//             {categoryName}
//           </h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
//             {categoryDescription}
//           </p>
//           <Button asChild variant="outline">
//             <Link href="/recipes">View All Recipes</Link>
//           </Button>
//         </div>

//         {/* Recipes Grid */}
//         {recipes.length > 0 ? (
//           <RecipeGrid recipes={recipes} showCategory={false} />
//         ) : (
//           <div className="text-center py-12">
//             <div className="max-w-md mx-auto">
//               <h3 className="text-xl font-semibold mb-2 text-foreground">
//                 No recipes found
//               </h3>
//               <p className="text-muted-foreground mb-6">
//                 We don't have any {categoryName.toLowerCase()} recipes yet, but
//                 check back soon!
//               </p>
//               <Button asChild>
//                 <Link href="/recipes">Browse All Recipes</Link>
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
