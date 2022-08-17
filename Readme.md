# Comandos para rodar via docker

- docker build -t app .
- docker run --name app -p 3333:3333 -d app

- Obs: cada modificação no codigo precisa refazer o build do docker.

# Para executar fora do docker

Abrir a pasta do projeto e executar:

- yarn: para instalação das dependencias
- yarn dev : para executar o ambiente de dev

# Rotas

- get /products -> retorna a lista de produtos cadastradas
  caso passe um filtro "name" -> retorna todos os produtos que possuem aquele nome\*

- post /products -> cadastra um novo produto (caso já exista\*, retornará um erro)

\*ignorando Case e caracteres especiais
