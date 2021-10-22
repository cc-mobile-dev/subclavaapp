// NavigationService.js
import * as React from 'react';

export const toastRef = React.createRef();

export function toast(message, delay) {
    toastRef.current?.show(message, delay);
}


// add other navigation functions that you need and export them

export default {
    toast
};
