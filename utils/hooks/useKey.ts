import { useEffect, useState } from "react";

export default function useKeyPressed(key: KeyboardEvent["code"]) {
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === key) {
        event.preventDefault();
        setPressed(true);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === key) {
        event.preventDefault();
        setPressed(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("keyup", handleKeyUp, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener("keyup", handleKeyUp, false);
    };
  }, []);
  return pressed;
}
