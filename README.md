# Projeto de Estágio de Desenvolvimento TypeScript

## O Projeto

Este projeto consiste em uma aplicação Next.js que interage com o serviço de "texto para voz" da ElevenLabs. A aplicação permite listar vozes, escutar amostras e converter um texto digitado pelo usuário em áudio utilizando essas vozes.

## Requisitos

- **Framework**: Next.js
- **Tipo de Projeto**: Frontend e Backend
- **Linguagem**: TypeScript

### Funcionalidades

#### Listar Vozes

- Ao abrir a aplicação, na rota raiz, a aplicação solicita as vozes à API do Next.js.
- A API do Next.js obtém as vozes da ElevenLabs e retorna a resposta.
- A interface lista as vozes, mostrando `name`, `category`, e `labels`.
- Para cada voz, é possível dar play/pause no `preview_url` para escutar uma amostra.

#### Falar Texto Próprio

- Um input está disponível no topo da página onde o usuário pode digitar um texto.
- Quando um texto está presente, um botão de play aparece ao lado de cada voz.
- Ao clicar no botão de play, um loader é exibido e o backend é chamado para obter o áudio.
- A API gera o áudio com a voz escolhida e o texto digitado.
- O arquivo gerado é salvo e a interface toca o áudio quando disponível.


## Publicação

O projeto está publicado usando o Vercel.
Link: https://eleven-app-ten.vercel.app/

## Contato

Se tiver alguma dúvida sobre o projeto, entre em contato com:

- **Gabriella Cruz e Silva**
- **E-mail**: gabriellacsilva20022@gmail.com
- **Telefone**: 932984579233
