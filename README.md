
# 🚀 BioPay - Palm Vein Authentication Digital Payment System

A modern biometric payment system prototype built using **React, TypeScript, Vite, Tailwind CSS, and shadcn-ui**. This prototype simulates palm vein authentication for secure, bank-free digital payments.

## 📌 About BioPay

BioPay is a bank-free, biometric-based digital payment system that allows users to make secure payments using just their palm vein pattern. This prototype simulates all key features in software, without requiring actual hardware integration.

### Key Features

- **Simulated Palm Vein Authentication** - Secure access with simulated biometric authentication
- **No Bank Dependency** - Fully wallet-based system that operates independently
- **Split Interface** - Separate vendor and user panels for payment requests and processing
- **Contactless Transactions** - IoT-inspired interface for seamless digital payments
- **High Security** - Advanced encryption and fraud detection systems
- **Multiple Bank Support** - Integration with various bank accounts (SBI, HDFC, ICICI, etc.)

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
- **Palm Vein Scan**: Simulates palm vein scanning for authentication and payments
- **Vendor/User Interface**: Split-screen interface for creating and processing payments
- **Dashboard**: User dashboard with transaction history and account balance
- **Payments**: Make and request payments using palm vein verification
- **Transactions**: View detailed transaction history
- **Profile**: Manage user profile and settings

## 🧩 Key Components

- **PalmVeinScanner**: Simulates a real-time palm vein scanning interface with animations
- **Payment Forms**: Dual interface for vendors and users to create/process payments
- **Transaction Confirmation**: Detailed payment receipt with all relevant information
- **Bank Selection**: Support for multiple Indian banks

## 🌈 Design Features

- **Glassmorphism UI**: Modern transparent glass-like interface elements
- **Biometric Animations**: Simulated scanning animations for palm vein recognition
- **Split-Panel Interface**: Clear separation between vendor and user functions
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Interactive Elements**: Smooth hover effects and transitions

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
