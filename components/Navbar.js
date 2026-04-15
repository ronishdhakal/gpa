import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/see"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            SEE Calculator
          </Link>
          {/* <Link
            href="/neb"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            NEB Calculator
          </Link> */}
        </nav>
      </div>
    </header>
  );
}