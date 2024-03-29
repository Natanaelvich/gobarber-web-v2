import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  ...rest
}) => {
  return (
    <Container loading={Number(loading)}>
      <button disabled={loading} type="button" {...rest}>
        {loading ? 'Enviado...' : children}
      </button>
    </Container>
  );
};

Button.whyDidYouRender = true;

export default Button;
