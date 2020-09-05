import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/Logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErros';
import { AuthContext } from '../../context/modules/AuthContext';

const SingnIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useContext(AuthContext);

  const hanleSingnIn = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido.'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = data;
        signIn({ email, password });
      } catch (error) {
        const errors = getValidationErros(error);

        formRef.current?.setErrors(errors);

        console.log(error);
      }
    },
    [signIn],
  );
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="" />

        <Form ref={formRef} onSubmit={hanleSingnIn}>
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
