🚀 **How to Run the Project Locally**

## 📁 1. Clone the Repository

## 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```
### Update the .env file with your credentials:
```
POSTGRES_USERNAME=your_db_username
POSTGRES_PASSWORD=your_db_password
POSTGRES_DATABASE=leucine_db
SECRET=your_jwt_secret_here
PORT=3000
```
### Database Setup
```
# Create PostgreSQL database (run in psql or PGAdmin)
CREATE DATABASE leucine_db;
```
## 3. Front End setup
```
cd ../frontend/leucine_FE
npm install
npm run dev
```
