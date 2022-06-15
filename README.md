# grove

Grove is a proof-of-concept for subscriptable triples. It might move to subscriptable shapes at some point. For now, triples is good enough, since you can subscribe to a set of them.

## Usage

It is a CRA application, so just `npm install` and `npm run start`, and it will run itself in `localhost:3000`.

The blank gray box in the center of the screen is the slate. The two things the app current does are create new boxes, and change existing boxes colors. Double-clicking on the blank gray slate creates a new yellow box. Double-clicking on a box changes the color.

## How it works

Subscriptable triples are based on Recoil, Meta's solution for state management. TODO: finish docs.
