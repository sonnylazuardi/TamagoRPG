import { capitalize } from "../../../base"
import { ControlType, PropertyControls } from "framer"

export function breakpointControls(breakpoints: {
    names: string[]
    values: number[]
}): PropertyControls {
    const breakpointComponents = breakpoints.names.map(breakpoint => ({
        [breakpoint]: {
            type: ControlType.ComponentInstance,
            title: capitalize(breakpoint),
        },
    }))

    return Object.assign({}, ...breakpointComponents)
}
