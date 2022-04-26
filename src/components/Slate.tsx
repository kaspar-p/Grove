import * as React from "react";
import { Box } from "@mui/material";
import { DataFactory, NamedNode, Store } from "n3";

import { quadToString } from "../lib/utils";
import { getOne } from "../lib/n3";
import uris, { model } from "../lib/uris";
import { useSubscribeTo } from "../lib/QuadAtom";
import { changeBoxColor, addNewBox } from "../lib/actions";

const { quad, namedNode } = DataFactory;

// Store
const store = new Store();

const presentation1 = namedNode("presentation1");
const slide1 = namedNode("slide1");

store.addQuads(Object.values(model).map((quadAtom) => quadAtom.quad));
store.addQuads([
  quad(slide1, uris.type, uris.Slide),
  quad(presentation1, uris.type, uris.Presentation),
  quad(presentation1, uris.has, slide1),
]);

interface RenderBoxPropTypes {
  boxTerm: NamedNode;
}
function RenderBox({ boxTerm }: RenderBoxPropTypes) {
  console.log("Rendering:", boxTerm.value);

  const height = getOne(store, boxTerm, uris.hasHeight);
  const width = getOne(store, boxTerm, uris.hasWidth);
  const y = getOne(store, boxTerm, uris.hasY);
  const x = getOne(store, boxTerm, uris.hasX);
  const color = getOne(store, boxTerm, uris.hasColor);

  // TODO: Somehow parameterize <object> :hasProperty <property> triples
  // To take something for the <object> without creating the atom every time...
  const hasPropertyMap = (subject: NamedNode, usedPredicate: NamedNode) => {
    const propertyQuad = quad(subject, uris.hasProperty, usedPredicate);
    return model[quadToString(propertyQuad)];
  };
  const setters = useSubscribeTo(
    hasPropertyMap(boxTerm, uris.hasColor),
    hasPropertyMap(boxTerm, uris.hasX),
    hasPropertyMap(boxTerm, uris.hasY)
  );

  return (
    <Box
      sx={{
        position: "absolute",
        height: height + "px",
        width: width + "px",
        left: x + "px",
        top: y + "px",
        backgroundColor: color,
      }}
      onDoubleClick={(event) => {
        event.stopPropagation();
        event.preventDefault();

        const colors = [
          "yellow",
          "brown",
          "blue",
          "gray",
          "pink",
          "orange",
          "black",
          "white",
          "green",
          "lightgreen",
          "purple",
          "goldenrod",
          "red",
          "violet",
        ].filter((potentialColor) => potentialColor !== color);

        const newColor = colors[Math.floor(Math.random() * colors.length)];
        console.log(
          `Box ${boxTerm.value} got clicked! Changing color to ${newColor}!`
        );
        changeBoxColor(store, setters, boxTerm, newColor);
      }}
    />
  );
}

// Create 1000s of triples/boxes that:
//  1. remove hard-coding
//  2. if it really is fast

function Slate() {
  console.log("Rendering: slide1!");
  const setters = useSubscribeTo(model.slideHasBox);

  return (
    <Box
      flexGrow={1}
      sx={{ backgroundColor: "lightgray", position: "relative" }}
      onDoubleClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const X = event.clientX - rect.left;
        const Y = event.clientY - rect.top;
        addNewBox(store, setters, slide1, X - 25, Y - 25);
      }}
    >
      {store.getObjects(slide1, uris.has, null).map((boxTerm) => (
        <RenderBox key={boxTerm.value} boxTerm={boxTerm as NamedNode} />
      ))}
    </Box>
  );
}

export default Slate;