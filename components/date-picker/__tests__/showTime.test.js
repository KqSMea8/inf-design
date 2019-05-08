import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import DatePicker from '..';

const { RangePicker } = DatePicker;

describe('DatePicker with showTime', () => {
  it('should trigger onChange when select value', () => {
    const onChangeFn = jest.fn();
    const onOpenChangeFn = jest.fn();
    const wrapper = mount(
      <DatePicker showTime open onChange={onChangeFn} onOpenChange={onOpenChangeFn} />,
    );

    const calendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    calendarWrapper
      .find('.infini-calendar-date')
      .at(0)
      .simulate('click');
    expect(onChangeFn).toHaveBeenCalled();
    expect(onOpenChangeFn).not.toHaveBeenCalled();
  });

  it('should trigger onOk when press ok button', () => {
    const onOkFn = jest.fn();
    const onOpenChangeFn = jest.fn();
    const onChangeFn = jest.fn();

    const wrapper = mount(
      <DatePicker
        showTime
        open
        onChange={onChangeFn}
        onOk={onOkFn}
        onOpenChange={onOpenChangeFn}
        defaultValue={moment()}
      />,
    );

    const calendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    calendarWrapper.find('.infini-calendar-ok-btn').simulate('click');
    expect(onOkFn).toHaveBeenCalled();
    expect(onOpenChangeFn).toHaveBeenCalledWith(false);
    expect(onChangeFn).not.toHaveBeenCalled();
  });

  it('should trigger onChange when click Now link', () => {
    const onOpenChangeFn = jest.fn();
    const onChangeFn = jest.fn();

    const wrapper = mount(
      <DatePicker showTime open onChange={onChangeFn} onOpenChange={onOpenChangeFn} />,
    );

    const calendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    calendarWrapper.find('.infini-calendar-today-btn').simulate('click');
    expect(onOpenChangeFn).toHaveBeenCalledWith(false);
    expect(onChangeFn).toHaveBeenCalled();
  });

  it('should have correct className when use12Hours is true', () => {
    const wrapper = mount(<DatePicker showTime={{ use12Hours: true }} open />);
    const calendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(calendarWrapper.find('.infini-calendar-time-picker-column-4').length).toBe(0);
    calendarWrapper
      .find('.infini-calendar-time-picker-btn')
      .at(0)
      .simulate('click');
    expect(calendarWrapper.find('.infini-calendar-time-picker-column-4').hostNodes().length).toBe(1);
  });
});

describe('RangePicker with showTime', () => {
  it('should trigger onChange when select value', () => {
    const onChangeFn = jest.fn();
    const onOpenChangeFn = jest.fn();
    const wrapper = mount(
      <RangePicker showTime open onChange={onChangeFn} onOpenChange={onOpenChangeFn} />,
    );

    function findNode(selector) {
      return wrapper.find('Trigger').find(selector);
    }

    expect(
      findNode('.infini-calendar-time-picker-btn').hasClass('infini-calendar-time-picker-btn-disabled'),
    ).toBe(true);
    expect(findNode('.infini-calendar-ok-btn').hasClass('infini-calendar-ok-btn-disabled')).toBe(true);
    findNode('.infini-calendar-date')
      .at(10)
      .simulate('click');
    findNode('.infini-calendar-date')
      .at(11)
      .simulate('click');

    expect(
      findNode('.infini-calendar-time-picker-btn').hasClass('infini-calendar-time-picker-btn-disabled'),
    ).toBe(false);
    expect(findNode('.infini-calendar-ok-btn').hasClass('infini-calendar-ok-btn-disabled')).toBe(false);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onOpenChangeFn).not.toHaveBeenCalled();
  });

  it('should trigger onOk when press ok button', () => {
    const onOkFn = jest.fn();
    const onChangeFn = jest.fn();
    const onOpenChangeFn = jest.fn();
    const wrapper = mount(
      <RangePicker
        showTime
        open
        onOk={onOkFn}
        onChange={onChangeFn}
        onOpenChange={onOpenChangeFn}
      />,
    );

    function findNode(selector) {
      return wrapper.find('Trigger').find(selector);
    }

    findNode('.infini-calendar-date')
      .at(10)
      .simulate('click');
    findNode('.infini-calendar-date')
      .at(11)
      .simulate('click');
    onChangeFn.mockClear();
    findNode('.infini-calendar-ok-btn').simulate('click');
    expect(onOkFn).toHaveBeenCalled();
    expect(onOpenChangeFn).toHaveBeenCalledWith(false);
    expect(onChangeFn).not.toHaveBeenCalled();
  });
});
