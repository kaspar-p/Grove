import { Quad } from "n3";
import { atom, RecoilState, useRecoilState, SetterOrUpdater } from "recoil";
import { quadToString } from "./utils";

class QuadAtom {
  quad: Quad;
  atom: RecoilState<number>;

  constructor(quad: Quad, atom: RecoilState<number>) {
    this.quad = quad;
    this.atom = atom;
  }

  static make(quad: Quad): QuadAtom {
    return new QuadAtom(
      quad,
      atom({
        key: quadToString(quad),
        default: 0,
      })
    );
  }
}

// This potentially leads to an issue where different hooks are being called on different renders - breaking the hooks rule as per Danny
export function useSubscribeTo(...quadAtoms: QuadAtom[]) {
  const setters: { [x: string]: SetterOrUpdater<number> } = {};
  quadAtoms.forEach((quadAtom) => {
    const [, setter] = useRecoilState(quadAtom.atom);
    setters[quadAtom.atom.key] = setter;
  });

  return setters;
}

export default QuadAtom;
