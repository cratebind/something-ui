/// <reference types="cypress" />

import React, { useState } from 'react';
import { mount } from 'cypress-react-unit-test';
import {
  Input,
  ThemeProvider,
  GlobalStyles,
  defaultTheme,
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

export const MinervaProvider = ({ children, theme = customTheme }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <StandardizeFont />
    {children}
  </ThemeProvider>
);

const inputLabel = 'Name';

const ExampleInput = props => {
  const [state, setState] = useState('');
  return (
    <ThemeProvider>
      <label htmlFor="input-field">
        {inputLabel}
        <Input
          onChange={e => setState(e.target.value)}
          value={state}
          id="input-field"
          {...props}
        />
      </label>
    </ThemeProvider>
  );
};

describe('<Input />', () => {
  const inputType = 'email';
  it('renders with a theme provider', () => {
    mount(
      <MinervaProvider>
        <ExampleInput placeholder="Placeholder Text" />
      </MinervaProvider>
    );

    cy.get('input[placeholder="Placeholder Text"]').should('exist');
  });

  it('should be correct type', () => {
    mount(
      <MinervaProvider>
        <ExampleInput type={inputType} />
      </MinervaProvider>
    );
    cy.get(`input[type=${inputType}]`).should('exist');
  });

  it('should show value', () => {
    const content = 'Hello';
    mount(
      <MinervaProvider>
        <ExampleInput value={content} />
      </MinervaProvider>
    );

    cy.get('input').should('have.value', content);
  });

  it('should show updated value', () => {
    cy.get('input').as('input');
    mount(
      <MinervaProvider>
        <ExampleInput />
      </MinervaProvider>
    );
    cy.get('@input').should('have.value', '');

    const updatedValue = 'Input updated!';
    cy.get('@input').type(updatedValue);
    cy.get('@input').should('have.value', updatedValue);
  });

  it('should be disabled when disabled prop is passed to it', () => {
    mount(
      <MinervaProvider>
        <Input type={inputType} disabled />
      </MinervaProvider>
    );
    cy.get(`input[type=${inputType}]`).should('be.disabled');
  });
});
