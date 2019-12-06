import * as React from "react"
import { Stack } from "framer"

export function centerLayout(
    props: any,
    children?: any,
    center: boolean = true
) {
    return props.placeholders === null && center ? (
        <Stack alignment="center" distribution="center" size="100%">
            {children}
        </Stack>
    ) : (
        children
    )
}
