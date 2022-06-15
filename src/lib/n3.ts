import { Store, NamedNode, Quad, DataFactory } from "n3";
import { SetterOrUpdater } from "recoil";
import { quadToString } from "./utils";
import uris from "./uris";

const { quad } = DataFactory;

export const getOne = (
  store: Store,
  subject: NamedNode,
  predicate: NamedNode
) => {
  return store.getObjects(subject, predicate, null)?.pop()?.value;
};

export interface SetterMap {
  [x: string]: SetterOrUpdater<number>;
}

function updateQuadAtom(setterMap: SetterMap, quad: Quad) {
  if (quadToString(quad) in setterMap) {
    const updater = (curr: number) => curr + 1;
    setterMap[quadToString(quad)](updater);
  }
}

// In some way I want a component to SUBSCRIBE to a set of triples in the model.
// Such that if triples matching that triple in the model are added or deleted, the component is re-rendered.

export const addQuadComplex = (
  n3Store: Store,
  setterMap: SetterMap,
  quadToAdd: Quad
) => {
  const propertyQuad = quad(
    quadToAdd.subject,
    uris.hasProperty,
    quadToAdd.predicate
  );
  updateQuadAtom(setterMap, propertyQuad);

  n3Store.addQuad(quadToAdd);
  updateQuadAtom(setterMap, quadToAdd);
};

export const removeQuadComplex = (
  n3Store: Store,
  setterMap: SetterMap,
  quadToRemove: Quad
) => {
  const propertyQuad = quad(
    quadToRemove.subject,
    uris.hasProperty,
    quadToRemove.predicate
  );
  updateQuadAtom(setterMap, propertyQuad);

  n3Store.removeQuad(quadToRemove);
  updateQuadAtom(setterMap, quadToRemove);
};
