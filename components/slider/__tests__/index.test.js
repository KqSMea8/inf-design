import React from 'react';
import { render, mount } from 'enzyme';
import Slider from '..';

describe('Slider', () => {
  it('should show tooltip when hovering slider handler', () => {
    const wrapper = mount(<Slider defaultValue={30} />);
    wrapper
      .find('.infini-slider-handle')
      .at(0)
      .simulate('mouseEnter');
    expect(
      render(
        wrapper
          .find('Trigger')
          .instance()
          .getComponent(),
      ),
    ).toMatchSnapshot();
    wrapper
      .find('.infini-slider-handle')
      .at(0)
      .simulate('mouseLeave');
    expect(
      render(
        wrapper
          .find('Trigger')
          .instance()
          .getComponent(),
      ),
    ).toMatchSnapshot();
  });

  it('when tooltipVisible is true, tooltip should show always, or should never show', () => {
    let wrapper = mount(<Slider defaultValue={30} tooltipVisible />);
    expect(
      wrapper
        .find('.infini-tooltip-content')
        .at(0)
        .hasClass('infini-tooltip-hidden'),
    ).toBe(false);
    wrapper
      .find('.infini-slider-handle')
      .at(0)
      .simulate('mouseEnter');
    expect(
      wrapper
        .find('.infini-tooltip-content')
        .at(0)
        .hasClass('infini-tooltip-hidden'),
    ).toBe(false);
    wrapper
      .find('.infini-slider-handle')
      .at(0)
      .simulate('click');
    expect(
      wrapper
        .find('.infini-tooltip-content')
        .at(0)
        .hasClass('infini-tooltip-hidden'),
    ).toBe(false);
    wrapper = mount(<Slider defaultValue={30} tooltipVisible={false} />);
    expect(wrapper.find('.infini-tooltip-content').length).toBe(0);
  });
});
