import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

// Use the environment variable correctly in Next.js
const socket = io(process.env.NEXT_PUBLIC_API_URL);

function Emote() {
  const [emoji, setEmoji] = useState("😏");

  useEffect(() => {
    socket.on("new_emoji", (data) => {
      setEmoji(data);
    });

    return () => {
      socket.off("new_emoji"); // Cleanup listener
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center gap-4 flex-col">
      <h1 className="text-3xl lowercase font-bold">emote.io</h1>
      <Card className="text-6xl p-3">{emoji}</Card>
      <ShowEmotes setEmoji={setEmoji} />
    </main>
  );
}

function ShowEmotes({ setEmoji }) {
  const emojis = ["😀", "😁", "🤣", "😂", "😎", "🙄"];

  const handleBtnClick = (emoji) => {
    setEmoji(emoji);
    socket.emit("emoji", emoji);
  };

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {emojis.map((emoji) => (
        <Button
          key={emoji}
          variant="flat"
          onPress={() => handleBtnClick(emoji)}
        >
          <p className="text-xl">{emoji}</p>
        </Button>
      ))}
    </div>
  );
}

export default Emote;
