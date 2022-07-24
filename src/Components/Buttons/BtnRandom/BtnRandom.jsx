import React from "react";
import hexCordinate from "../../../state/hexCordinate";
import { observer } from "mobx-react-lite";

const BtnRandom = observer(() => {
  return (
    <div>
      <button onClick={() => hexCordinate.handlerBtnRandom()}>Рандом</button>
    </div>
  );
});

export default BtnRandom;
