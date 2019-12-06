import { Theme, themes, capitalize } from "../../../base"
import { ControlType, PropertyControls } from "framer"

export function themeControls(
    defaultTheme: Theme | string = themes.light,
    title: boolean = true,
    hidden: string | null = null
): PropertyControls {
    const themesNames = Object.keys(themes)

    return {
        theme: {
            type: ControlType.Enum,
            title: title ? "Theme" : " ",
            defaultValue: defaultTheme as string,
            options: themesNames,
            optionTitles: themesNames.map(themeName => capitalize(themeName)),
            hidden: hidden ? props => !props[hidden] : () => false,
        },
    }
}
