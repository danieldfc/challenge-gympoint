<h1 align="center">
    <img alt="GoStack" src="./web/src/assets/logo.svg" width="200px" />
</h1>

<h3 align="center">
  Desafio Gympoint
</h3>

<p align="center">Código do desafio para a conclusão do Bootcamp GoStack 🎓</p>


<p align="center">
  <a href="#-instalacao-e-execução">Instalação e execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>
</p>

## 🚀 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta rodando `cd challenge-gympoint`;
3. Rode `yarn` para instalar as dependências na pasta principal;
4. Entre em cada pasta que são: api, mobile e web, instale as dependencias. Exemplo: `cd api` e rode `yarn`;
5. Entre na pasta api com `cd api`, crie um arquivo `.env` na raíz, copie o conteúdo que tem no arquivo `.env.example` e cole no arquivo criado;
6. Refatore este arquivo *.env* nas variáveis ambiente que são: *DB_HOST=localhost*, *DB_USER=postgres* *DB_PASS=docker* e *DB_NAME=gympoint*.
7. Crie um container docker com a imagem postgres:11 com o sequinte comando: `docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -t -d postgres:11`, logo depois é preciso criar outro container mas será usada a imagem do redis, com o comando `docker run --name databaseredis -p 6379:6379 -t -d redis:alpine`;
8. Execute as migrations: `yarn sequelize db:migrate`;
9. Execute os seeders: `yarn sequelize db:seed:all`;
10. Com o comando `yarn dev` já é possível executar a api;
11. Execute este comando para iniciar a aplicação web: `cd ../web && yarn start`;
12. Rode `cd ../mobile && yarn react-native run-ios` ou `cd ../mobile && yarn react-native run-android` para executar a aplicação no mobile dependendo do SO.;

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

---

Feito com ♥ by Daniel Felizardo para Rocketseat :wave: [Entre na comunidade!](https://discordapp.com/invite/gCRAFhc)
