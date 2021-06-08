import react from 'react';
import { ActiveRecordContext } from '../components/contextProviders/ActiveRecord';
const { useContext } = react;

export default function useActiveRecord() {
    return useContext(ActiveRecordContext);
}
