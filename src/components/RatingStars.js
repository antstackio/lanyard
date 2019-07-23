import React, {useState} from 'react';
import { css } from "@emotion/core"
import {media} from "./jss/cvcss"
import Variables from "./jss/Variables"

import star_off from "../images/star-off.svg"

const RatingStars = ({large}) => {

  const [stars, setStars] = useState([1, 2, 3, 4, 5])
    return (
      <span css={[ratingCard, large ? largeRating : null]} className="stars">
        {stars.map(star => (
            <img src={star_off} key={star} />
        ))}
    </span>
    );
};

export default RatingStars;

const ratingCard = css`
  img {
    height: 25px;
    display: inline-block;
    ~ img {
      margin-left: 5px;
    }
  }
`
const largeRating = css`
  img {
    width: 50px;
    ${media.mn}{
      width: 35px;
    }
    ~ img {
      margin-left: 10px;
    }
  }
`