# MedScheduler - Microsserviços
Este projeto tem como objetivo realizar agendamento de consultas médicas para uma clínica.

# Composiçao
Este projeto é composto pelos seguintes serviços e tecnologias:

## Microsserviços
| Microsserviço   | Descrição                                    | Tecnologias utilizadas |
|-----------------|----------------------------------------------|------------------------|
| Agendamento     | Serviço de agendamento de consulta           | Python, MongoDB, Kafka |
| Disponibilidade | Serviço de disponibiliade do médico          | Python, MongoDB, Kafka |
| Relatório       | Serviço de relatórios médicos                | Python, MongoDB        |
| Avaliação       | Serviço de avaliação de consultas            | Python, MongoDB        |
| Usuários        | Serviço de gestão de usuários e autenticação | NodeJS, MySQL          |

## Bancos de Dados
- MySQL: utilizamos o mysql para fazer a gestao dos usuários e suas respectivas roles dentro do sistema
- MongoDB: utilizamos o MongoDB nos sistemas Python que eram muito utilizados em consultas, trazendo uma boa performance

## Mensageria
Utilizamos o Kafka para realizar a rotina de remover a disponibilidade do médico no serviço de disponibilidade ao
cadastrar uma consulta

## Front-End
Além disso, desenvolvemos uma experiência de como seria uma plataforma consumindo nossos serviços, utilizamos NextJS
para a criação das telas e componentes, mas também utilizamos o mesmo como API interna do front, resolvendo as chamadas
entre os serviços

## Rotas do swagger
- MS de usuario - http://localhost:8006/api
- MS de disponibilidade - http://localhost:8004/docs
- MS de agendamento - http://localhost:8000/docs
- MS de relatório médico - http://localhost:8005/docs
- MS de reviews - http://localhost:8003/docs
- Kafka-UI - http://localhost:8080
- Front-end - http://localhost:3000/login
