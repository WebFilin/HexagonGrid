import React from "react";
import hexCordinate from "../../state/hexCordinate";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const Domain = observer(() => {
  const hexs = toJS(hexCordinate.arrHexObj);
  const hexsDomain = toJS(hexCordinate.arrHexGroup);

  React.useEffect(() => {
    // Создаем одномерный массив
    const arrHexsDomain = hexsDomain.flat();
    
    if (hexs) {
      hexs.filter((elemHex, index) => {
        arrHexsDomain.map((elemDomen) => {
          if (Number(elemHex.id) === elemDomen.id) {
            elemHex.style.fill = hexs[0].style.fill;
          } else {
            elemHex.style.fill = hexs[index].style.fill;
          }
        });
      });
    }
  }, [hexs, hexsDomain]);

  return <></>;
});

export default Domain;
