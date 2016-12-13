//

import React from 'react';
import { expect } from 'chai';
import List from '../app/components/List';
import ListItem from '../app/components/ListItem';
import ItemShowLayer from '../app/components/ItemShowLayer';
import Deskmark from '../app/components/Deskmark';
import ItemEditor from '../app/components/ItemEditor';
import CreateBar from '../app/components/CreateBar';
import { shallow, mount } from 'Enzyme';

describe("Testing all the components using Enzyme", ()  => {
    const testData = [
        {
            "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
            "title": "Hello",
            "content": "# testing markdown ",
            "time": 1458030208359
        },{
            "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775b",
            "title": "Hello2",
            "content": "# Hello World ",
            "time": 1458030208359
        }
    ]

    it("test List component using Enzyme", () => {
        let list = shallow(<List items={testData} />);
        expect(list.find(ListItem).length).to.equal(testData.length);
    })

    it("test ListItem component using Enzyme ", () => {
        let listItem = shallow(<ListItem item={testData[0]} />);
        expect(listItem.find('.item-title').text()).to.equal(testData[0].title);
        expect(listItem.hasClass('list-group-item')).to.be.true;
    })

    it("test ItemShowLayer component with no data using Enzyme", () => {
        let itemShowLayer = shallow(<ItemShowLayer item= {null} />);
        expect(itemShowLayer.find('.no-select').length).to.equal(1);
        expect(itemShowLayer.hasClass('item-show-layer-component'));
    })

    it("test ItemShowLayer with data using Enzyme", () => {
        let itemShowLayer = shallow(<ItemShowLayer item={testData[0]} />);
        expect(itemShowLayer.find("h2").text()).to.equal(testData[0].title);
        expect(itemShowLayer.hasClass('item-show-layer-component'));
    })

    it("test Deskmark create on post and delete a post", () => {
        // 使用mount方法挂载DOM结构
        let deskmark = mount(<Deskmark />);
        // 单击新建条目按钮
        deskmark.find('.create-bar-component').simulate('click');
        // editor组件应该出现，showLayer组件应该消失，同时左侧列表条目应该为空
        expect(deskmark.find('.item-editor-component').length).to.equal(1);
        expect(deskmark.find('.item-show-layer-component').length).to.equal(0);
        expect(deskmark.find('.item-component').length).to.equal(0);
        // 在editor的input和textarea中填写一些测试数据
        let input = deskmark.find('input');
        input.node.value = 'new title';
        input.simulate('change',input);

        let textarea = deskmark.find('textarea');
        textarea.node.value = "# looks good";
        textarea.simulate('change', textarea);
        // 单击保存
        deskmark.find('.btn-success').simulate('click');

        // showlayer组件应该出现，editor组件应该消失，同时左侧列表条目应该为1
        expect(deskmark.find('.item-editor-component').length).to.equal(0);
        expect(deskmark.find('.item-show-layer-component').length).to.equal(1);
        expect(deskmark.find('.item-component').length).to.equal(1);

        expect(deskmark.find('.item-component').first().find('.item-title').text()).to.equal('new title');
        // 选择列表的第一条
        deskmark.find('.item-component').first().simulate('click');
        // showlayer组件的H2元素应该有相同的标题
        expect(deskmark.find('.item-show-layer-component h2').text()).to.equal('new title');

        deskmark.find('.btn-danger').simulate('click');
        expect(deskmark.find('.item-component').length).to.equal(0);
    })
})
