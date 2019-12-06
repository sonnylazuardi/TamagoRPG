import { patterns, capitalize } from "../../../base"
import { ControlType, PropertyControls } from "framer"

export function patternControls(
    defaultPattern: string = patterns[0],
    title: boolean = true,
    hidden: string | null = null
): PropertyControls {
    return {
        pattern: {
            type: ControlType.Enum,
            title: title ? "Pattern" : " ",
            defaultValue: defaultPattern,
            options: patterns,
            optionTitles: patterns.map(pattern => capitalize(pattern)),
            hidden: hidden ? props => !props[hidden] : () => false,
        },
    }
}
