import { css } from "@emotion/core";

import { WbVariables } from "../jss/variables";

const fly_menu = css`
  .fly_wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    z-index: 9;
    opacity: 1;
    pointer-events: auto;
    transition: all 0.25s;
    .fly_content {
      height: 100%;
      width: 350px;
      background: #fff;
      transition: all 0.25s;
      overflow: auto;
      animation: fly 0.15s linear;
      position: relative;
      @include respondToBelow(sm) {
        width: 75%;
      }

      @include respondToBelow(xs) {
        width: 90%;
      }
      .header {
        padding: 15px;
        background: ${WbVariables.dark_base_color};
        color: #fff;
        position: sticky;
        top: 0;
        z-index: 9;
        @include blue_shadow;
      }
      ul.nav {
        li {
          padding: 10px 30px;
        }
      }
      li {
        width: 100%;
      }
    }
    &.right {
      .fly_content {
        animation: fly_right 0.15s linear;
        margin-right: 0;
        margin-left: auto;
        transform: translateX(0%);
      }
    }
  }
  @keyframes fly {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes fly_right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`

export default fly_menu;