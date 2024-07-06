### Instructions to Build and Run the Mobile App

#### Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

2. **Expo CLI**: Install Expo CLI globally by running:
   ```bash
   npm install -g expo-cli
   ```

3. **Git**: Ensure you have Git installed. You can download it from [Git official website](https://git-scm.com/).

4. **Android/iOS Emulator or Physical Device**: 
   - For Android: Install Android Studio and set up an Android emulator.
   - For iOS: Use Xcode and set up an iOS simulator.
   - Alternatively, you can use a physical device with the Expo Go app installed (available on both Google Play Store and Apple App Store).

#### Setup Instructions

1. **Clone the Repository**:
   Clone the project repository from GitHub:
   ```bash
   git clone <your-repository-url>
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd <project-directory>
   ```

3. **Install Dependencies**:
   Install the project dependencies by running:
   ```bash
   npm install
   ```

#### Running the App

1. **Start the Expo Server**:
   Run the Expo development server:
   ```bash
   expo start
   ```

2. **Open the App**:
   - **Using an Emulator**:
     - If you have an Android emulator running, you can press `a` in the terminal to open the app on the Android emulator.
     - If you have an iOS simulator running, you can press `i` in the terminal to open the app on the iOS simulator.
   - **Using a Physical Device**:
     - Open the Expo Go app on your device.
     - Scan the QR code displayed in the terminal or browser after running `expo start`.

#### Testing the App

1. **User Registration and Login**:
   - Open the app.
   - Register a new user by providing a username, email, and password.
   - Log in with the registered credentials.

2. **Journal Entry Management**:
   - Create a new journal entry by providing a title, content, category, and date.
   - View the list of all journal entries.
   - Edit or delete existing journal entries.

3. **Categorization and Summary View**:
   - Categorize journal entries by different categories like Personal, Work, Travel, etc.
   - View a summary of journal entries over selected periods (daily, weekly, monthly).

4. **User Settings**:
   - Update the username and password from the settings screen.

#### Project Structure

```
<project-directory>/
├── App.tsx
├── src/
│   ├── api/
│   │   └── api.ts
│   ├── components/
│   │   ├── EntryItem.tsx
│   │   └── ... (other components)
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ... (other screens)
│   └── ... (other folders and files)
├── package.json
├── tsconfig.json
└── ... (other configuration files)
```

### Summary

By following the instructions above, you should be able to set up, build, and run the mobile app using Expo. The app provides functionalities for user authentication, journal entry management, categorization, summary view, and user settings, ensuring a comprehensive personal journaling experience.