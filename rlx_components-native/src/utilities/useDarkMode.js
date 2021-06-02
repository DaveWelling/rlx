import localForage from 'localforage';
import { useEffect, useState } from 'react';
import getOsDarkModePreference from './getOsDarkModePreference';
const osPreference = getOsDarkModePreference();

export default () => {
    const [darkModePreference, setDarkModePreference] = useState(osPreference);
    // Check for a previous preference override the first time only
    useEffect(async () => {
        const prefersDarkMode = await localForage.getItem('prefersDarkMode');
        if (prefersDarkMode != null) {
            setDarkModePreference(prev => {
                if (prefersDarkMode !== prev) {
                    return prefersDarkMode;
                }
                return prev;
            });
        }
    }, []);
    const overrideDarkMode = async prefersDarkMode => {
        setDarkModePreference(prev => {
            if (prefersDarkMode !== prev) {
                return prefersDarkMode;
            }
            return prev;
        });
        // Store preference overrides for recall on startup (see useEffect above).
        await localForage.setItem('prefersDarkMode', prefersDarkMode);
    };
    return [darkModePreference, overrideDarkMode];
};
