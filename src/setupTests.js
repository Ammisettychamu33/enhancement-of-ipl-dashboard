import '@testing-library/jest-dom'

class DummyResizeObserver {
  constructor(callback) {
    this.callback = callback
  }

  observe(element) {
    if (typeof this.callback === 'function') {
      this.callback([
        {
          target: element,
          contentRect: {
            width: 500,
            height: 500,
            top: 0,
            left: 0,
            bottom: 500,
            right: 500,
          },
          borderBoxSize: [{ inlineSize: 500, blockSize: 500 }],
        },
      ])
    }
  }

  unobserve() {}

  disconnect() {}
}

if (typeof window !== 'undefined') {
  window.ResizeObserver = DummyResizeObserver
}
if (typeof global !== 'undefined') {
  global.ResizeObserver = DummyResizeObserver
}

if (typeof Element !== 'undefined') {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect
  Element.prototype.getBoundingClientRect = function () {
    const rect = originalGetBoundingClientRect ? originalGetBoundingClientRect.call(this) : { width: 0, height: 0 }
    if (rect.width === 0 && rect.height === 0) {
      return {
        width: 500,
        height: 500,
        top: 0,
        left: 0,
        bottom: 500,
        right: 500,
        x: 0,
        y: 0,
        toJSON: () => {},
      }
    }
    return rect
  }
}
