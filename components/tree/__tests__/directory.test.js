import React from 'react';
import { mount, render } from 'enzyme';
import debounce from 'lodash/debounce';
import Tree from '../index';

const { DirectoryTree, TreeNode } = Tree;

jest.mock('lodash/debounce');

describe('Directory Tree', () => {
  debounce.mockImplementation(fn => fn);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    debounce.mockRestore();
  });

  function createTree(props) {
    return (
      <DirectoryTree {...props}>
        <TreeNode key="0-0">
          <TreeNode key="0-0-0" />
          <TreeNode key="0-0-1" />
        </TreeNode>
        <TreeNode key="0-1">
          <TreeNode key="0-1-0" />
          <TreeNode key="0-1-1" />
        </TreeNode>
      </DirectoryTree>
    );
  }

  describe('expand', () => {
    it('click', () => {
      const wrapper = mount(createTree());

      wrapper
        .find(TreeNode)
        .find('.infini-tree-node-content-wrapper')
        .at(0)
        .simulate('click');
      expect(wrapper.render()).toMatchSnapshot();
      jest.runAllTimers();
      wrapper
        .find(TreeNode)
        .find('.infini-tree-node-content-wrapper')
        .at(0)
        .simulate('click');
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('double click', () => {
      const wrapper = mount(createTree({ expandAction: 'doubleClick' }));

      wrapper
        .find(TreeNode)
        .find('.infini-tree-node-content-wrapper')
        .at(0)
        .simulate('doubleClick');
      expect(wrapper.render()).toMatchSnapshot();
      jest.runAllTimers();
      wrapper
        .find(TreeNode)
        .find('.infini-tree-node-content-wrapper')
        .at(0)
        .simulate('doubleClick');
      expect(wrapper.render()).toMatchSnapshot();
    });

    describe('with state control', () => {
      class StateDirTree extends React.Component {
        state = {
          expandedKeys: [],
        };

        onExpand = expandedKeys => {
          this.setState({ expandedKeys });
        };

        render() {
          const { expandedKeys } = this.state;

          return (
            <DirectoryTree expandedKeys={expandedKeys} onExpand={this.onExpand} {...this.props}>
              <TreeNode key="0-0" title="parent">
                <TreeNode key="0-0-0" title="children" />
              </TreeNode>
            </DirectoryTree>
          );
        }
      }

      ['click', 'doubleClick'].forEach(action => {
        it(action, () => {
          const wrapper = mount(<StateDirTree expandAction={action} />);

          wrapper
            .find(TreeNode)
            .find('.infini-tree-node-content-wrapper')
            .at(0)
            .simulate(action);
          jest.runAllTimers();
          expect(wrapper.render()).toMatchSnapshot();
        });
      });
    });
  });

  it('defaultExpandAll', () => {
    const wrapper = render(createTree({ defaultExpandAll: true }));
    expect(wrapper).toMatchSnapshot();
  });

  it('defaultExpandParent', () => {
    const wrapper = render(createTree({ defaultExpandParent: true }));
    expect(wrapper).toMatchSnapshot();
  });

  it('expandedKeys update', () => {
    const wrapper = mount(createTree());
    wrapper.setProps({ expandedKeys: ['0-1'] });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('selectedKeys update', () => {
    const wrapper = mount(createTree({ defaultExpandAll: true }));
    wrapper.setProps({ selectedKeys: ['0-1-0'] });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('group select', () => {
    let nativeEventProto = null;
    const onSelect = jest.fn();
    const wrapper = mount(
      createTree({
        defaultExpandAll: true,
        expandAction: 'doubleClick',
        multiple: true,
        onClick: e => {
          nativeEventProto = Object.getPrototypeOf(e.nativeEvent);
        },
        onSelect,
      }),
    );

    wrapper
      .find(TreeNode)
      .find('.infini-tree-node-content-wrapper')
      .at(0)
      .simulate('click');
    expect(onSelect.mock.calls[0][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[0][1].selectedNodes.length).toBe(1);

    // Click twice should keep selected
    wrapper
      .find(TreeNode)
      .find('.infini-tree-node-content-wrapper')
      .at(0)
      .simulate('click');
    expect(onSelect.mock.calls[1][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[0][0]).toEqual(onSelect.mock.calls[1][0]);
    expect(onSelect.mock.calls[1][1].selectedNodes.length).toBe(1);

    // React not simulate full of NativeEvent. Hook it.
    // Ref: https://github.com/facebook/react/blob/master/packages/react-dom/src/test-utils/ReactTestUtils.js#L360
    nativeEventProto.ctrlKey = true;

    wrapper
      .find(TreeNode)
      .find('.infini-tree-node-content-wrapper')
      .at(1)
      .simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
    expect(onSelect.mock.calls[2][0].length).toBe(2);
    expect(onSelect.mock.calls[2][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[2][1].selectedNodes.length).toBe(2);

    delete nativeEventProto.ctrlKey;
    nativeEventProto.shiftKey = true;

    wrapper
      .find(TreeNode)
      .find('.infini-tree-node-content-wrapper')
      .at(4)
      .simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
    expect(onSelect.mock.calls[3][0].length).toBe(5);
    expect(onSelect.mock.calls[3][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[3][1].selectedNodes.length).toBe(5);

    delete nativeEventProto.shiftKey;
  });
});