/// <reference types="cypress" />

import React from 'react';
import { mount } from 'cypress-react-unit-test';
import {
  Button,
  ThemeProvider,
  GlobalStyles,
  defaultTheme,
} from '../../dist/minerva-ui.esm';

import { createGlobalStyle } from 'styled-components';

const text = 'Button';

// by default, we are using the native font stack
// but this font is different on macOS, Linux and Windows
// to make sure our screenshots are consistent, we force them all to use the same font family
const StandardizeFont = createGlobalStyle`
  html {
    font-family: Helvetica;
  }
`;

const customTheme = {
  ...defaultTheme,
  fonts: {
    ...defaultTheme.fonts,
    body: 'Helvetica',
    heading: 'Helvetica',
  },
};

const MinervaProvider = ({ children, theme = customTheme }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <StandardizeFont />
    {children}
  </ThemeProvider>
);

describe('<Button />', () => {
  context('Basic Rendering', () => {
    it('renders with default theme provider', () => {
      mount(
        <MinervaProvider>
          <div id="container">
            <Button>{text}</Button>
            <Button variant="secondary">{text}</Button>
            <Button variant="tertiary">{text}</Button>
          </div>
        </MinervaProvider>
      );

      cy.contains(text).should('be.visible');

      cy.get('#container').toMatchImageSnapshot({
        name: `Default Theme: Button with Variants`,
      });
    });

    it('renders without default theme', () => {
      mount(
        <MinervaProvider
          theme={{
            fonts: {
              body: 'Helvetica',
              heading: 'Helvetica',
            },
            Button: {
              fontFamily: 'body',
            },
          }}
        >
          <Button>{text}</Button>
        </MinervaProvider>
      );

      cy.contains(text).should('be.visible');
      cy.get('button').toMatchImageSnapshot();
    });
  });

  context('Style Props', () => {
    it('should be able to pass basic style props', () => {
      const color = 'rgb(227, 227, 227)';
      const backgroundColor = 'rgb(51, 51, 51)';
      mount(
        <MinervaProvider>
          <Button color={color} bg={backgroundColor}>
            Grey Text Button
          </Button>
        </MinervaProvider>
      );

      cy.get('button').should('have.css', 'color', color);
      cy.get('button').should('have.css', 'background-color', backgroundColor);
    });

    it('should be able to use pseudo style props', () => {
      const backgroundColor = 'rgb(227, 227, 227)';
      mount(
        <MinervaProvider>
          <Button _disabled={{ backgroundColor: backgroundColor }} disabled>
            Grey Text Button
          </Button>
        </MinervaProvider>
      );

      cy.get('button').should('have.css', 'background-color', backgroundColor);
    });
  });
});
