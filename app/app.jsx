import 'babel-polyfill';
import 'bootstrap/scss/bootstrap.scss';

import React from 'react';
import { render} from 'react-dom';
import Deskmark from './components/Deskmark';

const app = document.createElement('div');
document.body.appendChild(app);
render(<Deskmark />, app);
