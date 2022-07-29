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
      const hexID = Number(hex.id);

      // Ищем соседий выбранного узла
      const elemHexagonGrid = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      // Составляем узел графа
      const peak = { id: hexID, group: elemHexagonGrid };
      hexCordinate.getHexGroup(peak);
    }
  }, [hex]);

  return <></>;
});

export default GetHexGroup;
