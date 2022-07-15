import React from "react";

function CheckHexNeighbours({ arrCordinate, checkHex }) {

// console.log(arrCordinate)
// console.log(checkHex);

  if (checkHex) {

   //  checkHex.target.style.fill = "yellowgreen";
   //  checkHex.target.style.fillOpacity = 0.8;

   //  const hexVert = Number(checkHex.getAttribute("vertical"));
   //  const hexHoriz = Number(checkHex.getAttribute("horizontal"));

   //  const result = arrCordinate.filter((elem) => {
   //    return (
   //      (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert) ||
   //      (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert + 1) ||
   //      (elem.vertical === hexVert + 1 && elem.horizontal === hexHoriz) ||
   //      (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert) ||
   //      (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert - 1) ||
   //      (elem.vertical === hexVert - 1 && elem.horizontal === hexHoriz)
   //    );
   //  });

   //  console.log(result);
   
  }

  return <div></div>;
}

export default CheckHexNeighbours;
