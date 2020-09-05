import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/Logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SingnIn: React.FC = () => {
  function hanleSingnIn(data: { email: string; password: string }): void {
    console.log(data);
  }
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="" />

        <Form onSubmit={hanleSingnIn}>
          <h1>Faça seu logon</h1>

          <Input placeholder="E-mail" icon={FiMail} name="email" />
          <Input
            placeholder="Senha"
            type="password"
            icon={FiLock}
            name="password"
          />

          <Button type="submit">Entrar</Button>
          <a href="#id">Esqueci minha senha</a>
        </Form>
        <a href="#id">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SingnIn;
