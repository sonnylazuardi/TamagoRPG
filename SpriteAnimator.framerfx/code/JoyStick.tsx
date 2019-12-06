import * as React from "react"
import { Draggable, Data, Animatable } from "framer"

interface Props {
    x: number
    y: number
    width: number
    height: number
    moveX?: number
    moveY?: number
}

export class JoyStick extends React.Component<Props> {
    render() {
        const { x, y, width, height, moveX = 0, moveY = 0 } = this.props

        return (
            <div
                style={{
                    ...JoyStickStyle,
                    width,
                    height,
                    left: x,
                    top: y,
                }}
            >
                <div style={wrapperStyle}>
                    <div style={stickWrapperStyle}>
                        <div
                            style={{
                                ...stickStyle,
                                transform: `translate3d(${moveX}px, ${moveY}px, 0)`,
                            }}
                        />
                    </div>
                    <div style={originPointStyle} />
                </div>
            </div>
        )
    }
}

export function isBack(x, y) {
    return !Number.isInteger(x) || !Number.isInteger(y)
}

const JoyStickStyle: React.CSSProperties = {
    position: "relative",
    transform: "translate3d(-50%, -50%, 0)",
}

const wrapperStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    border: "10px solid #FFC420",
}

const stickWrapperStyle: React.CSSProperties = {
    position: "relative",
    width: "50px",
    height: "50px",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
}

const stickStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    borderRadius: "50%",
    backgroundColor: "#238CFF",
    zIndex: 2,
}

const originPointStyle: React.CSSProperties = {
    position: "absolute",
    width: "50px",
    height: "50px",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.2,
    backgroundColor: "#238CFF",
    zIndex: -1,
}
