import React, { useState } from 'react';
import { mount } from 'cypress-react-unit-test';
import {
  Alert,
  ThemeProvider,
  GlobalStyles,
  defaultTheme,
  Button,
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

const ExampleCloseableAlert = () => {
  const [open, setOpen] = useState(false);

  const title = 'Hello';
  const description = 'World';
  const closeText = 'Dismiss';
  return (
    <>
      <Button onClick={() => setOpen(true)} data-testid="open-alert-button">Open Alert</Button>
      {open && (
        <Alert title={title}>
          {description}
          <Button
            bg="transparent"
            padding={2}
            border={0}
            name="Close Alert"
            marginLeft="auto"
            onClick={() => setOpen(false)}
            data-testid="close-alert-button"
          >
            {closeText}
          </Button>
        </Alert>
      )}
    </>
  );
};

describe('<Box />', () => {
  it('renders with a theme provider', () => {
    const title = 'Test';
    mount(
      <MinervaProvider>
        <Alert title={title} />
      </MinervaProvider>
    );

    cy.contains(title).should('be.visible');
  });

  it('should display content', () => {
    const description = 'Hello World';
    mount(
      <MinervaProvider>
        <Alert>{description}</Alert>
      </MinervaProvider>
    );

    cy.get('div[role="alert"]').should('contain', description);
  });

  it('should add title content when `title` prop is passed', () => {
    const title = 'Hello';
    const description = 'World';
    cy.get('div[role="alert"]').as('alert');
    mount(
      <MinervaProvider>
        <Alert title={title}>{description}</Alert>
      </MinervaProvider>
    );

    cy.get('@alert').should('contain', title);
    cy.get('@alert').should('contain', description);
  });

  it('should add predefined styles when `status` prop is passed', () => {
    const backgroundColor = 'rgb(248, 180, 180)';
    mount(
      <MinervaProvider>
        <Alert status="error">error</Alert>
      </MinervaProvider>
    );

    cy.get('div[role="alert"]').should(
      'have.css',
      'background-color',
      backgroundColor
    );
  });

  it('should add styles when `bg` prop is passed', () => {
    const backgroundColor = 'rgb(253, 246, 178)';
    mount(
      <MinervaProvider>
        <Alert bg={backgroundColor}>Custom color</Alert>
      </MinervaProvider>
    );
    cy.get('div[role="alert"]').should(
      'have.css',
      'background-color',
      backgroundColor
    );
  });

  it('should add close button text and be closeable', () => {
    const title = 'Hello';
    const description = 'World';
    const closeText = 'Dismiss';
    cy.get('div[role="alert"]').as('alert');
    mount(
      <MinervaProvider>
       <ExampleCloseableAlert />
      </MinervaProvider>
    );

    cy.get('button[data-testid="open-alert-button"]').click();
    cy.get('@alert').should('contain', title);
    cy.get('@alert').should('contain', description);
    cy.get('@alert').should('contain', closeText);
    cy.get('button[data-testid="close-alert-button"]').click();
    cy.get('@alert').should('not.exist');
  });
});
