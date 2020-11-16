# Virtues-Current
7-JUL-20
export for tabletop simulator.
cards are formatted ax 7x10 matrix in a single .jpg
- send as a 7x10 .jpg grid to the url
- or save to local file as 7x10 .jpg
- or batch convert local files to make 7x10 grid jpgs
** at lesat for testing, I'll use the "deckbuilder" that is packaged with the tabletop simulator app (local files, batch processed).
commenting out the alert for purchasing cards.

14-JUN-20
Splitting into .json, .js and .html files.
After this, recomemnd to access the application over public internet links.

Some parallel work is progressing withi AWS, until the AWS link is released, one may access from the URL below.
gfys.pw/virtues.html

Initial breakout as follows.
cards.json
rules.json
v_bootsrap_style.css (prepened v_ because it is modified for virtues)
save_load.js
inspiration_tracking.js
event_handelers.js
...

also, expecting cloud saves, but if desired, could save to a local file.
keeping the data as a javascript value, was simple compared to accessing a local file for testing without updating a server.
