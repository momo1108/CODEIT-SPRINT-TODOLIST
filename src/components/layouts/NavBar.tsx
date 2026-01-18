import Image from "next/image";
import { Container } from "./Container";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="bg-white border-b border-slate-200">
      <Container className="flex items-center justify-between h-16">
        <Link href="/">
          <Image
            className="hidden md:inline"
            src="/images/doit_large.png"
            alt="Logo"
            width={151}
            height={40}
          />
          <Image
            className="inline md:hidden"
            src="/images/doit_small.png"
            alt="Logo"
            width={71}
            height={40}
          />
        </Link>
      </Container>
    </nav>
  );
}
