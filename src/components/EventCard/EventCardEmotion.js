import { css } from "@emotion/core";
import WbVariables from "../jss/variables";
import { shadows} from "../jss/cvcss";

const eventCard = css`
  height: 80vh;
  background: #fff;
    box-shadow: ${shadows.theme_shadow};
  border-radius: 0 0 50px 50px;
`

export default eventCard;