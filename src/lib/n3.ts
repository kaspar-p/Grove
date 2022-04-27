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
