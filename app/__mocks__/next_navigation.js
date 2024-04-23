// app/__mocks__/next_navigation.js

const useRouter = jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    forward: jest.fn()
  }));
  
const usePathname = jest.fn(() => '/mock-path');

  module.exports = {
    useRouter,
    usePathname,
};