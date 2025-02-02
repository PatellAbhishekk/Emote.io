"use client";

import { HeroUIProvider } from "@heroui/react";
import Emote from "@/components/Emote";

export default function Home() {
  return (
    <div>
      <HeroUIProvider>
        <Emote />
      </HeroUIProvider>
    </div>
  );
}
