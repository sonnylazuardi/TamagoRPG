export function resizeLayout(
    resize: string,
    width: number,
    height: number
): { width?: number; height?: number } {
    if (resize === "horizontal") {
        return { height }
    } else if (resize === "vertical") {
        return { width }
    } else if (resize === "none") {
        return { width, height }
    } else {
        return {}
    }
}
