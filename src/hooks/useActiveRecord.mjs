import { useContext } from 'react';
import { ActiveRecordContext } from '../contexts/ActiveRecordProvider.mjs';

export default function useActiveRecord() {
    return useContext(ActiveRecordContext);
}
