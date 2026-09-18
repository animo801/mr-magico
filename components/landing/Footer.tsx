import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-10 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <Logo />
        <p className="text-xs text-black/40">
          © {new Date().getFullYear()} Mr. Magico. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
