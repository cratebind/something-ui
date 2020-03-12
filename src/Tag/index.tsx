import React from 'react';
import styled from 'styled-components';
import { MinervaProps, systemProps } from '../layout';

const StyledTag = styled('div')<any>(
  props => ({
    display: 'inline-block',
    backgroundColor: '#EDF2F7',
    borderRadius: '5px',
    padding: '8px 10px',
    ...props.theme.Tag,
  }),
  systemProps
);

const TagLabel = styled.p``;

export interface TagProps extends MinervaProps {
  children?: React.ReactNode;
  props?: any;
}

export const Tag = ({ children, ...props }: TagProps) => {
  return (
    <StyledTag {...props}>
      <TagLabel>{children}</TagLabel>
    </StyledTag>
  );
};

export default Tag;
