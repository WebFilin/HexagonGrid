import React from "react";
import hexCordinate from "../../../state/hexCordinate";
import { action } from "mobx";

function BtnRandom() {
  return (
    <div>
      <button onClick={action(() => hexCordinate.handlerBtnRandom())}>
        Рандом
      </button>
    </div>
  );
}

export default BtnRandom;
