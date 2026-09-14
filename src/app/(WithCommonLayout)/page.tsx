"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const userInfo = useUser();

  console.log(userInfo);

  return (
    <div>
      Welcome to Home Page
      <div>
        <Button>Hi</Button>
      </div>
    </div>
  );
}
