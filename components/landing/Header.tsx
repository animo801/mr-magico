import Link from "next/link";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4">
      <Logo />
      <Link
        href="#why-hire"
        className="rounded-lg bg-[#3653e3] px-5 py-2.5 text-sm font-black uppercase text-white lg:px-6 lg:py-2.5 lg:text-base"
      >
        Learn more
      </Link>
    </header>
  );
}
