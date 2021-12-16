import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppContext, ContextType } from '../../context';
import { INotification } from '../../interfaces/Notification';
import { Notification } from '../Notification';

import './styles.scss';

type Position = 'bottom-right' | 'top-right';

interface Props {
  position: Position;
  children: ReactElement<any, any>;
}

export const Toast = (props: Props) => {
  const { position, children } = props;

  const { toastList, setToastList } = useContext(AppContext) as ContextType;

  const timeWaitForNotificationDelete = 3000;

  const deleteToastListItem = useCallback(
    (id: number) => {
      const newToastList = toastList.filter((item: any) => {
        return item.id !== id;
      });
      setToastList(newToastList);
    },
    [toastList, setToastList]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        deleteToastListItem(toastList[0].id);
      }
    }, timeWaitForNotificationDelete);
    return () => {
      clearInterval(interval);
    };
  }, [toastList, setToastList]);

  return (
    <>
      {children}
      <div className={`toast-container ${position}`}>
        {toastList.map((item: INotification) => {
          return (
            <Notification
              key={item.id}
              message={item.message}
              description={item.description}
              position={position}
              type={item.type}
              deleteNotification={() => {
                deleteToastListItem(item.id);
              }}
            />
          );
        })}
      </div>
    </>
  );
};
