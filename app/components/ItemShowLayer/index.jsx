/*
* @file component ItemShowLayer
*/
import React, { PropTypes } from 'react';
import marked from 'marked';

import './style.scss';

const propTypes = {
    item: PropTypes.object,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

function ItemShowLayer({ item, onEdit, onDelete }) {
    if(!item || !item.id){
        return (
            <div className="col-md-8 item-show-layer-component">
                <div className="no-select">请选择左侧列表里面的文章</div>
            </div>
        );
    }

    // 将Markdown转换成HTML
    // 注意在渲染HTML代码时使用了描述过的JSX转义写法dangerouslySetInnerHTML
    const content = marked(item.content);
    return (
        <div className="col-lg-8 item-show-layer-component">
            <div className="control-area">
                <button onClick={() => onEdit(item.id)} className="btn btn-primary">编辑</button>
                <button onClick={() => onDelete(item.id)} className="btn btn-danger">删除</button>
            </div>
            <h2>{item.title}</h2>
            <div className="item-text">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
}

ItemShowLayer.propTypes = propTypes;
export default ItemShowLayer;
