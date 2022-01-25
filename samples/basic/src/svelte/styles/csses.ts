import {textColors, colors, contentPadding} from './args'

export const clickable = `
    cursor: pointer;
    text-decoration: underline;
`

export const button = `
    color: ${textColors.onHilight};
    background: ${colors.blue};
    border: none;
    padding-left: ${contentPadding.middle};
    padding-right: ${contentPadding.middle};
    padding-top: ${contentPadding.normal};
    padding-bottom: ${contentPadding.normal};
    cursor: pointer;
    border-radius: 3px;
`