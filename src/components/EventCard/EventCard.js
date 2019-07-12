import React, {useState} from 'react';
import { css } from "@emotion/core";
import eventCard from "./EventCardEmotion"
import { button_style } from "../jss/cvcss";
import { px_bg } from "../jss/cvcss"

const EventCard = () => {
    const [started, setStarted] = useState(false);

    return (
        <React.Fragment>
            {started ? (
                <div css={[eventCard, px_bg]}>
                </div>
            ):(
                <div className="inv" css={[eventCard, px_bg]}>
                </div>
            )}
        </React.Fragment>
    );
};

export default EventCard;