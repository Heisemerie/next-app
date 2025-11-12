import processThread from "@/public/images/Process vs Thread.gif";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "./api/auth/authOptions";
import HeavyComponent from "./components/HeavyComponent";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="relative">
      <h1>Hello {session && <span>{session.user?.name}</span>}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
      {/* the Next.js Image component (built on html img element) automatically compresses and resizes images based on the device size */}
      <Image src={processThread} alt="processThread" />
      <HeavyComponent />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Homepage",
};
