import { NamedNode } from "n3";

interface Shape {
  _addInstanceAtom: () => {};
  new: () => {};
  delete: (instanceUri: NamedNode) => {};
  edit: (instanceUri: NamedNode) => {};
}

interface ParameterizedShape {
  a: any;
}

export class Model {
  box: any;
  slide: any;
}
