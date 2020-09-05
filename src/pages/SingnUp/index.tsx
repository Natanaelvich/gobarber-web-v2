import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';

import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/Logo.svg';
import getValidationErros from '../../utils/getValidationErros';

const SingnUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const hanleSingnUp = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido.'),
          password: Yup.string().min(6, 'No minimo 6 digitos.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (error) {
        const errors = getValidationErros(error);

        formRef.current?.setErrors(errors);

        console.log(error);
      }
    },
    [],
  );

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="Gobarber" />

        <Form ref={formRef} onSubmit={hanleSingnUp}>
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
