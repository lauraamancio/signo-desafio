<h1 align="center">:ballot_box: Desafio FullStack Signo :bar_chart:</h1>

<br>

## :dart: Objetivo do desafio:
Desafio FullStack proposto pela Signo Soluções Web. Nele tive que desenvolver um sistema de votação, com gerenciamento de enquete e atualizações em realtime. No **Backend** montei uma API usando MySQL e Node.JS com Express em Typescript, contendo todos os endpoints necessários para uma melhor aplicação no Front, fazendo um CRUD completo. Já no **Frontend** optei por usar React e jsx, styled components para melhor utilização do CSS puro, além de ter optado por desenvolve-lo em Mobile First, mantendo um site responsivo.

## :hammer_and_wrench: BackEnd
<br>

### Endpoints desenvolvidos:

- **Pegar todas as enquetes** 
- **Pegar enquete pelo ID** 
- **Pegar todos os votos** 
- **Cadastro usuário**
- **Login do usuário** 
- **Criar enquete** 
- **Votar na enquete** 
- **Editar enquete** 
- **Deletar enquete** 

### ⚙️ Funções e regras de negócio desenvolvidas:

- Utilizei o ***MySQL*** como Banco de Dados.
- ***Nickname de usuários ADMIN: "lauraamancio", "laura", "signo", "signo_web"***
- ***Senha de TODOS usuário já cadastrados: 1234567***
- No ***Cadastro Usuário***, o usuário precisa informar apenas um nickname e senha (deve conter no mínimo 7 dígitos). Faço a verificação se o nickname já está cadastrado no meu banco de dados, caso esteja, o cadastro é interrompido. Em caso de sucesso, o cadastro é relizado e um ID é atribuido ao Usuário (ID gerado pela biblioteca ***UUID***). Além disso é gerado um Token personalizado como resposta ao endpoint, este deve ser guardado no Local Storage para autenticação nos outros endpoints (Token gerado pela biblioteca ***Json web token***).
- Ainda no ***Cadastro Usuário***, atente-se que existem 2 tipos de usuários, os ADMIN e os NORMAL. Usuários ADMIN podem editar e deletar qualquer enquete, já os NORMAL, só podem editar e deletar enquetes que eles mesmos criaram. Essa validação é feita e composta pela Token personalizado.
Os Usuários que são ADMIN estão mocados num array dentro da pasta Mocks do backend, apenas para simular essa funcionalidade em mundo real.
- No ***Login Usuário*** usuário precisa informar seu nickname e senha, aqui também é erado um novo Token personalizado, enviado como resposta ao usuário.
- Para ***Pegar todas as enquetes*** o usuário precisa apenas informar o Token válido que é respondido no login ou signup.
- Para ***Pegar enquete pelo ID*** é necessário passar o Token de validação e o ID da enquete que deseja por params.
- Para ***Pegar todos os votos*** é necessário passar o Token de validação e o ID da enquete que deseja pegar os votos por params.
- Quando for ***Criar enquete*** é preciso passar o Token de validação, um title (título), uma start_date (data de início) e uma end_date (data de término). As datas devem seguir a ordem cronológica do tempo, não podendo começar no passado e nem terem data de término menor que a data de início. Não é necessário passar as respostas da votação, uma vez que são geradas automaticamente com as opções de: Concordo, Concordo Parcialmente, Discordo e Não sei opinar. (Aqui é o frontend que delimita receber apenas essas respostas do usuário)
- Para ***Votar na enquete*** é preciso do Token de validação e a resposta seguindo as opções de: *CONCORDO*, *CONCORDO PARCIALMENTE*, *DISCORDO*, *NÃO SEI OPINAR*. O usuário pode votar apenas 1 vez na enquete.
- Para ***Editar enquete***, um usuário NORMAL pode apenas editar as enquetes que ele mesmo criou, já um ADMIN pode editar todas as enquetes já criadas. Nesse endpoint também é preciso do Token de validação e usuário pode editar tanto o título, como as datas de início e término.
- ***Deletar enquete*** segue as mesmas regras do editar, usuários NORMAL só podem deletar enquetes que eles mesmos criaras, já os ADMIN podem deletar qualquer enquete. Ambos precisam do Token de validação.
<!-- - ***Deletar todos os votos*** é usado para poder deletar  -->

### :books: Documentação da API:
- [Acesse completa aqui!]()

### :desktop_computer: Linguagens e Bibliotecas usadas:
- Typescript;
- Node;
- Express;
- Knex;
- Cors;
- UUID;
<br>

## :paintbrush: FrontEnd
<br>



## :woman_technologist: Desenvolvido por:
[<img src="https://avatars.githubusercontent.com/u/98964160?v=4" width=115><br><sub>Laura Neves Amancio</sub>](https://www.linkedin.com/in/laura-amancio-9b3b8b168/)