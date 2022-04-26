# Features

## Modes

- All one mode, with different levels of permission, like Google Docs
  - Let $X \in \{ View, Comment, Edit \}$
    - Permissions work as: $View \subset Comment \subset Edit$
  - Can $X$
  - Anyone with the link can $X$
  - Anyone can $X$ (?) (maybe same as above)

## Styling

- Really simple, everything blocky and black-and-white for now. Make presentation colors pop
- Near-infinite (very far) zoom in and out, so user doesn't feel constrained to the default space (maybe zoom tool in toolbar)
- Multiple tools.
  - This might not be necessary if there are clear gestures for what does what. E.g. if clicking on an object is very clear, we don't need select, and if double-clicking on an object is clear, we don't need object creator.
  - Options:
    - Object creator (click or double-click and it makes an object (?))
      - Hotkey: N
    - Select tool
      - Hotkey: S
    - Move tool (?)
      - Depends on how we do resizing versus moving.
      - Could say: dragging on border is a resize, dragging on center is a move. This seems most natural.
      - Change cursor from move cursor to one arrow resize cursor accordingly
    - Group select (might be part of select?)
      - Hotkey: G
    - Zoom tool (?)
      - Hotkey: Z
- Toolbar on the left AND right
  - Left for tools, right for properties? Like text align, color, etc.
- Remove dotted connections. No one knew what they denoted anyway.

## Gestures

- Double click empty canvas for new object
  - Hotkeys 1, 2, 3, 4 for type of object (class, instance, text box, annotation, etc)
- Double click on an object to start a new connection
- Hotkey arrow keys for sizing
  - Keep the opposite end pinned. E.g. when a box is selected and the right arrow key is pressed, keep the left edge stationary and extend the right edge to the right
  - Either this or pixel-repositioning with the arrow keys. 2/3/5px up/down/left/right per arrow key press.
- Draggable edges on objects for resizing
- Somehow have more connection options?
- Shift + click some objects to highlight multiple. Should work on every type of object.

#### Common Hotkey Actions (Ctrl for Windows. Substitute Cmd for Mac):

|   **Command**    |      **Canvas Action**       |         **Text Action**          |
| :--------------: | :--------------------------: | :------------------------------: |
|     Ctrl + A     |          Select All          |            Select All            |
|     Ctrl + C     |             Copy             |               Copy               |
|     Ctrl + V     |            Paste             |              Paste               |
|     Ctrl + X     |             Cut              |               Cut                |
|     Ctrl + Z     |             Undo             |               Undo               |
| Ctrl + Shift + Z |             Redo             |               Redo               |
|     Ctrl + S     |           Save (?)           |                -                 |
|     Ctrl + P     |            Print             |                -                 |
|     Ctrl + F     | Search for text (in objects) | Search for text in current field |
|     Ctrl + N     |        New object (?)        |                -                 |
|   Ctrl + zero    |   Go to default zoom level   |                -                 |
|   Ctrl + plus    |       Zoom in one step       |                -                 |
|   Ctrl + minus   |      Zoom out one step       |                -                 |

### Miscellaneous

- Allow in-place text editing. This could be done on the right in the properties tab, or right in the object itself with a cursor.
- Remove anchor points, allow users to connect to anywhere on the border of an object.
- When creating a connection, maybe allow hotkeys of number keys to change connection type
  - 1: Straight line
  - 2: Quadratic Bezier
  - 3: Cubic Bezier
  - 4: The S curve Old Slow Reveal had
  - 5+: Others?
