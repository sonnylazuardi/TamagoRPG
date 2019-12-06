import { Data, Override } from "framer";

import { JoyStickData } from "./JoyStickWrapper";

const data = Data({
  username: "",
  message: "",
  sendMessage: false,
});

export function onDrag(): Override {
  return {
    left: JoyStickData.x / 10,
    top: JoyStickData.y / 10,
    walking: JoyStickData.dragging,
  };
}

export function UsernameText(): Override {
  return {
    value: data.username,
    onValueChange(value) {
      data.username = value;
    },
  };
}

export function LoginButton(): Override {
  return {
    disabled: data.username == "",
  };
}

export function ButtonLink(): Override {
  return {
    style: {
      display: data.username == "" ? "none" : "block",
    },
  };
}

export function UsernameLabel(): Override {
  return {
    text: data.username,
  };
}

export function ChatText(): Override {
  return {
    value: data.message,
    onValueChange(value) {
      data.message = value;
    },
  };
}

export function ButtonSendChat(): Override {
  return {
    onClick() {
      data.sendMessage = true;
    },
  };
}

export function Player(): Override {
  return {
    username: data.username,
    posLeft: JoyStickData.x / 10 + 50,
    posTop: JoyStickData.y / 10 + 50,
    walking: JoyStickData.dragging,
    message: data.message,
    sendMessage: data.sendMessage,
    onMessageSent() {
      data.message = "";
      data.sendMessage = false;
    },
  };
}
