import React from "react";
import hexCordinate from "../../state/hexCordinate";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const Domain = observer(() => {
  const hexs = toJS(hexCordinate.arrHexObj);
  const hexsDomain = toJS(hexCordinate.arrHexGroup);

  React.useEffect(() => {

   

    console.log(hexsDomain);




  }, [hexs, hexsDomain]);

  return <></>;
});

export default Domain;
