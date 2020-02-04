import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Button } from '../src';
import { ThemeProvider } from '../src';

describe('<Button />', () => {
  it('should render', () => {
    const { container } = render(
      <ThemeProvider>
        <Button>Test</Button>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display text', () => {
    const content = 'Hello';
    const { container } = render(
      <ThemeProvider>
        <Button>{content}</Button>
      </ThemeProvider>
    );

    expect(container).toHaveTextContent(content);
  });

  it('should show default background color', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <Button>Test</Button>
      </ThemeProvider>
    );

    const button = getByRole('button');

    expect(button).toHaveStyleRule('background-color', 'rgb(56,161,105)');
  });

  it('should show new background color if provided in theme', () => {
    const newColor = 'green';
    const theme = {
      Button: {
        container: {
          backgroundColor: newColor,
        },
      },
    };

    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Button>Test</Button>
      </ThemeProvider>
    );

    const button = getByRole('button');

    expect(button).toHaveStyleRule('background-color', newColor);
  });
});
