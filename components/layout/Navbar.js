"use client";

import Link from "next/link";
import { UserMenu } from "../Menu/UserMenu";
import { GuestMenu } from "../Menu/GuestMenu";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-blue-500 px-4 py-3 text-white md:border-b md:px-20">
            <div className="flex items-center gap-10">
                <Link href="/">
                    <h1>NextJs JWT</h1>
                </Link>
            </div>
            <UserMenu />
            <GuestMenu />
        </nav>
    );
}
