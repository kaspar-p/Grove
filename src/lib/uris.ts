import n3 from "n3";

import QuadAtom from "./QuadAtom";

const { namedNode, quad } = n3.DataFactory;

const uris = {
  type: namedNode("type"),
  Presentation: namedNode("Presentation"),
  Slide: namedNode("Slide"),
  Box: namedNode("Box"),
  has: namedNode("has"),
  hasProperty: namedNode("hasProperty"),
  hasColor: namedNode("hasColor"),
  hasX: namedNode("hasX"),
  hasY: namedNode("hasY"),
  hasWidth: namedNode("hasWidth"),
  hasHeight: namedNode("hasHeight"),
};

// Model
const presentationHasSlide = QuadAtom.make(
  quad(uris.Presentation, uris.has, uris.Slide)
);
const slideHasBox = QuadAtom.make(quad(uris.Slide, uris.has, uris.Box));
const boxHasPropertyX = QuadAtom.make(
  quad(uris.Box, uris.hasProperty, uris.hasX)
);
const boxHasPropertyY = QuadAtom.make(
  quad(uris.Box, uris.hasProperty, uris.hasY)
);
const boxHasPropertyWidth = QuadAtom.make(
  quad(uris.Box, uris.hasProperty, uris.hasWidth)
);
const boxHasPropertyHeight = QuadAtom.make(
  quad(uris.Box, uris.hasProperty, uris.hasHeight)
);
const boxHasPropertyColor = QuadAtom.make(
  quad(uris.Box, uris.hasProperty, uris.hasColor)
);

interface Model {
  [x: string]: QuadAtom;
}
export const model: Model = {
  presentationHasSlide,
  slideHasBox,
  boxHasPropertyX,
  boxHasPropertyY,
  boxHasPropertyWidth,
  boxHasPropertyHeight,
  boxHasPropertyColor,
};

export default uris;
