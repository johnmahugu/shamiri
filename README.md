# Shamiri 
Shamiri Health Journaling App

## Project Overview

The Shamiri Health Journaling App is a mobile application and backend service designed for users to write, categorize, and manage their journal entries. The application includes features such as user authentication, journal entry management, categorization, summary views, and user settings. The mobile app is built using React Native and Expo with TypeScript, and the backend service is implemented using Node.js with Express and SQLite.

## Features

### Mobile Application
- **User Authentication**: Sign up and log in functionality.
- **Journal Entry Management**: Create, edit, and delete journal entries with title, content, category, and date.
- **Journal View**: View a list of all journal entries.
- **Categorization**: Categorize entries (e.g., Personal, Work, Travel).
- **Summary View**: Display a summary of entries over a selected period (daily, weekly, monthly).
- **Settings**: Update username and password.
- **Design**: Simple and intuitive UI focusing on usability and clarity.

### Backend Service
- **User Management**: User registration and authentication (JWT-based).
- **Profile Management**: Update user profile details.
- **Journal Entry Management**: CRUD operations for journal entries.
- **Categorization**: Categorize journal entries.
- **Data Summary**: Fetch summary data for given periods.
- **Security**: Secure endpoints accessible only by authenticated users.

## Project Structure

```
<project-directory>/
├── backend/
│   ├── index.js
│   ├── setup_database.js
│   ├── populate_database.js
│   ├── clear_database.js
│   ├── package.json
│   └── ... (other backend files)
├── mobile/
│   ├── App.tsx
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts
│   │   ├── components/
│   │   │   ├── EntryItem.tsx
│   │   │   └── ... (other components)
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── SettingsScreen.tsx
│   │   │   └── ... (other screens)
│   │   └── ... (other folders and files)
│   ├── package.json
│   ├── tsconfig.json
│   └── ... (other configuration files)
└── ... (other project files)
```

## Setup Instructions

### Backend Service

#### Prerequisites
- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **SQLite3**: [Download and install SQLite](https://www.sqlite.org/)

#### Steps
1. **Clone the Repository**:
   ```bash
   git clone <your-repository-url>
   ```
2. **Navigate to the Backend Directory**:
   ```bash
   cd <project-directory>/backend
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Set Up the Database**:
   ```bash
   node setup_database.js
   ```
5. **Populate the Database (Optional)**:
   ```bash
   node populate_database.js
   ```
6. **Start the Server**:
   ```bash
   node index.js
   ```
7. **Access the API**: The backend service should now be running on `http://localhost:8000`.

### Mobile Application

#### Prerequisites
- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **Expo CLI**: Install globally by running:
  ```bash
  npm install -g expo-cli
  ```
- **Git**: [Download and install Git](https://git-scm.com/)
- **Android/iOS Emulator or Physical Device**:
  - For Android: Install Android Studio and set up an Android emulator.
  - For iOS: Use Xcode and set up an iOS simulator.
  - Alternatively, use a physical device with the Expo Go app installed.

#### Steps
1. **Clone the Repository**:
   ```bash
   git clone <your-repository-url>
   ```
2. **Navigate to the Mobile Directory**:
   ```bash
   cd <project-directory>/mobile
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Expo Server**:
   ```bash
   expo start
   ```
5. **Open the App**:
   - **Using an Emulator**:
     - For Android, press `a` in the terminal.
     - For iOS, press `i` in the terminal.
   - **Using a Physical Device**:
     - Open the Expo Go app and scan the QR code.

## API Documentation

### Authentication
- **Register**: `POST /auth/register`
  - Body: `{ "username": "testuser", "email": "testuser@example.com", "password": "password123" }`
- **Login**: `POST /auth/token`
  - Body: `{ "username": "testuser", "password": "password123" }`

### Journal Entries
- **Create Entry**: `POST /journal`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "title": "My First Entry", "content": "This is the content of my first entry.", "category": "Personal", "date": "2024-07-07" }`
- **Get Entries**: `GET /journal`
  - Headers: `Authorization: Bearer <token>`
- **Update Entry**: `PUT /journal/<entry_id>`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "title": "Updated Entry", "content": "This is the updated content.", "category": "Work" }`
- **Delete Entry**: `DELETE /journal/<entry_id>`
  - Headers: `Authorization: Bearer <token>`

### Summary
- **Get Summary**: `GET /summary/<period>`
  - Headers: `Authorization: Bearer <token>`

## Feedback

The project implementation covered various essential features and demonstrated proficiency in both frontend and backend development. It provided a comprehensive understanding of integrating a mobile application with a backend service, focusing on usability, security, and performance. The setup instructions, documentation, and code structure were crafted to ensure ease of understanding and use. 

If you have any questions or feedback, feel free to reach out. Thank you!
