import React from 'react';
import {css} from '@emotion/core';
import  Variables from './jss/Variables';
import { timeFormat } from "../helpers/TimeStamp";

const slot_item = css`
    padding: 10px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 5px;
    position: relative;
    &:before{
        content: '';
        position: absolute;
        left: -14px;
        height: 0;
        width: 0;
        top: 15px;
        margin: auto;
        border: solid 8px transparent;
        border-right-color: rgb(255, 255, 255);
    }
    &:after{
        content: '';
        position: absolute;
        left: -32px;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        top: 15px;
        margin: auto;
        background: ${Variables.dark_base_color};
    }
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
        <li css={[slot_item, eventData.selectedFlag === "selected" ? slotSelected : null]}>
            <div css={slot_time}>
                {console.log(eventData)}
                <small>{timeFormat(eventData.time.start)} - {timeFormat(eventData.time.end)}</small>
            </div>
            <div css={slot_title}>
                {eventData.title}
            </div>
            <div css={slot_speakers}>
                {eventData.eventType == "talk" && (
                    <button onClick={() => selectEvent(eventData)}>select this</button>
                )}
            </div>
        </li>
    );
};

export default Slot;