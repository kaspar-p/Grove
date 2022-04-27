import { NamedNode, DataFactory, Store } from "n3";

import uris, { model } from "./uris";
import { quadToString } from "./utils";
import { getOne } from "./n3";
import { ShapeAtom } from "./ShapeAtom";
import { SetterOrUpdater } from "recoil";

const { literal, quad, namedNode } = DataFactory;

type Setter = (f: (curr: number) => number) => void;
function updateSetter(setter: Setter) {
  setter((curr: number) => curr + 1);
}

export function changeBoxColor(
  store: Store,
  setter: SetterOrUpdater<number>,
  boxTerm: NamedNode,
  newColor: string
) {
  store.removeQuad(
    quad(
      boxTerm,
      uris.hasColor,
      literal(getOne(store, boxTerm, uris.hasColor) as string)
    )
  );
  store.addQuad(quad(boxTerm, uris.hasColor, literal(newColor)));
  updateSetter(setter);
}

export function addNewBox(
  store: Store,
  setter: SetterOrUpdater<number>,
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
  store.addQuads(quads);

  // Add the <boxTerm> :hasProperty :hasColor into the model as a possible triple to subscribe to
  const newBoxShapeAtom = ShapeAtom.make(newBox.value);
  model.box._addNew(newBoxShapeAtom);
  updateSetter(setter);
}
