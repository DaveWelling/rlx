import { useContext } from 'react';
import { ActiveRecordContext } from '../components/ActiveRecord';

export default function useActiveRecord() {
    return useContext(ActiveRecordContext);
}
