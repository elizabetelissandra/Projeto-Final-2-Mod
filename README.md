# 🏨 Arnia BNB

O **Arnia BNB** é uma aplicação fictícia de reservas de quartos de hotel, desenvolvida como **Projeto Final do Módulo 2** da formação da [Arnia Escola de Programação](https://arnia.com.br/).  
O sistema permite que hóspedes façam reservas, e que administradores gerenciem os quartos e acompanhem o status das reservas.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** / **NestJS**
- **TypeScript**
- **PostgreSQL**
- **TypeORM**
- **JWT** para autenticação
- **BCrypt** para criptografia de senhas

---

## 🏗️ Estrutura das Entidades

### 📦 Booking (Reserva)

- `id`: Identificador único  
- `checkin_date`: Data de entrada  
- `checkout_date`: Data de saída  
- `guests`: Número de hóspedes  
- `id_room`: Quarto reservado  
- `id_guest`: Hóspede que fez a reserva  
- `status`: "confirmada", "cancelada", "em andamento", "concluída"

### 🛏 Room (Quarto)

- `id`: Identificador único  
- `number`: Número do quarto  
- `type`: "individual", "duplo", "suíte"  
- `guest_capacity`: Capacidade de hóspedes  
- `daily_rate`: Valor da diária  
- `photo`: Imagem do quarto  
- `status`: "disponível", "ocupado", "em manutenção"

### 👤 Guest (Hóspede)

- `id`, `name`, `cpf`, `phone_number`, `email`, `password` (criptografada)  
- `bookings`: array de reservas do hóspede

### 👨‍💼 Admin (Gerente)

- `email`, `password` (criptografada)  
> ⚠ O cadastro de administradores é feito diretamente no banco de dados.

---

## 📚 Casos de Uso

### 👥 Hóspede

- **Cadastro**
  - Impede duplicidade de e-mail
  - Criptografa a senha
- **Login**
  - Verifica credenciais e gera token JWT
- **Listagem de reservas**
- **Cancelamento de reserva**
  - Permitido apenas se o status não for "em andamento"

### 🔐 Admin

- **Login** (via banco de dados)
- **Cadastro de quartos**
- **Alteração de status dos quartos**
  - Ex: “disponível”, “ocupado”, “em manutenção”
- **Listagem de quartos disponíveis**
  - Geral ou por data

### 🗓️ Reservas

- Verifica disponibilidade na data e capacidade do quarto
- Salva com status inicial “confirmado”

---

## 🔒 Autenticação

O sistema usa **JWT** para autenticação e autorização:

- **Rotas públicas**:
  - Cadastro e login de hóspedes
  - Listagem de quartos disponíveis

- **Rotas protegidas (JWT)**:
  - Para hóspedes: reservar quarto, ver/cancelar reservas  
  - Para administradores: cadastrar/editar quartos, alterar status

---

## ⚙️ Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/elizabetelissandra/Projeto-Final-2-Mod.git
   cd Projeto-Final-2-Mod

2.Instale as dependências:
  ```bash
   npm install
  ```
3. Configure o arquivo .env com suas variáveis:
  ```bash
  DATABASE_URL=postgres://usuario:senha@localhost:5432/arniabnb
  JWT_SECRET=sua_chave_secreta
  ```
4.Rode as migrations (se aplicável):
```bash
npx typeorm migration:run
```
5.Inicie o servidor:
```bash
npm run start:dev
```
## 🧾 Licença
Este projeto está sob a licença MIT.
Veja o arquivo LICENSE para mais detalhes.

## 👩‍💻 Autora
Desenvolvido por [Elizabete Lissandra](https://github.com/elizabetelissandra)

✉️ elizabetelissandra@gmail.com

