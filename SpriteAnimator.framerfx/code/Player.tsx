import * as React from "react";
import {
  Frame,
  addPropertyControls,
  ControlType,
  Stack,
  RenderTarget,
} from "framer";
//@ts-ignore
const io = require("socket.io-client");

const ROOM_NAME = "TamagoRPG";
const DEFAULT_SERVER_URL = "https://figma-chat.ph1p.dev/";
const INIT = "INIT";
const CONNECTED = "CONNECTED";
const ERROR = "ERROR";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function Player(props) {
  const [status, setStatus] = React.useState(INIT);
  const [online, setOnline] = React.useState([]);
  const [initPos, setInitPos] = React.useState({ top: 0, left: 0 });
  const [top, setTop] = React.useState(0);
  const [left, setLeft] = React.useState(0);
  const [userPos, setUserPos] = React.useState({});
  const [mySocket, setMySocket] = React.useState(null);
  const [chatStack, setChatStack] = React.useState([]);
  let timerChatStack;

  React.useEffect(() => {
    const myTop = initPos.top + props.posTop;
    const myLeft = initPos.left + props.posLeft;
    const walking = props.walking ? "w" : "s";
    setTop(myTop);
    setLeft(myLeft);

    if (mySocket) {
      mySocket.emit("set user", {
        name: props.username,
        color: `${myTop},${myLeft},${walking}`,
        url: props.serverUrl,
      });
    }
  }, [props.posTop, props.posLeft, props.walking, initPos]);

  React.useEffect(() => {
    if (props.sendMessage) {
      if (props.onMessageSent) {
        console.log("SEND", props.message);
        if (mySocket) {
          mySocket.emit("chat message", {
            roomName: ROOM_NAME,
            message: props.message,
          });
        }

        const newChatStack = [
          ...chatStack,
          {
            message: props.message,
            self: true,
            user: { name: props.username },
            timer: 2,
          },
        ];

        setChatStack(newChatStack);

        props.onMessageSent();
      }
    }
  }, [props.message, props.sendMessage]);

  React.useEffect(() => {
    if (mySocket) {
      mySocket.on("chat message", data => {
        const newChatStack = [...chatStack, { ...data, timer: 2 }];
        setChatStack(newChatStack);
      });

      timerChatStack && clearInterval(timerChatStack);
      timerChatStack = setInterval(() => {
        let myChatStack = chatStack.map(item => ({
          ...item,
          timer: item.timer - 1,
        }));

        myChatStack = myChatStack.filter(item => item.timer >= 0);
        console.log("stack", myChatStack);

        setChatStack(myChatStack);
      }, 1000);

      return () => {
        clearInterval(timerChatStack);
      };
    }
  }, [mySocket, chatStack]);

  React.useEffect(() => {
    if (
      RenderTarget.current() !== RenderTarget.canvas &&
      RenderTarget.current() !== RenderTarget.thumbnail
    ) {
      const socket = io(props.serverUrl, {
        reconnectionAttempts: 3,
        forceNew: true,
        transports: ["websocket"],
      });

      const initPos = {
        top: getRandomInt(50, 400),
        left: getRandomInt(-20, 200),
      };

      setInitPos(initPos);

      setTop(initPos.top);
      setLeft(initPos.left);

      socket.on("connected", () => {
        setStatus(CONNECTED);

        setMySocket(socket);

        socket.emit("join room", ROOM_NAME);
        socket.emit("set user", {
          name: props.username,
          color: `${initPos.top},${initPos.left},s`,
          url: DEFAULT_SERVER_URL,
        });
      });

      socket.on("connect_error", () => {
        setStatus(ERROR);
      });

      socket.on("reconnect_error", () => {
        setStatus(ERROR);
      });

      socket.on("join leave message", data => {
        console.log("JOIN LEAVE", data);
      });

      socket.on("online", data => {
        setOnline(data);
      });
    }
  }, []);

  const selfChat = chatStack.find(item => item.self);

  return (
    <Frame size="100%" background="transparent">
      <Frame background="transparent" y={top} x={left} width={100} height={100}>
        {selfChat &&
          React.cloneElement(props.chatBubble && props.chatBubble[0], {
            text: selfChat.message,
            style: {
              position: "absolute",
              top: -50,
              left: 60,
            },
          })}
        <Stack width="100%">
          {React.cloneElement(props.sprite && props.sprite[0], {
            walking: props.walking,
          })}
          <Frame
            background="transparent"
            style={{ fontFamily: "Silkscreen" }}
            width="100%"
            height={32}
          >
            {props.username}
          </Frame>
        </Stack>
      </Frame>
      {online
        .filter(player => player.name !== props.username)
        .map((player: any, index: number) => {
          const pos = player.color.split(",");
          const myTop = parseInt(pos[0]);
          const myLeft = parseInt(pos[1]);
          const walking = pos[2] === "w";

          const myChat = chatStack.find(item => item.user.name === player.name);

          return (
            <Frame
              key={index}
              background="transparent"
              y={myTop}
              x={myLeft}
              width={100}
              height={100}
            >
              {myChat &&
                React.cloneElement(props.chatBubble && props.chatBubble[0], {
                  text: myChat.message,
                  style: {
                    position: "absolute",
                    top: -50,
                    left: 60,
                  },
                })}
              <Stack width="100%">
                {React.cloneElement(props.sprite && props.sprite[0], {
                  walking: walking,
                })}
                <Frame
                  background="transparent"
                  style={{ fontFamily: "Silkscreen" }}
                  width="100%"
                  height={32}
                >
                  {player.name}
                </Frame>
              </Stack>
            </Frame>
          );
        })}
    </Frame>
  );
}

Player.defaultProps = {
  username: "",
  walking: false,
  serverUrl: DEFAULT_SERVER_URL,
};

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Player, {
  sprite: {
    title: "Sprite",
    type: ControlType.ComponentInstance,
  },
  chatBubble: {
    title: "Chat Bubble",
    type: ControlType.ComponentInstance,
  },
  username: {
    title: "Username",
    type: ControlType.String,
  },
  serverUrl: {
    title: "Server URL",
    type: ControlType.String,
  },
});
