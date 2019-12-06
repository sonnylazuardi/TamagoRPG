import { ControlType, PropertyControls } from "framer"

export function resizeControls(
    defaultresize: string = "both",
    hidden: string | null = null
): PropertyControls {
    return {
        resize: {
            type: ControlType.Enum,
            title: "Resize",
            defaultValue: defaultresize,
            options: ["none", "both", "horizontal", "vertical"],
            optionTitles: [
                "None (Canvas)",
                "Both (Content)",
                "Horizontal (Content)",
                "Vertical (Content)",
            ],
            hidden: hidden ? props => !props[hidden] : () => false,
        },
    }
}
