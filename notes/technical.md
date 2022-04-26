# Technical

### Canvas

- Regular absolutely-positioned boxes like current Slow Reveal
  - Pros: Very easy to program, and events respond well
  - Cons: A little harder to do zooming, but absolutely possible
- SVG rendering
  - Pros: zoom/pan a little easier
  - Cons: pretty much everything else much more difficult
- Canvas (?)
  - Pros:
    - ???
  - Cons:
    - Like everything

### Saving triples

- How is saving to the server going to work? Some options:
  - Unsaved changes are only saved when the user hits a Save button or Ctrl + S
    - Pros:
      - Fast, since nothing needs to be done until the user requests that it be done.
    - Cons:
      - There is no option for keeping various tabs/pubsub clients in sync
      - Fairly unsafe if the user fails to save their work, it's gone forever.
      - Also if the app crashes halfway through the user's work since last save is gone (really bad).
      - Pretty outdated way of doing things.
  - Continuously (delta objects) send updates to the server to keep server/client in sync.
    - Pros:
      - If fast enough, could be a pubsub mechanism to allow multiple tabs/clients to stay synced.
      - Delta objects could be small, allowing simple steps through undo on the server (might not be worth it).
    - Cons:
      - If SHACL validation is happening on every request, and SHACL validation takes 10 seconds per request, the server gets WAY behind the client. If the client sends 100 little actions, they would have to wait 1000 seconds (16 minutes) for the server to catch up. If the second request fails, the user feels set back 16 minutes (really bad).
    - Potential workarounds: if we keep everything in triples on the client, and do SHACL validation locally, maybe that speeds things up. We could also potentially just push the entire graph at a time then, and not worry about little deltas.

### Updating the DOM/Components

The biggest problems with apps that don't use React Context, Redux, or in-component state is the difficulty in re-rendering the correct components at the correct time.

The original composite-graphic-objects repo updated EVERYTHING by using `this.forceUpdate()` on a top-level component. This is a very ugly solution that throws away the ENTIRE tree that React has builds during re-render, just to create it again.

In traditional Redux apps, components are passed pieces of the Redux tree that they deem important. Since updating props/state of a component, it automatically re-renders when the data in the Redux tree itself changes. This often leads to seamless (behind the scenes) re-renders that work without having to think about WHY they work, in particular.

The difficult thing about working purely with triples is that there IS no Redux data-structure that can be depended on. There is no big tree-like structure built out of Javascript objects that can be passed as props. For example, a main problem that Grove deals with is: how do I update the main canvas/drawing area (called the Slate), when a new component is added?

In Slow Reveal, the component would be represented in the state by an object, and since the Slate component depended on a list of such objects, it would see that change.

In the same way, Grove's components _subscribe_ to triples in the model. This has the intended effect of only re-rendering components that need to be re-rendering, and none other.

For example, let there be a simple model of a presentation, with the triples being

```
:Presentation a owl:Class ;
  :has :Slide .

:Slide a owl:Class ;
  :has :Box .

:Box a owl:Class ;
  :hasProperty :hasX ;
  :hasProperty :hasY ;
  :hasProperty :hasWidth ;
  :hasProperty :hasHeight ;
  :hasProperty :hasColor ;
```

Then, we want the Slate component to _subscribe_ to the `:Slide :has :Box` triple. That is, when there is a triple added of that form, the Slate component will re-render. For example, adding a `ex:slide1 :has ex:box1` triple into the graph should re-render that component.

This is difficult for two reasons. First, `ex:slide1 :has ex:box1` is NOT equal to `:Slide :has :Box`. It is the types of the instances that are being looked at. Ok, so the solution here seems to be to reduce instances into their types.

Consider another situation: we want to change the color of `ex:box1`. We start with the triple `ex:box1 :hasColor "yellow"`, remove it, and add the triple `ex:box1 :hasColor "blue"`. What the intended effect of such a change is that ONLY the component that represents `ex:box1` re-renders.

That is, that component (right now, called a RenderBox), parameterized with the URI `ex:box1`, should update when triples of the form `ex:box1 ? ?` are added or deleted. However, again, `ex:box1 :hasColor "blue"` is not exactly that triple.

The current way that Grove handles this is it sees that `:hasColor` is defined as a _property_ of the `:Box` class. Then, if the object of the new triple is a literal, it distills the instance of the subject into its type (`ex:box1` $\to$ `:Box`), and uses that property.

In effect, it means that this RenderBox component is really subscribing to the set of triples

```
ex:box1 :hasProperty :hasColor
ex:box1 :hasProperty :hasX
ex:box1 :hasProperty :hasY
ex:box1 :hasProperty :hasHeight
ex:box1 :hasProperty :hasWidth
```

Note that we cannot simple subscribe to `:Box :hasProperty :hasColor`, since that would mean EVERY RenderBox component would re-render when any of their colors changed, which we can't have. We only want to the RenderBox that has the parameter `ex:box1` to subscribe to the changes on `ex:box1`. Other RenderBox components have other parameters, like `ex:box2`, and so on.

This sort of subscription works well, but is also limited. The rules of inference need to be hard-coded, and if there are multiple types for a single instance (a `:kaspar` being a `:Person` and also an `:Employee`), it would distill to the first it found. That isn't really supported right now in Grove. Everything can have only one type. And, in fact, everything _needs_ to have exactly one type, in order for the subscriptions to work.

In theory, the best thing to do would have a SPARQL query (a CONSTRUCT) for a component, and IF the results of that CONSTRUCT query change, we would update the component. But I'm pretty sure that this means we would need to run the CONSTRUCT query for each element, even if the smallest thing changes.

### Updating the DOM: Take 2
