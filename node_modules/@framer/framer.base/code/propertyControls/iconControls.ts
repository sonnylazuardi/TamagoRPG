import { featherIcons } from "../../../base"
import { ControlType, PropertyControls } from "framer"

export function iconControls(
    defaultIcon: string = featherIcons[0],
    title: boolean = true,
    hidden: string | null = null,
    prop: string = "icon"
): PropertyControls {
    return {
        [prop]: {
            type: ControlType.Enum,
            title: title ? "Icon" : " ",
            defaultValue: defaultIcon,
            options: featherIcons,
            optionTitles: featherIcons.map(featherName =>
                featherName.replace(/([A-Z0-9])/g, " $1")
            ),
            hidden: hidden ? props => !props[hidden] : () => false,
        },
    }
}
