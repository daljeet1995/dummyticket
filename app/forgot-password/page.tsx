'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
          }

          html, body {
            min-height: 100vh;
            background:
              linear-gradient(rgba(0, 53, 128, .75), rgba(0, 53, 128, .82)),
              url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop') !important;
            background-size: cover;
            background-position: center;
            overflow-x: hidden;
          }

          /* ================= HEADER ================= */
          .topbar {
            width: 100%;
            padding: 22px 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(0, 0, 0, .18);
            backdrop-filter: blur(12px);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
          }

          .logo {
            font-size: 34px;
            font-weight: 900;
            color: #fff;
            letter-spacing: .5px;
          }

          .logo img {
            height: 52px;
            width: auto;
            display: block;
            object-fit: contain;
          }

          .nav {
            display: flex;
            align-items: center;
            gap: 30px;
          }

          .nav a {
            color: #fff;
            text-decoration: none;
            font-size: 15px;
            font-weight: 600;
            transition: .3s;
            position: relative;
          }

          .nav a:hover {
            color: #ffb347;
          }

          .nav a::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -6px;
            width: 0%;
            height: 2px;
            background: #ffb347;
            transition: .3s;
            border-radius: 20px;
          }

          .nav a:hover::after {
            width: 100%;
          }

          /* ================= MAIN ================= */
          .main-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 140px 20px 40px;
          }

          /* ================= LOGIN BOX ================= */
          .login-box {
            width: 100%;
            max-width: 450px;
            background: rgba(255, 255, 255, .12);
            backdrop-filter: blur(18px);
            border: 1px solid rgba(255, 255, 255, .18);
            border-radius: 30px;
            padding: 45px 38px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, .35);
            animation: fadeIn .7s ease;
          }

          /* ================= TEXT ================= */
          .login-title {
            text-align: center;
            font-size: 32px;
            font-weight: 800;
            color: #fff;
            margin-bottom: 12px;
          }

          .login-subtitle {
            text-align: center;
            font-size: 15px;
            line-height: 1.7;
            color: rgba(255, 255, 255, .82);
            margin-bottom: 35px;
          }

          /* ================= INPUTS ================= */
          .input-group {
            position: relative;
            margin-bottom: 22px;
          }

          .input-group i {
            position: absolute;
            top: 50%;
            left: 18px;
            transform: translateY(-50%);
            color: #7dc3ff;
            font-size: 15px;
          }

          .input-group input {
            width: 100%;
            height: 60px;
            border: none;
            outline: none;
            border-radius: 18px;
            padding: 0 18px 0 52px;
            background: rgba(255, 255, 255, .14);
            color: #fff;
            font-size: 15px;
            border: 1px solid rgba(255, 255, 255, .14);
            transition: .3s;
          }

          .input-group input::placeholder {
            color: rgba(255, 255, 255, .68);
          }

          .input-group input:focus {
            border-color: #4da3ff;
            background: rgba(255, 255, 255, .18);
            box-shadow: 0 0 0 4px rgba(77, 163, 255, .15);
          }

          /* ================= BUTTONS ================= */
          .login-btn {
            width: 100%;
            height: 60px;
            border: none;
            border-radius: 18px;
            background: linear-gradient(135deg, #ff7b00, #ff9800);
            color: #fff;
            font-size: 16px;
            font-weight: 800;
            cursor: pointer;
            transition: .35s;
            box-shadow: 0 15px 35px rgba(255, 123, 0, .35);
          }

          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 45px rgba(255, 123, 0, .45);
          }

          /* ================= MESSAGE BOX ================= */
          .message-box {
            padding: 14px 18px;
            border-radius: 16px;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 22px;
            backdrop-filter: blur(10px);
            animation: fadeError .4s ease;
          }

          .message-box.error {
            background: rgba(255, 77, 77, .18);
            border: 1px solid rgba(255, 77, 77, .45);
          }

          .message-box.success {
            background: rgba(0, 200, 83, .18);
            border: 1px solid rgba(0, 200, 83, .45);
          }

          .back-home {
            display: flex;
            justify-content: center;
            margin-top: 18px;
          }

          .back-home a {
            text-decoration: none;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            transition: .3s;
          }

          .back-home a:hover {
            color: #ffcc80;
          }

          /* ================= FOOTER ================= */
          .login-footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: rgba(255, 255, 255, .8);
          }

          /* ================= ANIMATIONS ================= */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeError {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* ================= MOBILE ================= */
          @media(max-width:768px) {
            .topbar {
              padding: 18px 20px;
              flex-direction: column;
              gap: 14px;
            }
            .logo {
              font-size: 28px;
            }
            .logo img {
              height: 42px;
            }
            .nav {
              gap: 18px;
              flex-wrap: wrap;
              justify-content: center;
            }
            .main-wrapper {
              padding-top: 170px;
            }
            .login-box {
              padding: 35px 25px;
              border-radius: 24px;
            }
            .login-title {
              font-size: 28px;
            }
          }

          @media(max-width:480px) {
            .nav {
              gap: 14px;
            }
            .nav a {
              font-size: 14px;
            }
            .login-title {
              font-size: 24px;
            }
          }

          /* Fix for Next.js root div */
          #__next, .main-wrapper {
            min-height: 100vh;
          }
        `
      }} />

      {/* HEADER */}
      <div className="topbar">
        <div className="logo">
          <img src="/uploads/logo/1779185741_170832771914716749091707118119%20(2).png" alt="Logo" />
        </div>
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
      </div>

      {/* FORGOT PASSWORD */}
      <div className="main-wrapper">
        <div className="login-box">
          <div className="login-title">Forgot Password</div>
          <div className="login-subtitle">
            Enter your registered email address and we will send you a secure reset password link.
          </div>

          {message && (
            <div className={`message-box ${messageType}`}>{message}</div>
          )}

          <form method="POST" onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fa-solid fa-envelope"></i>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter Registered Email Address" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">
              Send Reset Link
            </button>
          </form>

          <div className="back-home">
            <Link href="/check-status">← Back To Login</Link>
          </div>

          <div className="login-footer">
            © 2026 DummyFlight | Powered by Tsbizz
          </div>
        </div>
      </div>
    </>
  );
}