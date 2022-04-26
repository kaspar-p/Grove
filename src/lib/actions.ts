import { NamedNode, DataFactory, Store } from "n3";

import uris, { model } from "./uris";
import { quadToString } from "./utils";
import { getOne, SetterMap, addQuadComplex, removeQuadComplex } from "./n3";
import QuadAtom from "./QuadAtom";

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
  addQuadComplex(store, setters, qToAdd);
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
    addQuadComplex(store, setters, q);
  });

  // Add the <boxTerm> :hasProperty :hasColor into the model as a possible triple to subscribe to
  const newModelTriple = QuadAtom.make(
    quad(newBox, uris.hasProperty, uris.hasColor)
  );
  model[quadToString(newModelTriple.quad)] = newModelTriple;
}
