/// <reference types="cypress" />

import React from 'react';
import { mount } from 'cypress-react-unit-test';
import {
  ThemeProvider,
  GlobalStyles,
  defaultTheme,
  Checkbox,
} from '../../dist/minerva-ui.esm';
import { createGlobalStyle } from 'styled-components';

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

describe('<Checkbox />', () => {
  it('renders with a theme provider', () => {
    mount(
      <MinervaProvider>
        <Checkbox />
      </MinervaProvider>
    );
  });

  it('shows white background when not checked', () => {
    const labelText = 'Checked Checkbox';
    mount(
      <MinervaProvider>
        <Checkbox>{labelText}</Checkbox>
      </MinervaProvider>
    );

    cy.get('input[type="checkbox"]').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );
  });

  it('shows checkbox when checked', () => {
    const labelText = 'Checked Checkbox';
    cy.get('input[type="checkbox"]').as('checkbox');
    mount(
      <MinervaProvider>
        <Checkbox>{labelText}</Checkbox>
      </MinervaProvider>
    );
    // expect(checkbox).toMatchSnapshot('Unchecked Checkbox');

    cy.get('input[type="checkbox"]').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );

    cy.get('@checkbox').click();

    // expect(checkbox).toMatchSnapshot('Checked Checkbox');

    cy.get('@checkbox').should('have.attr', 'aria-checked', 'true');

    cy.get('@checkbox').toMatchImageSnapshot();
  });

  it('can have checked state changed by theme', () => {
    const labelText = 'Checked Checkbox';
    cy.get('input[type="checkbox"]').as('checkbox');

    const backgroundColor = 'rgb(51, 51, 51)';
    const checkedColor = 'rgb(195, 51, 51)';

    const customTheme = {
      ...defaultTheme,
      Checkbox: {
        backgroundColor: backgroundColor,
        _checked: {
          backgroundColor: checkedColor,
        },
      },
    };

    mount(
      <MinervaProvider theme={customTheme}>
        <Checkbox>{labelText}</Checkbox>
      </MinervaProvider>
    );

    // expect(checkbox).toMatchSnapshot('Unchecked Checkbox');

    cy.get('@checkbox').should('have.css', 'background-color', backgroundColor);

    cy.get('@checkbox').click();

    // expect(checkbox).toMatchSnapshot('Checked Checkbox');

    cy.get('@checkbox').should('have.css', 'background-color', checkedColor);

    cy.get('@checkbox').should('have.attr', 'aria-checked', 'true');
  });
});
