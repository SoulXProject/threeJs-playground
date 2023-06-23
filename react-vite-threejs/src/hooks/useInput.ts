import { useEffect, useState } from "react";

type InputType = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  shift: boolean;
  jump: boolean;
};

export const useInput = () => {
  //  input은 다 false로 default
  const [input, setInput] = useState<InputType>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });

  const keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    ShiftLeft: "shift",
    Space: "jump",
  };

  const findKey = (key: string) => keys[key];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    setInput((m) => ({ ...m, [findKey(e.code)]: true }));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    setInput((m) => ({ ...m, [findKey(e.code)]: false }));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return input;
};
