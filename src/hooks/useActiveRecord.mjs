import { useContext } from 'react';
import { ActiveRecordContext } from '../components/ActiveRecord.mjs';

export default function useActiveRecord() {
    return useContext(ActiveRecordContext);
}
