import React, { ChangeEvent, useEffect, useState } from 'react';
import DateInput from 'react-datepicker';

import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  label?: string;
  onChange: (value: any) => void;
  name?: string;
  initData: string;
}

export const DatePicker = (props: Props) => {
  const { label = '', onChange, name = '', initData } = props;
  const [date, setDate] = useState<Date>(new Date(initData));

  useEffect(() => {
    const event = {
      currentTarget: {
        name: name,
        value: date.toISOString(),
      },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);
  }, [date]);

  return (
    <div className='date-picker-container'>
      <h3 className='label'>{label}</h3>
      <label className='date-picker' htmlFor='date-input'>
        <DateInput
          wrapperClassName='date-input'
          className='date-input'
          selected={date}
          dateFormat='d MMMM yyyy'
          minDate={new Date()}
          onChange={(date: Date) => {
            setDate(date);
          }}
        />
        <div className='date-picker__icon'>
          <i className='fas fa-calendar-alt'></i>
        </div>
      </label>
    </div>
  );
};
