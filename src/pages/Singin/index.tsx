import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';

import logoImg from '../../assets/Logo.svg';

const SingnIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="" />

        <form>
          <h1>Faça seu logon</h1>

          <input placeholder="E-mail" />
          <input placeholder="Senha" type="password" />

          <button type="submit">Entrar</button>
          <a href="">Esqueci minha senha</a>
        </form>
        <a href="">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SingnIn;
