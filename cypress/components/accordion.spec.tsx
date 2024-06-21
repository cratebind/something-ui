/// <reference types="cypress" />

import React from 'react';
import { mount } from 'cypress-react-unit-test';
import {
  ThemeProvider,
  GlobalStyles,
  defaultTheme,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
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

const ExampleAccordion = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionButton>Section 1 title</AccordionButton>
        <AccordionPanel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Section 2 title</AccordionButton>
        <AccordionPanel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

describe('<Accordion />', () => {
  it('renders with a theme provider', () => {
    mount(
      <MinervaProvider>
        <ExampleAccordion />
      </MinervaProvider>
    );
    cy.get('[data-reach-accordion]').toMatchImageSnapshot();
  });

  it('should display content', () => {
    const text = 'Section 1 title';
    mount(
      <MinervaProvider>
        <ExampleAccordion />
      </MinervaProvider>
    );
    cy.contains(text).should('be.visible');
  });
});
