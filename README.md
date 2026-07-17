# 🚀 Nguyen Ngoc Viet Thang - Business Analyst Portfolio

Welcome to my personal portfolio website! This project is a modern, highly interactive web application built to showcase my skills, experience, and projects as a Business Analyst.

## ✨ Features

- **Modern UI/UX**: Sleek, dark-themed design with "liquid glass" elements and carefully chosen typography.
- **Smooth Animations**: Powered by GSAP (GreenSock) for high-performance scroll triggers, reveal effects, and a custom typewriter hero animation.
- **Responsive Design**: Flawlessly adapts to any screen size, from desktop monitors to mobile phones.
- **Working Contact Form**: Integrated with Web3Forms for seamless, serverless background email delivery straight to my inbox, complete with success/error handling UI.
- **Dynamic Progress Bars**: Skill levels visually represented with engaging load-in animations.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React
- **Email Service**: Web3Forms API

## 💻 Getting Started

Follow these steps to run the project locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/NguyenNgocVietThang/portfolio.git
cd portfolio/app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the `app` directory to enable the contact form:
```env
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```
*(Get a free key at [web3forms.com](https://web3forms.com) if you want to test the email sending functionality)*

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## 🚀 Deployment

This project is fully strictly typed and optimized for deployment on platforms like **Render**, **Vercel**, or **Netlify**. 
- Build command: `npm run build` (runs `tsc -b && vite build`)
- Publish directory: `dist`

## 📄 Contact

- **Email**: thangnnv2003@gmail.com
- **GitHub**: [@NguyenNgocVietThang](https://github.com/NguyenNgocVietThang)

---
*Crafted with ❤️ by Nguyen Ngoc Viet Thang*
