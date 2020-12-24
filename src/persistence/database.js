import loki from 'lokijs';
import cuid from 'cuid';
const NUM_WIDGETS = 200;

const db = new loki('rlx');
const widgets = db.addCollection('widgets', { indices: ['title'] });
for (let i = 0; i < NUM_WIDGETS; i++) {
    const w = widgets.by('title', i);
    if (!w) {
        widgets.add({ _id: cuid(), title: `widget ${i}` });
    }
}

export default db;
