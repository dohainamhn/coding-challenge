import React from 'react';
import './styles.scss';

interface Props {
  onDeleteCheckedTask: () => void;
}

export const BulkActions = (props: Props) => {
  const { onDeleteCheckedTask } = props;
  return (
    <div className='bulk-actions'>
      <h4>Bulk Action:</h4>
      <div className='bulk-actions__btn'>
        <button className='done-btn'>Done</button>
        <button onClick={onDeleteCheckedTask} className='remove-btn'>
          Remove
        </button>
      </div>
    </div>
  );
};
