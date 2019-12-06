import { intents, capitalize } from "../../../base"
import { ControlType, PropertyControls } from "framer"

export function intentControls(
    defaultIntent: string = intents[0],
    title: boolean = true,
    hidden: string | null = null
): PropertyControls {
    return {
        intent: {
            type: ControlType.Enum,
            title: title ? "Intent" : " ",
            defaultValue: defaultIntent,
            options: intents,
            optionTitles: intents.map(pattern => capitalize(pattern)),
            hidden: hidden ? props => !props[hidden] : () => false,
        },
    }
}
