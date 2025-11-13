import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import content from "@/content/digesto-ai";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0"
      aria-label={content.brandName}
    >
      <Image src={logo} alt={`${content.brandName} logo`} width={32} height={32} />
    </Link>
  );
}
