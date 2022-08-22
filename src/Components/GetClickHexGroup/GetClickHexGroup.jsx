import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexHandler from "../../store/hexHandler";

const GetHexGroup = observer(() => {
  //   Выбранный хекс получаем или при клике или рандомом
  let hex = toJS(hexHandler.hexClick);

  // Обработчик клика ищем его соседей
  React.useEffect(() => {
    if (hex) {
      const hexVert = Number(hex.getAttribute("vertical"));
      const hexHoriz = Number(hex.getAttribute("horizontal"));
      const hexID = Number(hex.id);

      // Ищем соседий выбранного узла
      const getNeighbors = hexHandler.getNeighborsHex(hexVert, hexHoriz);

      // Составляем узел графа
      const peak = { id: hexID, group: [...getNeighbors] };
      hexHandler.getHexGroup(peak);
    }
  }, [hex]);

  return <></>;
});

export default GetHexGroup;
