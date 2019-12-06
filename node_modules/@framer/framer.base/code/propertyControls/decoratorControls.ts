import { iconControls } from "./iconControls"
import { ControlType, PropertyControls } from "framer"

export function decoratorControls(
    defaultDecorator: string = "Framer"
): PropertyControls {
    return {
        withStartDecorator: {
            type: ControlType.Boolean,
            title: "Icon (←)",
            defaultValue: false,
        },
        ...iconControls(
            defaultDecorator,
            false,
            "withStartDecorator",
            "iconStartDecorator"
        ),
        withEndDecorator: {
            type: ControlType.Boolean,
            title: "Icon (→)",
            defaultValue: false,
        },
        ...iconControls(
            defaultDecorator,
            false,
            "withEndDecorator",
            "iconEndDecorator"
        ),
    }
}
