import { css } from "@emotion/core"

import { media, shadows } from "../jss/cvcss"
import Variables from "../jss/Variables"

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
    animation: fly 0.25s linear;
    .fly_content {
      height: 100%;
      width: 350px;
      background: #fff;
      transition: all 0.25s;
      overflow: auto;
      position: relative;
      display: flex;
      flex-direction: column;
      max-height: 100%;
      overflow: auto;
      ${media.xs} {
        width: 75%;
      }

      ${media.mn} {
        width: 90%;
      }
      .header {
        padding: 15px;
        background: ${Variables.dark_base_color};
        color: #fff;
        position: sticky;
        top: 0;
        z-index: 9;
        ${shadows.solid_shadow};
        &.trans {
          background: transparent;
        }
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
      animation: fly_right 0.25s linear;
      .fly_content {
        margin-right: 0;
        margin-left: auto;
      }
    }

    &.top {
      align-items: flex-start;
      animation: fly_top 0.25s linear;
      .fly_content {
        margin: 0;
        height: auto;
        width: 100%;
        align-self: flex-start;
        display: flex;
        flex-direction: column;
      }
    }
    &.bottom {
      align-items: flex-start;
      animation: fly_bottom 0.25s linear;
      .fly_content {
        margin: 0;
        height: auto;
        width: 100%;
        align-self: flex-end;
        display: flex;
        flex-direction: column;
      }
    }
  }
  @keyframes fly {
    from {
      padding-right: 100vw;
    }
    to {
      padding-right: 0;
    }
  }
  @keyframes fly_right {
    from {
      padding-left: 100vw;
    }
    to {
      padding-left: 0;
    }
  }

  @keyframes fly_top {
    from {
      padding-bottom: 100vh;
    }
    to {
      padding-bottom: 0;
    }
  }
  @keyframes fly_bottom {
    from {
      padding-top: 100vh;
    }
    to {
      padding-top: 0;
    }
  }
`

export default fly_menu
