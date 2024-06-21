declare var __DEV__: boolean;

declare global {
  namespace Cypress {
    interface Chainable {
      toMatchImageSnapshot: any;
      realHover(): Chainable<Element>;
    }
  }
}

declare module 'react' {
  interface DOMAttributes {
    css?: any;
  }
}
