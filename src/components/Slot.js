import React from 'react';
import {css} from '@emotion/core';

const slot_item = css`
    color: #666;
`

const slotSelected = css`
*{
    color: red;
}
`

const slot_time = css`
    color: #666;
`

const slot_title = css`
    color: #666;
`
const slot_speakers = css`
    color: #666;
`


const Slot = ({ eventData, selectEvent}) => {
    return (
        <div css={[slot_item, eventData.selectedFlag === "selected" ? slotSelected : null]}>
            <div css={slot_time}>
                {console.log(eventData)}
                {eventData.selectedFlag}
            </div>
            <div css={slot_title}>
                {eventData.title}
            </div>
            <div css={slot_speakers}>
                {eventData.eventType == "talk" && (
                    <button onClick={() => selectEvent(eventData)}>select this</button>
                )}
            </div>
        </div>
    );
};

export default Slot;