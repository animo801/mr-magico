import Link from "next/link";
import Image from "next/image";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center" aria-label="Mr. Magico home">
      <Image
        src="/images/logo.png"
        alt="Mr. Magico"
        width={65}
        height={53}
        className="h-[53px] w-[65px] object-contain"
        priority
      />
    </Link>
  );
}
