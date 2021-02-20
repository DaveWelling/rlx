import db from './database';

export default async context => {
    const { newRecord, isNew, recordType } = context;
    const collection = db.getCollection(recordType);
    if (isNew) {
        collection.insert(newRecord);
    } else {
        collection.update(newRecord);
    }
};
