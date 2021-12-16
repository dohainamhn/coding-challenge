import Omit from 'lodash/omit';
import React, { ChangeEventHandler } from 'react';
import './styles.scss';

interface Props {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  name?: string;
  value?: string;
}

export const Input = (props: Props) => {
  const { placeholder = '', onChange, error = false, name = '' } = props;

  return (
    <div className='custom-input'>
      <input
        {...Omit(props, 'error')}
        name={name}
        className={`input ${error && 'input-error'}`}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div className={`hidden ${error && 'error-text'}`}>
        {' '}
        Task title is required{' '}
      </div>
    </div>
  );
};
