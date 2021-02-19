import react from 'react';
import { ActiveRecordContext } from '../components/ActiveRecord.mjs';
const { useContext } = react;

export default function useActiveRecord() {
    return useContext(ActiveRecordContext);
}
