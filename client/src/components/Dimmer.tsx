import React from 'react';
import styled from 'styled-components';

const DimmerWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 200;
  opacity: 0.5;
`;

const Dimmer = () => {
  return <DimmerWrapper />;
};

export default Dimmer;
