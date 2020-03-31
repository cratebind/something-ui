---
id: doc1
title: Style Guide
sidebar_label: Style Guide
---

# Getting Started

Minerva UI is a reusable component library to help build UIs faster. This library aims to be highly composable, declarative and accessible.

## Install

```bash
yarn add minerva-ui
```
```bash
npm install --save minerva-ui
```

## Usage

First add the `<ThemeProvider />` and `<GlobalStyles />` to the root of your app:

GlobalStyles is optional but highly recommended. It includes the CSS reset and styles from [Tailwind CSS.](https://tailwindcss.com/docs/preflight)


```jsx
import { ThemeProvider, GlobalStyles } from 'minerva-ui';

const App = () => (
  <ThemeProvider>
    {/* optional but recommended */}
    <GlobalStyles />
  </ThemeProvider>
)
```

Then import components you want into your UI:

```js
import { Checkbox } from 'minerva-ui';
```

And use them:

```jsx live
() => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
      Stay Logged In
    </Checkbox>
  );
}
```

## Principles

### Highly Composable

A composable library avoids abstracting away too much control from the developer. Our goal is to avoid creating complex components with prop names like `innerInputIconStyles`.

```jsx
<>
  {/* non-composable */}
  <Table tableCellStyles={{ backgroundColor: 'grey' }} />
  {/* composable */}
  <Table>
    <TableBody>
      <TableRow>
        <TableCell style={{ backgroundColor: 'grey'}}>

        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
<>
```

While composable approaches might look more verbose, it means that your codebase keeps _more control_ over how components are rendered. If you want to rearrange components, you're able to easily move things around.

### Lower-Level Components

The goal of this library is not to provide fully-styled, pre-packaged components that are difficult to customize. Instead we want to provide powerful primitive components that can be easily composed to build your UI.

However, since we also realize that many developers don't want to have to sink hours of time into building their own UI, we also feature [many examples](/examples/Cards) of common UI patterns that are built with Minerva.

They're designed to be copy and pasted into your codebase to help you get started, and they allow you to easily customize anything you need to down the road.

## Contributing

1. Clone Repo
2. Run `yarn install`
3. Run `yarn storybook` to open a local storybook server for development

## Influences:

[Ryan Florence "Reach UI" Guidelines](https://gist.github.com/ryanflorence/e5c794e6093d16a69fa88d2112a292f7) - Great guidelines for making composable / declarative React APIs

[Tailwind CSS](https://tailwindcss.com/) - Utility-based CSS framework without pre-packaged styles

[Chakra UI](https://chakra-ui.com/) - Batteries-included React Component library

## Tools:

- [Styled Components](https://styled-components.com/)
- [Styled System](https://styled-system.com/)
- [Jest](https://jestjs.io/)
- [Typescript](https://www.typescriptlang.org/)
- [TSDX](https://github.com/jaredpalmer/tsdx)

