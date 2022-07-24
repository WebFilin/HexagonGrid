import React from "react";
import hexCordinate from "../../../state/hexCordinate";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const BtnRandom = observer(() => {
  return (
    <div>
      <button onClick={ action(() => hexCordinate.handlerBtnRandom())}>Рандом</button>
    </div>
  );
});

export default BtnRandom;
