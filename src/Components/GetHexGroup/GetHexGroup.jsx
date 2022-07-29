import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexCordinate from "../../state/hexCordinate";

const GetHexGroup = observer(() => {
  //   Выбранный хекс получаем или при клике или рандомом
  let hex = toJS(hexCordinate.hexObj);

  // Ищем соседий хекса
  React.useMemo(() => {
    if (hex) {
      const hexVert = Number(hex.getAttribute("vertical"));
      const hexHoriz = Number(hex.getAttribute("horizontal"));

      // Ищем соседий выбранного узла
      const elemHexagonGrid = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      // Составляем узел графа
      hexCordinate.getHexGroup(elemHexagonGrid);
    }
  }, [hex]);

  return <></>;
});

export default GetHexGroup;
