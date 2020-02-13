import React from 'react';
import { css } from "@emotion/core"
import Variables from "./jss/Variables"


const Loader = () => {
    return (
        <div css={flexo}>
        <div css={loader}>
             <svg viewBox="0 0 80 80">
        <circle id="test" cx="40" cy="40" r="32"></circle>
    </svg>
        </div>
        </div>
    );
};

export default Loader;



// styling

const flexo = css`
position: absolute !important;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`

const loader = css`
    display: inline-block;
    margin: 0 16px;
    &, * {
        box-sizing: border-box;
        &:before,
        &:after {
            box-sizing: border-box;
        }
    }
    --path: ${Variables.black_bg};
    --dot: ${Variables.dark_base_color};
    --duration: 1.5s;
       width: 44px;
    height: 44px;
    position: relative;
    &:before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        display: block;
        background: var(--dot);
        top: 37px;
        left: 19px;
        transform: translate(-18px, -18px);
        animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    svg {
        display: block;
        width: 100%;
        height: 100%;
        rect,
        polygon,
        circle {
            fill: none;
            stroke: var(--path);
            stroke-width: 10px;
            stroke-linejoin: round;
            stroke-linecap: round;
        }
        polygon {
            stroke-dasharray: 145 calc(221 - 145) 145 calc(221 - 145);
            stroke-dashoffset: 0;
            animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        rect {
            stroke-dasharray: calc(256 / 4 * 3) calc(256 / 4) calc(256 / 4 * 3) calc(256 / 4);
            stroke-dashoffset: 0;
            animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        circle {
            stroke-dasharray: calc(200 / 4 * 3) calc(200 / 4) calc(200 / 4 * 3) calc(200 / 4);
            stroke-dashoffset: 75;
            animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
    }
    &.triangle {
        width: 48px;
        &:before {
            left: 21px;
            transform: translate(-10px, -18px);
            animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
    }

    @keyframes pathTriangle {
        33% {
            stroke-dashoffset: 74;
        }
        66% {
            stroke-dashoffset: 147;
        }
        100% {
            stroke-dashoffset: 221;
        }
    }

    @keyframes dotTriangle {
        33% {
            transform: translate(0, 0);
        }
        66% {
            transform: translate(10px, -18px);
        }
        100% {
            transform: translate(-10px, -18px);
        }
    }

    @keyframes pathRect {
        25% {
            stroke-dashoffset: 64;
        }
        50% {
            stroke-dashoffset: 128;
        }
        75% {
            stroke-dashoffset: 192;
        }
        100% {
            stroke-dashoffset: 256;
        }
    }

    @keyframes dotRect {
        25% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(18px, -18px);
        }
        75% {
            transform: translate(0, -36px);
        }
        100% {
            transform: translate(-18px, -18px);
        }
    }

    @keyframes pathCircle {
        25% {
            stroke-dashoffset: 125;
        }
        50% {
            stroke-dashoffset: 175;
        }
        75% {
            stroke-dashoffset: 225;
        }
        100% {
            stroke-dashoffset: 275;
        }
    }
`

