import React from 'react';

import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/Logo.svg';

const SingnUp: React.FC = () => {
  function hanleSingnUp(data: {
    name: string;
    email: string;
    password: string;
  }): void {
    console.log(data);
  }
  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="Gobarber" />

        <Form onSubmit={hanleSingnUp}>
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
        </Form>
        <a href="#id">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SingnUp;
