/// <reference types="react-scripts" />
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'rm-input': rmBtn;
      'rm-btn': rmBtn;
    }
  }
}

interface rmBtn
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  type?: string;
  content?: string;
}
