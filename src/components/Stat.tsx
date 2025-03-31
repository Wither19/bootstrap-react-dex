import React, { useEffect, useState } from "react";

import { NumberFlowElement } from "@number-flow/react";

const statColors: string[] = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#71E1B3"];
const statThresholds: number[] = [40, 65, 80, 105, 170];

const getStatColors = (stat: number) => {
  for (let s = 0; s < statThresholds.length; s++) {
    if (s === 0) {
      if (stat <= statThresholds[s]) {
        return statColors[statThresholds[s]];
      }
    } else if (s == statThresholds.length - 1) {
      if (stat >= statThresholds[s]) {
        return statColors[statThresholds[s]];
      }
    } else {
      if (stat >= statThresholds[s] && stat < statThresholds[s + 1]) {
        return statColors[statThresholds[s]];
      }
    }
  }
};

function Stat(props) {
  return (
    <>
      <div
        style={{
          backgroundColor: getStatColors(
            props.statName == "cp" ? props.statNumber / 26 : props.statNumber
          ),
          width:
            props.statName == "cp"
              ? Math.floor((props.statNumber / 6672) * 500)
              : Math.floor((props.statNumber / 255) * 500),
        }}
        className="bar"
      ></div>
    </>
  );
}

export default Stat;
