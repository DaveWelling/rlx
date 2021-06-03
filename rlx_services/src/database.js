import loki from 'lokijs';
import cuid from 'cuid';

const NUM_TEST_ROWS = 50000;
const shuffledSequence = shuffle();
const db = new loki('rlx');
const widgetCol = db.addCollection('widget', { indices: ['title'] });
for (let i = 0; i < NUM_TEST_ROWS; i++) {
    const w = widgetCol.by('title', i);
    if (!w) {
        widgetCol.insert({
            _id: cuid(),
            title: `widget ${i}`,
            sequence: i,
            shuffled: shuffledSequence[i]
        });
    }
}
const fooCol = db.addCollection('foo', { indices: ['title'] });
for (let i = 0; i < NUM_TEST_ROWS; i++) {
    const w = fooCol.by('title', i);
    if (!w) {
        fooCol.insert({
            _id: cuid(),
            title: `foo ${i}`,
            sequence: i,
            shuffled: shuffledSequence[i]
        });
    }
}

export default db;

export const widget = widgetCol;

function shuffle() {
    let values = [],
        shuffled = [];
    for (let i = 0; i < NUM_TEST_ROWS; i++) {
        values.push(i);
    }
    while (values.length) {
        let pickIndex = Math.floor(Math.random() * values.length);
        shuffled.push(values[pickIndex]);
        values.splice(pickIndex, 1);
    }
    return shuffled;
}
