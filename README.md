# grove

Grove is a proof-of-concept for subscriptable triples. It might move to subscriptable shapes at some point. For now, triples is good enough, since you can subscribe to a set of them.

## Usage

It is a CRA application, so just `npm install` and `npm run start`, and it will run itself in `localhost:3000`.

The main page was just a proof-of-concept for something that Slow Reveal never really had. Clicking "access existing deck" does nothing, and clicking "create new deck" brings you to the main meat of the app.

The blank gray box in the center of the screen is the slate. The two things the app current does are create new boxes, and change existing boxes colors. Double-clicking on the blank gray slate creates a new yellow box. Double-clicking on a box changes the color.

## How it works

Subscriptable triples are based on Recoil, Meta's solution for state management. Recoil allows you to subscribe to a single `atom` of data at a time, which has been used to represent a quad.

A component can subscribe to a set of QuadAtoms (which are a quad and corresponding atom) and whenever that is triggered, that the component updates.

It is a little complex to explain "whenever that is triggered", because there are different ways you can subscribe to a quad. Usually, when subscribing to something like `:slide1 :has :box1`, you don't really want to subscribe to that triple. You want to subscribe to triples LIKE `:slide1 :has <anything>`.

This is done by converting any triple to its "property triple", as it's called in the code. That is, adding a triple like `:slide1 :has :box1` triggers updates on quad atom that looks like `:slide1 :hasProperty :has`, and `:box1: :hasColor "yellow"` triggers the `:box1 :hasProperty :hasColor` quad atom.

In this way, a component can "listen" to some properties that exist on themselves. The useful thing is that React composition (components used within components), fits very nicely.

For example, having a Slide component be parameterized by their specific URI (like `:slide1`), can then listen to just the properties of THAT slide, and whenever a trigger happens (like the `:slide1 :hasProperty :has` quad atom getting triggered), they can re-render all of its boxes.

In the same way, a Box component can be parameterized with its URI to ensure that it is the ONLY one to rerender on `:box1 :hasProperty :hasColor` changes, to make sure that not every box is changed.

Technically the RenderBox component listens to more than the color of the box, but the app doesn't current support dragging or anything like that, so listening to x and y positions doesn't current do anything.

The way the quad atoms are found is through a global `model` variable. It is essentially a hashmap that maps quads to their quad atoms.

The way that triggering an update works is: subscribing is a hook, and gives you a setters output that is used. That setter map is a map from a quad to a function that triggers the quad's atom, which causes the component to re-render. That is, the setters map should get passed into some actions, and then eventually to `addQuadComplex` and `removeQuadComplex`.

The `complex` parts of these methods is they add/remove the quad from the store, but then also trigger the correct quad atom(s). There may be multiple. For example, when you change a box's color, it removes the `:box1 :hasColor "yellow"` triple and adds a `:box1 :hasColor "blue"` triple. It then updates the `:box1 :hasColor "yellow"` atom, the `:box1 :hasColor "blue"` atom, AND the `:box1 :hasProperty :hasColor` atom.

That allows for flexibility, for example if you had a different rendering scheme for "blue" boxes than you did for "yellow" boxes. Probably makes more sense for boolean options, where you can listen to ONLY the `true` path, or ONLY the `false` path. Never used this or done this but it seems like that'd be cool. Maybe unclear for traditional developers who expect something like a

```
const toRender = condition ? <ComponentA /> : <ComponentB />;
return toRender;
```

at the top of a boolean-dependent component, rather than two seemingly disconnected components that each depend on a different boolean path...

## Limitations

This relies heavily on the uniqueness of properties. There is some extra waste if you are listening to something like `:myThing :hasProperty gist:categorizedBy` since `gist:categorizedBy` is so widely used. There are ways to make it better, but this was sufficient for my use-case.

I also have no idea how I'd test this. I never even thought about it.

## Other documents

The subscriptable triples demo was originally called `grove`, because it was going to be the conceptual replacement for Slow Reveal. The docs that describe ideas that grove is meant to follow live in the `ontology-presenter/` repository (the Slow Reveal one) on GitHub, under `docs/`.
