import React from 'react';

import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/Logo.svg';

const SingnUp: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="" />

        <form>
          <h1>Faça seu cadatro</h1>

          <Input placeholder="Nome" name="name" icon={FiUser} />
          <Input placeholder="E-mail" name="email" icon={FiMail} />
          <Input
            placeholder="Senha"
            type="password"
            name="password"
            icon={FiLock}
          />

          <Button type="submit">Cadatrar</Button>
        </form>
        <a href="#id">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SingnUp;
