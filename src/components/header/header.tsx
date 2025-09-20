import Link from "next/link";

export function Header() {
  return (
    <header className="w-full py-3.5 z-50 sticky top-0 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/60">
      <div className="container mx-auto px-2 flex items-center justify-between text-background">
        <h1>Logo</h1>

        <nav className="flex items-center space-x-4">
          <Link href="#">Home</Link>
          <Link href="#">about</Link>
          <Link href="#">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
