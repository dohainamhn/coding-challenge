import React from 'react';
import './styles.scss';

interface Props {
  message: string;
  description: string;
  position: string;
  deleteNotification: () => void;
  type: string;
}

export const Notification = (props: Props) => {
  const { message, description, position, deleteNotification, type } = props;

  return (
    <div className={`notification ${position}`}>
      <div className={`notification__icon ${type}`}>
        {type === 'success' ? (
          <i className='fas fa-check'></i>
        ) : (
          <i className='fas fa-times-circle'></i>
        )}
      </div>
      <div className='notification__content'>
        <div onClick={deleteNotification} className='close-icon'>
          <i className='fas fa-times-circle'></i>
        </div>
        <div className={`message ${type}`}>
          <h3>{message}</h3>
        </div>
        <div className='description'>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
};
