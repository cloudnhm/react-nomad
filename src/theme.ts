import { DefaultTheme } from "styled-components";
import "styled-components"

declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
    }
}

export const theme: DefaultTheme = {
    bgColor: "#2f3640",
    textColor: "#f5f6fa",
    accentColor: "#44bd32", 
}