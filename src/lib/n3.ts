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
  if (quadToAdd.object.termType === "Literal") {
    // If the object is a literal, then there is no type,
    //    and the predicate must be broken down into a property

    // ----------------------------------------------
    //  No one subscribes to this sort of thing yet!
    // ----------------------------------------------
    // TODO: handle undefined subjectType
    // TODO: handle subjects without a type
    // const subjectType = n3Store
    //     .getObjects(quadToAdd.subject, uris.type, quadToAdd.graph)
    //     ?.pop() as NamedNode;
    // const typePropertyQuad = quad(
    //     subjectType,
    //     uris.hasProperty,
    //     quadToAdd.predicate
    // );
    // updateQuadAtom(setterMap, typePropertyQuad);

    // :box1 :hasColor "blue"
    // :box1 :hasProperty :hasColor

    const propertyQuad = quad(
      quadToAdd.subject,
      uris.hasProperty,
      quadToAdd.predicate
    );
    updateQuadAtom(setterMap, propertyQuad);
  } else {
    // When adding a quad, do:
    //    - Reduce the subject and object into their types, given that their types are already in the model
    //        - Under the assumption that each thing only has a single type
    //    - Add the quads themselves
    //        - Somehow update the atom number? Idk how to get the setter in here
    //    - Add the "base" quads and update their atom numbers
    //        - Somehow update the atom number? Idk how to get the setter in here
    const subjectTypes = n3Store.getObjects(
      quadToAdd.subject,
      uris.type,
      quadToAdd.graph
    );
    const objectTypes = n3Store.getObjects(
      quadToAdd.object,
      uris.type,
      quadToAdd.graph
    );
    if (subjectTypes.length > 0 && objectTypes.length > 0) {
      const subjectType = subjectTypes.pop() as NamedNode;
      const objectType = objectTypes.pop() as NamedNode | Literal;
      const typeQuad = quad(
        subjectType,
        quadToAdd.predicate,
        objectType,
        quadToAdd.graph
      );

      updateQuadAtom(setterMap, typeQuad);
    }
  }

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
