/// <reference types="cypress" />

import React, { useState } from 'react';
import { mount } from 'cypress-react-unit-test';
import {
  ThemeProvider,
  GlobalStyles,
  defaultTheme,
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
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

const inputLabel = 'Fruit';

const ExampleCombobox = ({ value }) => {
  const [search, setSearch] = useState(value);
  const items = ['apple', 'banana', 'kiwi', 'orange'];
  return (
    <label htmlFor="input-field">
      {inputLabel}
      <Combobox aria-label="choose a fruit" openOnFocus>
        <ComboboxInput
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ComboboxPopover>
          <ComboboxList>
            {items
              .filter(item => item.includes(search))
              .map(item => (
                <ComboboxOption
                  value={item}
                  data-testid="select-option"
                  key={item}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </label>
  );
};

describe('<Combobox />', () => {
  it('renders with a theme provider', () => {
    const content = 'Hello';
    mount(
      <MinervaProvider>
        <ExampleCombobox value={content} />
      </MinervaProvider>
    );
    const combobox = cy.get('label');
    combobox.toMatchImageSnapshot();
  });

  it('should show value', () => {
    cy.get('input[role="combobox"]').as('input');
    const content = 'Hello';
    mount(
      <MinervaProvider>
        <ExampleCombobox value={content} />
      </MinervaProvider>
    );
    cy.get('@input').should('have.value', 'Hello');
  });

  it('should show updated value', () => {
    cy.get('input[role="combobox"]').as('input');
    const updatedValue = 'Input updated!';
    mount(
      <MinervaProvider>
        <ExampleCombobox value="" />
      </MinervaProvider>
    );
    cy.get('@input').type(updatedValue);
    cy.get('@input').should('have.value', updatedValue);
  });

  it('should show option list when typing if openOnFocus is set to true', () => {
    cy.get('input[role="combobox"]').as('input');
    cy.get('div[data-testid="combobox-popover"]').as('option');
    const option = 'apple';
    mount(
      <MinervaProvider>
        <ExampleCombobox value="" />
      </MinervaProvider>
    );

    cy.get('@input').click();
    cy.get('@option').should('be.visible');
    cy.get('@option').should('contain', option);
  });
});
