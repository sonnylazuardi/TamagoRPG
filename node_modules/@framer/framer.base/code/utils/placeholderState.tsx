import * as React from "react"
import { CSSProperties } from "react"
import { Theme, parseColor } from "../../../base"
import { Stack, Color } from "framer"

interface Props {
    theme: Theme
    title?: string
    label?: string
    error?: boolean
}

const textStyles: CSSProperties = {
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    wordWrap: "normal",
}

export function placeholderState({ theme, title, label, error }: Props) {
    const color = Color(parseColor(theme.color[error ? "error" : "secondary"]))

    return (
        <Stack
            direction="vertical"
            alignment="center"
            distribution="center"
            size="100%"
            gap={4}
            padding={12}
            background={Color.alpha(color, 0.12)}
            radius="calc(4px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1))"
            border={`calc(1px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1)) dashed ${Color.alpha(
                color,
                0.32
            ).toValue()}`}
        >
            {title && (
                <h5
                    style={{
                        ...textStyles,
                        color: color.toValue(),
                        fontSize:
                            "calc(13px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1))",
                        fontWeight: 500,
                        marginBottom:
                            label &&
                            "calc(6px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1))",
                    }}
                >
                    {title}
                </h5>
            )}
            {label && (
                <p
                    style={{
                        ...textStyles,
                        color: color.toValue(),
                        fontSize:
                            "calc(12px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1))",
                    }}
                >
                    {label}
                </p>
            )}
        </Stack>
    )
}
