import loki from 'lokijs';
import cuid from 'cuid';

const NUM_WIDGETS = 5;

const db = new loki('rlx');
const widgetCol = db.addCollection('widget', { indices: ['title'] });
for (let i = 0; i < NUM_WIDGETS; i++) {
    const w = widgetCol.by('title', i);
    if (!w) {
        widgetCol.insert({ _id: cuid(), title: `widget ${i}` });
    }
}
const fooCol = db.addCollection('foo', { indices: ['title'] });
for (let i = 0; i < NUM_WIDGETS; i++) {
    const w = fooCol.by('title', i);
    if (!w) {
        fooCol.insert({ _id: cuid(), title: `foo ${i}` });
    }
}

export default db;

export const widget = widgetCol;
