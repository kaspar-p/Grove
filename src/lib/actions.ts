import { NamedNode, DataFactory, Store } from "n3";

import uris from "./uris";
import { getOne, SetterMap, addQuadComplex, removeQuadComplex } from "./n3";

const { literal, quad, namedNode } = DataFactory;

export function changeBoxColor(
  store: Store,
  setters: SetterMap,
  boxTerm: NamedNode,
  newColor: string
) {
  const qToRemove = quad(
    boxTerm,
    uris.hasColor,
    literal(getOne(store, boxTerm, uris.hasColor) as string)
  );
  const qToAdd = quad(boxTerm, uris.hasColor, literal(newColor));

  removeQuadComplex(store, setters, qToRemove);
  addQuadComplex(store, qToAdd, setters);
}

export function addNewBox(
  store: Store,
  setters: SetterMap,
  slide: NamedNode,
  clickX: number,
  clickY: number
) {
  console.log("Adding new box!");
  const newBoxID = "box" + Math.floor(Math.random() * 1000000);
  const newBox = namedNode(newBoxID);
  const quads = [
    quad(newBox, uris.type, uris.Box),
    quad(newBox, uris.hasX, literal(clickX)),
    quad(newBox, uris.hasY, literal(clickY)),
    quad(newBox, uris.hasWidth, literal(50)),
    quad(newBox, uris.hasHeight, literal(50)),
    quad(newBox, uris.hasColor, literal("yellow")),
    quad(slide, uris.has, newBox),
  ];

  quads.forEach((q) => {
    addQuadComplex(store, q, setters);
  });
}
