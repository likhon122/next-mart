"use client";
import Logo from "@/app/assets/svgs/logo";
import { Button } from "../ui/button";
import { Heart, LogOut, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/UserContext";
import { logOutUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setIsLoading, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logOutUser();
    setUser(null);
    setIsLoading(true);
    router.push("/");
  };

  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <h1 className="text-2xl font-black flex items-center">
          <Logo />
          Next Mart
        </h1>
        <div className="max-w-md  grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
          />
        </div>
        <nav className="flex gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart />
          </Button>
          <Button variant="outline" className="rounded-full p-0 size-10">
            <ShoppingBag />
          </Button>
          {!user ? (
            <Link href="/login">
              <Button
                variant="outline"
                className="rounded-full p-4 cursor-pointer"
              >
                Login
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/create-shop">
                <Button
                  variant="outline"
                  className="rounded-full p-4 cursor-pointer"
                >
                  Create Shop
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
