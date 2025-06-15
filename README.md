# Site de cadastro e consulta de produtos

![image](https://github.com/user-attachments/assets/a4f98bb0-6d5e-4478-958c-3949fa07f602)

### :books: Descrição
<p>Projeto de site fullstack desenvolvido com o Turborepo com os subprojetos de API e web site criados usando os frameworks NestJS e React. O framework de estilização é o Tailwind CSS e a linguagem de programação de todo o projeto é o TypeScript</p>
<p>Este projeto consiste em cadastrar produtos no banco de dados MongoDB e listar os produtos. No Backend, no momento do cadastro, existem rotinas para atualização de cache no banco de dados Redis e disparo de web socket para notificar o frontend de que um novo produto foi cadastrado. A listagem de produtos leva como prioridade o retorno dos produtos pela cache do Redis, caso ela esteja vazia, os produtos são buscados no MongoDB e a cache é preenchida. No frontend, é possível buscar por categoria, fazendo as devidas chamadas no backend, usar o scroll infinito na página para evitar o carregamento de todos os produtos e encher a memória RAM do dispositivo que esteja acessando o site.</p>
<p>Ao clicar sobre algum card de produto, um modal é exibido com maiores informações.</p>


![image](https://github.com/user-attachments/assets/07f1774c-5ed8-443d-ae37-074d7e0d50c7)


### :hammer_and_wrench: Instalação e Execução
Para acessar o site, basta clicar no redirecionamento abaixo. é válido ressaltar que pelo projeto estar hospedado em servidor gratuito, o primeiro acesso é mais lento pelo fato da máquina estar inativa.
- [Acesse o site](https://product-system-fhmb-web.onrender.com/)
  
A API possui algumas rotas, ela não oferece documentação swagger:
- GET Lista todos os produtos: https://product-system-fhmb.onrender.com/api/products/list
- GET Lista produtos por categoria: https://product-system-fhmb.onrender.com/api/products/list?category=computador
- GET Lista paginada de produtos: https://product-system-fhmb.onrender.com/api/products/list?page=1&limit=10
- GET Lista paginada de produtos por categoria: https://product-system-fhmb.onrender.com/api/products/list?page=1&limit=10&category=computador
- POST Cadastra produto: https://product-system-fhmb.onrender.com/api/products/add
```
  curl --location 'https://product-system-fhmb.onrender.com/api/products/add' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Apple 2b",
    "category": "computador",
    "quantity": 1,
    "price": 1000.79,
    "description": "Computador da Apple lançado em 1982"
}'
```

#### Preparação do ambiente de desenvolvimento
- [NodeJS](https://nodejs.org/en/download)
- [Visual Studio Code](https://code.visualstudio.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Redis Cloud](https://redis.io/cloud/)
- [AMRITB - para testar o Web Socket](https://amritb.github.io/socketio-client-tool/)
- [Render - nuvem escolhida para deploy](https://render.com/)

Observações: O projeto funciona sob o NodeJS, procure instalar uma versão igual ou superior a 20, no ambiente usado para desenvolvimento foi usado a versão 20.14. Para o editor de texto, foi sugerido o VSCode, mas pode usar outros como o Sublime.

Clone o repositório em seu computador para poder acessar o projeto:
```
https://github.com/flaviobergamini/product-system.git
```
Para acessar o repositório clonado usando o terminal, digite: 
```
cd product-system
```
Antes de executar o projeto, é necessário baixar todas as dependências (Turborepo, NestJS e React), para isso execute o comando abaixo na raiz do projeto, depois nas pastas apps/api e apps/web:
```
npm install
```

O projeto segue basicamente a seguinte estrutura de pastas, sendo que qualquer subprojeto sempre deve ficar na pasta apps: 

```
product-system/
├─ apps/
│  ├─ api/           ← NestJS
│  └─ web/           ← React + Tailwind
├─ packages/
├─ README.md
├─ package.json
└─ turbo.json
```

### :computer: Iniciando Projeto
Antes de iniciar o projeto, crie os arquivos .env:
- para a API, será necessário as credenciais para:
```
DATABASE_URL=
REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
```

- para o web site, é necessário a URL da API:
```
VITE_API_URL=
```

- Para iniciar o projeto localmente, esteja pasta raiz do projeto "product-system", é necessário pois será executado o backend e frontend juntos
```
npm run dev
```
![image](https://github.com/user-attachments/assets/9bac3d37-54db-4bed-99aa-ee0d24146f9d)
![image](https://github.com/user-attachments/assets/c4b902e3-4b0c-4db2-aa5f-100a526e9537)

- O deploy no Render é feito de maneira automática a cada alteração por commit ou merge na branch main. Para esse servidor, é dispensado o uso das pipelines tradicionais, pois ele verifica o repositório diretamente.
- Apesar de ser um único projeto, a API e o Web site tiveram que ser publicados separadamente pois o Render não suporta múltiplas portas:
![image](https://github.com/user-attachments/assets/54261f37-f712-4095-82b1-94148221a1b2)

-Os logs dos dois serviços podem ser verificados na opção Logs dentro do menu lateral esquerdo quando entra no serviço: 
![image](https://github.com/user-attachments/assets/bf009f81-2b39-4c14-be9b-0d0a8adbe18f)

 
## :question: Dúvidas
Envie um email ao desenvolvedor: fhmbergamini@hotmail.com

## :gear: Autor

* **Flávio Henrique Madureira Bergamini** - [Flávio](https://github.com/flaviobergamini)
