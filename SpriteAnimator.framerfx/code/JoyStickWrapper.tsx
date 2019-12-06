import * as React from "react";
import { Data, Animatable, Draggable } from "framer";
import { JoyStick, isBack } from "./JoyStick";

export const JoyStickData = Data({
  x: 0,
  y: 0,
  dragging: false
});

export class JoyStickWrapper extends React.Component<any> {
  private latestX = 0;
  private latestY = 0;
  private step = 5;
  private interval: number;
  state = {
    sx: 0,
    sy: 0,
    mx: 0,
    my: 0,
    dragging: false
  };

  render() {
    const { sx, sy, mx, my, dragging } = this.state;
    return (
      <>
        <Draggable
          style={wrapperStyle}
          onDragWillMove={this.onTouchStart}
          onMove={this.onMove}
          onDragEnd={this.onTouchEnd}
        />
        {dragging ? (
          <JoyStick
            x={sx}
            y={sy}
            moveX={mx}
            moveY={my}
            width={200}
            height={200}
          />
        ) : null}
      </>
    );
  }

  private onTouchStart = e => {
    const {
      devicePoint: { x, y }
    } = e;

    const { dragging } = this.state;
    if (!dragging) {
      this.setState({ sx: x, sy: y, dragging: true });
      JoyStickData.dragging = true;
    }
    if (this.props.onTouchStart) this.props.onTouchStart();
  };

  private onMove = ({ x, y }) => {
    const dx = x - this.latestX;
    const dy = y - this.latestY;
    const validDiff = Math.abs(dx) >= 1 || Math.abs(dy) >= 1;

    this.latestX = x;
    this.latestY = y;

    window.clearInterval(this.interval);

    if (!validDiff || isBack(x, y)) {
      return;
    }
    JoyStickData.x += dx;
    JoyStickData.y += dy;

    this.interval = window.setInterval(() => {
      if (Math.abs(x) > Math.abs(y)) {
        const step = this.step * (x < 0 ? -1 : 1);
        JoyStickData.x += step;
      } else {
        const step = this.step * (y < 0 ? -1 : 1);
        JoyStickData.y += step;
      }
    }, 16);
    this.setState({ mx: x, my: y });
  };

  private onTouchEnd = () => {
    if (this.props.onTouchEnd) this.props.onTouchEnd();
    JoyStickData.dragging = false;
    this.setState({ dragging: false, mx: 0, my: 0 });
  };
}

const wrapperStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  background: "transparent"
};
