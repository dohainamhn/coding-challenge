import React, { ChangeEventHandler } from 'react';
import { capitalizeFirstLetter } from '../../utils';
import './styles.scss';

interface Props {
  label?: String;
  options?: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
}

export const SingleSelect = (props: Props) => {
  const { label = '', options = [], onChange, value } = props;

  return (
    <div className='single-select'>
      <h3 className='label'>{label}</h3>
      <div className='select-wrapper'>
        <select value={value} name='priority' onChange={onChange}>
          {options.map((item) => {
            return (
              <option key={item} value={item}>
                {capitalizeFirstLetter(item)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
