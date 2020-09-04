import React from 'react';

import { Container, Content, Background } from './styles';

const Singout: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src="" alt="" />

        <form>
          <h1>Faça seu logon</h1>

          <input placeholder="E-mail" />
          <input placeholder="Senha" type="password" />

          <button type="submit">Entrar</button>

          <a href="">Criar conta</a>
        </form>
      </Content>

      <Background />
    </Container>
  );
};

export default Singout;
