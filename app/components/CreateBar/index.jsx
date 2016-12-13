/*
* @file component CreateBar
*/

 import React, { PropTypes } from 'react';
 import './style.scss';

 const propTypes = {
     onClick: PropTypes.func.isRequired,
 };

 function CreateBar({ onClick }) {
     return (
         <a href="#" onClick={onClick} className="list-group-item create-bar-component">
             +创建新文章
         </a>
     );
 }

 CreateBar.propTypes = propTypes ;
 export default CreateBar;
