/* @flow */
import * as React from 'react';
import { Link } from 'react-router-dom';

import './About.scss';


export const About = () => (
   <React.Fragment>
      <div className="hello">HELLO</div>,
      <div><Link to="/">go home</Link></div>
   </React.Fragment>
);
