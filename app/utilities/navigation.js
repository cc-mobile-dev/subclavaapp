// NavigationService.js
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function back() {
  navigationRef.current?.goBack()
}


export function dismiss() {
  console.log(navigationRef.current.dangerouslyGetParent())
  navigationRef.current?.dismiss()
}


// add other navigation functions that you need and export them

export default {
  navigate,
  back,
  dismiss
};
