## Sprint 01 (De 03 a 09/05) 
Sprint inicial
```plaintext
 [x] Setup inicial - Estrutura de pastas e arquivos básicos
 [x] Criação de repositório no Github
 [x] Configurações de Banco de Dados
 [x] Criação de um servidor básico no Express
 [x] Criação do middleware de validação
 [x] Criar entidades (interfaces)
 [x] Criar models
 [x] 1. Cadastro do Hóspede - POST /guests
         - Criptografar a senha (Provider de criptografia)
 [x] 2. Login do Hóspede - POST /guests/auth
         - Comparar senhas criptografada com senha da requisição
         - Utilizar JWT (Provider de Token)
         - Como diferenciar um token de hóspede de um token de gerente? 🤔
 [x] 3. Login de Gerente - POST /admin/auth
         - Cadastrar um gerente no banco de dados
         - Vale a pena ter dois middleware diferentes pra algo tão parecido??? 🤔
```

## Sprint 02 (De 10 a 16/05) 
Sprint intermediária 01
```plaintext
[x] Cadastro de quarto - POST /rooms
[x] Alterar status quarto - PATCH /rooms/:id
[x] Listar todos os quartos - GET /rooms?status=disponível
[ ] Listar todos os quartos por data- GET /rooms?start_date=04-10-2024&end_date=04-15-2024
```

## Sprint 03 (De 17 a 23/05) 
Sprint intermediária 02
```plaintext
 [ ] 8. Reservar quarto (ROTA PRIVADA)
[ ] 9. (OPCIONAL) Listar todas as reservas para o hóspede (ROTA PRIVADA)
[ ] 10. Cancelar reserva (ROTA PRIVADA)
```

## Sprint 04 (De 24 a 02/05) 
Sprint final
```plaintext
 [ ] Deploy 🚀
```
