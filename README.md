
# 🚀 BioPay - Fingerprint-Based Digital Payment System

A modern fingerprint-based digital payment system prototype built using **React, TypeScript, Vite, Tailwind CSS, and shadcn-ui**.

## 📌 About BioPay

BioPay is a bank-free, fingerprint-based digital payment system that allows users to make secure payments using just their fingerprint. This prototype simulates all key features in software, without requiring actual hardware integration.

### Key Features

- **Simulated Fingerprint Login** - Secure access with simulated biometric authentication
- **No Bank Dependency** - Fully wallet-based system that operates independently
- **Contactless Transactions** - IoT-inspired interface for seamless digital payments
- **High Security** - Advanced encryption and fraud detection systems

## 🛠️ Installation & Setup  

Follow these steps to set up the project locally:  

### **1️⃣ Clone the Repository**  

```sh
git clone <YOUR_GIT_URL>
cd biopay
```

### **2️⃣ Install Dependencies**  

```sh
npm install
```

### **3️⃣ Run the Development Server**  

```sh
npm run dev
```

The app will be available at **`http://localhost:5173/`** (default Vite port).  

## 📂 Project Structure  

```sh
📦 biopay
 ┣ 📂 src
 ┃ ┣ 📂 components  # Reusable UI components
 ┃ ┣ 📂 pages       # Application pages
 ┃ ┣ 📂 assets      # Static assets (images, icons, etc.)
 ┃ ┣ 📜 main.tsx    # Entry point
 ┃ ┣ 📜 App.tsx     # Root component
 ┣ 📜 package.json  # Dependencies & scripts
 ┣ 📜 tailwind.config.js  # Tailwind CSS configuration
 ┣ 📜 vite.config.ts # Vite configuration
 ┗ 📜 README.md      # Project documentation
```

## 🎮 Demo Pages

- **Landing Page**: Introduces BioPay with key features and benefits
- **Fingerprint Scan**: Simulates fingerprint scanning for authentication and payments
- **Dashboard**: User dashboard with transaction history and account balance
- **Payments**: Make and request payments using fingerprint verification
- **Transactions**: View detailed transaction history
- **Profile**: Manage user profile and settings

## 🚀 Deployment  

You can deploy the project using **Vercel** or **Netlify**:  

### **Deploy on Vercel**  

```sh
npm install -g vercel
vercel
```

### **Deploy on Netlify**  

1. Push the project to **GitHub**  
2. Connect the repo to **Netlify**  
3. Set the build command to `npm run build`  

## 📝 Contributing  

Contributions are welcome! Feel free to open a **pull request** or create an **issue**.  

## 📜 License  

This project is **open-source** and available under the **MIT License**.
