import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import Spinner from '../Spinner';
import PseudoBox, { PseudoBoxProps } from '../PseudoBox';
import { MinervaProps, systemProps, minervaPropTypes } from '../layout';
// import { useTheme } from '../theme';
import styled from 'styled-components';

const StyledButton = styled(PseudoBox)(
  props => ({
    ...props.theme.Button,
  }),
  systemProps
);

export interface ButtonProps extends MinervaProps, PseudoBoxProps {
  children?: React.ReactNode;
  /** Toggles disabled pseudo class */
  disabled?: boolean;
  /** If `true`, button will show a spinner. */
  isLoading?: boolean;
}

export const Button = forwardRef(function Button(
  {
    children,
    disabled = false,
    as: Comp = 'button',
    isLoading = false,
    ...props
  }: ButtonProps,
  ref
) {
  return (
    <StyledButton
      ref={ref}
      as={Comp}
      disabled={disabled || isLoading}
      role="button"
      transition="all 150ms ease 0s"
      outline="none"
      _hover={{
        backgroundColor: '#f9fafb',
      }}
      _focus={{
        borderColor: '#a4cafe',
        boxShadow: '0 0 0 3px rgba(118,169,250,.45)',
        outline: 0,
      }}
      _disabled={{
        opacity: 0.4,
        cursor: 'not-allowed',
      }}
      // {...theme.Button}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </StyledButton>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Button.propTypes = exact({
    ...minervaPropTypes,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object,
  });
}

export default Button;
