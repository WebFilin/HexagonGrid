import React from "react";
import hexCordinate from "../../state/hexCordinate";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const Domain = observer(() => {
  const hex = toJS(hexCordinate.hexObj);

  React.useEffect(() => {
    const peakAndGroup = toJS(hexCordinate.peakAndGroup);

    if (hex && peakAndGroup) {
      console.log(peakAndGroup);
    }
  }, [hex]);

  return <></>;
});

export default Domain;
