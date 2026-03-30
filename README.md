#  NeoBank Dashboard

Projeto focado em **TypeScript**, arquitetura de software e design de interfaces.

A ideia aqui foi simular um dashboard de banco digital, trabalhando principalmente organização de código no front-end e separação de responsabilidades.

---

## O que foi aplicado

- TypeScript no front-end
- Estrutura baseada em MVC (adaptado para o front)
- Separação de camadas:
  - Model → regra de negócio
  - Controller → controle das operações
  - View → manipulação do DOM
- Manipulação de eventos
- Atualização dinâmica da interface

---

## TypeScript no projeto

O TypeScript foi usado para garantir mais segurança e previsibilidade no código:

- **Interfaces** para definir a estrutura dos dados (`Transacao`)
- **Tipagem forte** nos parâmetros e retornos das funções
- **Classes** com propriedades públicas e privadas
- **Prevenção de erros** em tempo de desenvolvimento

```ts
// Exemplo de tipagem utilizada
interface Transacao {
  tipo: "deposit" | "retirar" | "transfer";
  valor: number;
  sinal: "positive" | "negative";
}

```


## Funcionalidades

- Visualização de saldo
- Listagem de transações
- Depósito
- Saque
- Transferência

---

## Organização e utilitários

Além da estrutura principal em MVC, o projeto também conta com separação de responsabilidades em camadas auxiliares:

- **Utils** → funções reutilizáveis (formatação de valores, datas e cartão)
- **Validators** → regras de validação (valor, saldo, campos obrigatórios)
- **Constants** → centralização de mensagens de erro e sucesso

Essa abordagem ajuda a evitar código duplicado e facilita a manutenção da aplicação.

---

## 📁 Estrutura

```text
src/
├── model/
├── controllers/
├── views/
├── types/
├── utils/
├── constants/
└── main.ts
```



---

##  Sobre o projeto

Esse projeto foi desenvolvido com foco em melhorar a organização do código no front-end, simulando uma arquitetura mais próxima do que é utilizado em aplicações reais.

A interface é simples e os dados são mockados, pois o objetivo principal aqui não é backend, mas sim estrutura, lógica e organização.



