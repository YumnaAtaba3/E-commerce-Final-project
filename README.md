# 🛍️ Key-Work Final Project — E-Commerce Website (Frontend Only)

## 📋 Project Overview
A modern **frontend-only e-commerce website** built using React, focused on **UI/UX**, **state management**, and **frontend architecture**.  
No custom backend is implemented — all data is fetched from a mock API service.  
The project simulates a full online shopping experience including product browsing, authentication, cart management, and checkout.

---

## 🗂️ Data Source
All data is fetched from the **Platzi Fake Store API**:  
🔗 [https://fakeapi.platzi.com/en](https://fakeapi.platzi.com/en)

This mock API provides endpoints for:
- Products (title, price, description, images)
- Categories
- Authentication (mock login/register)
- Cart data simulation

---

## 🧩 Core Requirements Implemented
- **Home Page:** Featured categories, popular products, and promo sections.  
- **Product List:** Grid view with filters, sorting, and pagination.  
- **Product Details:** Product gallery, price, stock status, and add-to-cart.  
- **Cart:** Full cart system with add/update/remove, total calculation, and persistence via `localStorage`.  
- **Checkout:** Address and order review with mock confirmation.  
- **Authentication:** Login/Register flow with saved session.  
- **Search Modal:** Keyboard shortcut (`/`) and arrow key navigation.  
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.  
- **Route Protection:** Checkout route is restricted to logged-in users.  
- **Offers & Categories:** Category filters, breadcrumb navigation, and "On Sale" badges.  
- **Coupons System:** Users can apply discount codes for special offers.  
- **Animations:** Smooth transitions and motion effects across the interface.

---

## 🎨 Theme & Design
Custom theme designed based on the official **Figma Design System**:  
🔗 [Full E-Commerce Website UI/UX Design](https://www.figma.com/design/VvXcnKM6VUYD4mSdsejgtR/Full-E-Commerce-Website-UI-UX-Design--Community-?node-id=1-3)

Design highlights:
- Minimal and elegant UI  
- Defined typography and color tokens  
- Focused on accessibility and responsive breakpoints  
- **Framer Motion** animations for better UX  
- Consistent spacing, shadows, and visual hierarchy  

---

## 🧰 Tech Stack & Tools

| Category | Tool / Library | Description |
|-----------|----------------|--------------|
| **Framework** | [React 18](https://react.dev/) | Core UI library |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| **Routing** | [React Router](https://reactrouter.com/) | Client-side routing |
| **Styling/UI** | [Material-UI (MUI)](https://mui.com/) | Responsive design system |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Page and element animations |
| **HTTP Client** | [Axios](https://axios-http.com/) | Fetching data from API |
| **State Management** | React Context + LocalStorage | For authentication and cart persistence |

---

## ✨ Coupons Feature
The coupon system allows users to:
- Enter a **promo code** at checkout.  
- Receive a **discount** (percentage or fixed amount).  
- Instantly see updated totals and confirmation messages.  
- Handle invalid or expired coupons gracefully.

**Example:**

SAVE10 → 10% OFF
FREESHIP → Free Shipping

---

## 💫 Animations
Smooth animations and transitions enhance the overall experience using **Framer Motion**:
- Page transitions when navigating between routes  
- Hover and tap effects on buttons and product cards  
- Fade and scale animations for modals (cart, search)  
- Animated entry of UI elements on scroll or load  

These animations improve engagement while maintaining performance and accessibility.

---

## 🖼️ Screens Overview
The project includes the following pages:
- **Home**
- **About**
- **Product List**
- **Product Details**
- **Cart**
- **Checkout**
- **Login / Register**
- **404 Page**

---

## ⚙️ Setup & Run Locally

Follow these steps to set up and run the project:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YumnaAtaba3/E-commerce-Final-project.git

2️⃣ Navigate to the project folder
cd e-commerce-final-project

3️⃣ Install dependencies
npm install

4️⃣ Run the development server
npm run dev

5️⃣ Open in browser

Visit http://localhost:5173
 (or the port shown in your terminal).

👩‍💻 Developed by
Yumna Ataba