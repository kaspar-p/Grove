import { Store, NamedNode, Quad, Literal, DataFactory } from "n3";
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
  //   console.log("About to update QuadAtom");
  if (quadToString(quad) in setterMap) {
    // console.log("Updating quad: ", quad);
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
  // Only remove the type quad if there aren't any other quads of that type
  const subjectTypes = n3Store.getObjects(
    quadToRemove.subject,
    uris.type,
    quadToRemove.graph
  );
  const objectTypes = n3Store.getObjects(
    quadToRemove.object,
    uris.type,
    quadToRemove.graph
  );
  if (subjectTypes.length > 0 && objectTypes.length > 0) {
    const subjectType = subjectTypes.pop() as NamedNode;
    const objectType = objectTypes.pop() as NamedNode; // If it has a type, it's a NamedNode
    const typeQuad = quad(
      subjectType,
      quadToRemove.predicate,
      objectType,
      quadToRemove.graph
    );

    updateQuadAtom(setterMap, typeQuad);
  }

  n3Store.removeQuad(quadToRemove);
  updateQuadAtom(setterMap, quadToRemove);
};
