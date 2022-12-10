# Cadastro de Carro

**RF** => Requisitos funcionais

- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

**RN** => Regra de negócio

- Não deve ser possível cadastrar um carro uma placa já existente.
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carro

**RF** => Requisitos funcionais

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome da marca
- Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RN** => Regras de negócio
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF** => Requisitos funcionais

- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros

**RN** => Regras de negócio

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF** => Requisitos funcionais

- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**RNF** => Requisitos não funcionais

- Utilizar o multer para upload dos arquivos.

**RN** => Regras de negócio

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF** => Requisitos funcionais

- Deve ser possível cadastrar um aluguel.

**RN** => Regras de negócio

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel, o status deverá ser alterado para indisponível.

# Devolução de carro

**RF**

- Deve ser possível realizar a devolução de um carro

**RN**

- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação

# Listagem de aluguéis para usuário

**RF**

- Deve ser possível realizar a busca de todos os aluguéis para o usuário

**RN**

- O usuário deve estar logado na aplicação
