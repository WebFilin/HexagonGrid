import React from "react";
import hexCordinate from "../../state/hexCordinate";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const Domain = observer(() => {
  const hex = toJS(hexCordinate.hexObj);
  const hexGroup = toJS(hexCordinate.hexGroup);

  React.useEffect(() => {
    let peakNeighbours = {};
    if (hex && hexGroup) {
      // console.log(hexGroup);
      // console.log(hex.id);

      // peakNeighbours = { [hex.id]: hexGroup };

      // console.log(peakNeighbours);
    }
  }, [hex, hexGroup]);

  return <></>;
});

export default Domain;
