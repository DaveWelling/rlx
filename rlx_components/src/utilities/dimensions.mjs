/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// export type DisplayMetrics = {|
//   fontScale: number,
//   height: number,
//   scale: number,
//   width: number
// |};

// type DimensionsValue = {|
//   window?: DisplayMetrics,
//   screen?: DisplayMetrics
// |};

// type DimensionKey = 'window' | 'screen';

// type DimensionEventListenerType = 'change';

/**
 * From
 * https://github.com/facebook/fbjs/blob/21a9acd33be05549b936951a6196ec4b21568575/packages/fbjs/src/core/ExecutionEnvironment.js
 */
const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

const win = canUseDOM
    ? window
    : {
          devicePixelRatio: undefined,
          innerHeight: undefined,
          innerWidth: undefined,
          screen: {
              height: undefined,
              width: undefined
          }
      };

const dimensions = {};
const listeners = {};

export default class Dimensions {
    static get(dimension) {
        if (dimension == null) {
            throw new Error(`No dimension set for key ${dimension}`);
        }
        return dimensions[dimension];
    }

    static set(initialDimensions) {
        if (initialDimensions) {
            if (canUseDOM) {
                throw new Error('Dimensions cannot be set in the browser');
            } else {
                dimensions.screen = initialDimensions.screen;
                dimensions.window = initialDimensions.window;
            }
        }
    }

    static _update() {
        dimensions.window = {
            fontScale: 1,
            height: win.innerHeight,
            scale: win.devicePixelRatio || 1,
            width: win.innerWidth
        };

        dimensions.screen = {
            fontScale: 1,
            height: win.screen.height,
            scale: win.devicePixelRatio || 1,
            width: win.screen.width
        };

        if (Array.isArray(listeners['change'])) {
            listeners['change'].forEach(handler => handler(dimensions));
        }
    }

    static addEventListener(type, handler) {
        listeners[type] = listeners[type] || [];
        listeners[type].push(handler);
    }

    static removeEventListener(type, handler) {
        if (Array.isArray(listeners[type])) {
            listeners[type] = listeners[type].filter(_handler => _handler !== handler);
        }
    }
}

Dimensions._update();

if (canUseDOM) {
    window.addEventListener('resize', Dimensions._update, false);
}
