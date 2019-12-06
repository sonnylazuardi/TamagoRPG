import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

const SpriteAnimator = require("react-sprite-animator")

export function Sprite(props) {
    const { spriteImage, walking, ...rest } = props

    const [isWalking, setIsWalking] = React.useState(walking)

    React.useEffect(() => {
        setIsWalking(walking)
    }, [walking])

    return (
        <Frame {...rest} background="transparent" size="100%">
            <SpriteAnimator
                width={66}
                height={66}
                sprite={spriteImage}
                shouldAnimate={isWalking}
                fps={10}
                startFrame={0}
                stopLastFrame={false}
                reset={!isWalking}
            />
        </Frame>
    )
}

Sprite.defaultProps = {
    walking: false,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Sprite, {
    walking: {
        title: "Walking",
        type: ControlType.Boolean,
    },
    spriteImage: {
        title: "Sprite Image",
        type: ControlType.Image,
    },
})
