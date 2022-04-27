import { Quad } from "n3";
import { atom, RecoilState, useRecoilState, SetterOrUpdater } from "recoil";
import { quadToString } from "./utils";

export class ShapeAtom {
  name: string;
  atom: RecoilState<number>;

  constructor(name: string, atom: RecoilState<number>) {
    this.name = name;
    this.atom = atom;
  }

  static make(name: string): ShapeAtom {
    return new ShapeAtom(
      name,
      atom({
        key: name,
        default: 0,
      })
    );
  }
}

// This potentially leads to an issue where different hooks are being called on different renders - breaking the hooks rule as per Danny
export function useSubscribeTo(shapeAtom: ShapeAtom) {
  const [, setter] = useRecoilState(shapeAtom.atom);
  return setter;
}
