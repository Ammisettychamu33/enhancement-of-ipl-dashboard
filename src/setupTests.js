import '@testing-library/jest-dom'

class DummyResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = DummyResizeObserver
}
if (typeof global !== 'undefined' && !global.ResizeObserver) {
  global.ResizeObserver = DummyResizeObserver
}
