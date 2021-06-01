import localForage from 'localforage';
import { useEffect, useState } from 'react';
import getOsDarkModePreference from './getOsDarkModePreference';
const osPreference = getOsDarkModePreference();

export default () => {
    const [darkModePreference, setDarkModePreference] = useState(osPreference);
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
    });
    const overrideDarkMode = prefersDarkMode => {
        setDarkModePreference(async prev => {
            if (prefersDarkMode !== prev) {
                await localForage.setItem('prefersDarkMode', prefersDarkMode);
                return prefersDarkMode;
            }
            return prev;
        });
    };
    return [darkModePreference, overrideDarkMode];
};
