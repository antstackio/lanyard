import React from "react";
import _ from "lodash";

export function timeFormat(timeStamp) {
  const dt = new Date(timeStamp);
  return dt.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}

export function dateFormat(timeStamp, param) {
  const dateArray = [];
  const present = new Date();
  const currentDate = present.getDate();
  const dt = new Date(timeStamp);
  param.map(str => {
    if (str === "day") {
      dateArray.push(dt.toDateString().split(" ")[0]);
    }
    if (str === "month") {
      dateArray.push(dt.toDateString().split(" ")[1]);
    }
    if (str === "date") {
      dateArray.push(dt.toDateString().split(" ")[2]);
    }
    if (str === "year") {
      dateArray.push(dt.toDateString().split(" ")[3]);
    }
    return null;
  });
  const addedDate = parseInt(dateArray[_.indexOf(param, "date")]);
  if (currentDate === addedDate) {
    return (
      <span className="dateFormat">
        <span className="date">Today</span>
      </span>
    );
  } else if (currentDate - addedDate === 1) {
    return (
      <span className="dateFormat">
        <span className="date">Yesterday</span>
      </span>
    );
  } else {
    return (
      <span className="dateFormat">
        {dateArray.map((content, i) => (
          <span className={param[i]} key={i}>
            {content}
          </span>
        ))}
      </span>
    );
  }
}

export function dayName(timeStamp) {
  const dt = new Date(timeStamp);
  const dayName = dt.toDateString().split(" ")[0];
  return dayName;
}

export function monthName(timeStamp) {
  const dt = new Date(timeStamp);
  const monthName = dt.toDateString().split(" ")[1];
  return monthName;
}

export function dateNum(timeStamp) {
  const dt = new Date(timeStamp);
  const dateNum = dt.toDateString().split(" ")[2];
  return dateNum;
}

export function yearNum(timeStamp) {
  const dt = new Date(timeStamp);
  const yearNum = dt.toDateString().split(" ")[3];
  return yearNum;
}

export function slashFormat(timeStamp) {
  const dt = new Date(timeStamp);
  return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
}
