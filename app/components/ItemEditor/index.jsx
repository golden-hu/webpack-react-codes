/*
*@file component ItemEditor
*/
import React, { PropTypes } from 'react';

import './style.scss';

const propTypes = {
    item: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

class ItemEditor extends React.Component {
    render(){
        const { onSave, onCancel } = this.props;

        const item = this.props.item || {
            title: '',
            content: ''
        };

        const saveText = item.id ? '保存' : '创建';

        let save = () => {
            item.title = this.refs.title.value;
            item.content = this.refs.content.value;
            onSave(item);
        };

        return (
            <div className="col-lg-8 item-editor-component">
                <div className="control-area">
                    <button onClick={save} className="btn btn-success">{saveText}</button>
                    <button onClick={onCancel} className="btn secondary">取消</button>
                </div>
                <div className="edit-area">
                    <input ref="title" placeholder="请填写标题" defaultValue={item.title} />
                    <textarea ref="content" placeholder="请填写内容" defaultValue={item.content} />
                </div>
            </div>
        );
    }
}

ItemEditor.propTypes = propTypes;
export default ItemEditor;
