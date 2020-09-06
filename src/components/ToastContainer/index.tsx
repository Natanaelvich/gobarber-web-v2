import React from 'react';

import { Container } from './styles';
import { useToast, ToastMessage } from '../../hooks/modules/ToastContext';
import Toast from '../Toast';

interface ToastProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
  const { removeToast } = useToast();

  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} removeToast={removeToast} />
      ))}
    </Container>
  );
};

export default ToastContainer;
