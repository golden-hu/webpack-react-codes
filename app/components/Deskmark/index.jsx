/*
*@file component Deskmark
*/


import React from 'react';
import uuid from 'uuid';

import CreateBar from '../CreateBar';
import List from '../List';
import ItemEditor from '../ItemEditor';
import ItemShowLayer from '../ItemShowLayer';

import './style.scss';

class Deskmark extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [{"id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a","title": "Hello", "content": "# testing markdown", "time": 1458030208359},
                        {"id": "6c84fb90-12c4-11e1-840d-7b25c5ee775b","title": "Hello2", "content": "# Hello World", "time": 1458030208359}],
            selectedId: null,
            editing: false
        };

        this.saveItem = this.saveItem.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.createItem = this.createItem.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    saveItem(item){
        // item是编辑器返回的对象，里面应该包括标题和内容
        // 当前的items state
        let items = this.state.items;
        if(!item.id){
            item.id = uuid.v4();
            item.time= new Date().getTime();

            items = [ ...items, item];
        } else {
            items = items.map(
                exist => (
                    exist.id === item
                    ? item
                    : exist
                )
            );
        }

        // 更新新的state
        this.setState({
            items,
            selectedId: item.id,
            editing: false,
        });
    }

    selectItem(id) {
        if(id === this.state.selectedId) {
            return ;
        }

        this.setState({
            selectedId: id,
            editing: false
        });
    }

    deleteItem(id) {
        if(!id){
            return ;
        }

        this.setState({
            items: this.state.items.filter(
                result => result.id !== id
            ),

        });
    }

    createItem() {
        this.setState({
            selectedId: null,
            editing: true
        });
    }

    editItem(id) {
        this.setState({
            selectedId: id,
            editing: true
        });
    }

    cancelEdit() {
        this.setState({
            editing: false
        });
    }

    render(){
        const { items, selectedId, editing} = this.state;
        const selected = selectedId && items.find( item => item.id === selectedId);
        const mainPart = editing
            ? (
                <ItemEditor
                    item={selected}
                    onSave={this.saveItem}
                    onCancel={this.cancelEdit}
                />
            )
            : (
                <ItemShowLayer
                    item={selected}
                    onEdit={this.editItem}
                    onDelete={this.deleteItem}
                />
            );

        return (
                <section className="deskmark-component">
                    <nav className="navbar navbar-fixed-top navbar-dark bg-inverse ">
                       <a className="navbar-brand" href="#">Deskmark App</a>
                    </nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 list-group">
                                <CreateBar  onClick={this.createItem}/>
                                <List
                                    items={this.state.items}
                                    onSelect={this.selectItem}
                                />
                            </div>
                             {mainPart}
                        </div>
                    </div>

                </section>
            );
    }
}

export default Deskmark;
