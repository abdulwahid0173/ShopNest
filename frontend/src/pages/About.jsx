import React from 'react';
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    background: '#18181b',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    textAlign: 'center'
  };

  const socialBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    margin: '10px',
    minWidth: '170px',
    padding: '12px 18px',
    background: '#27272a',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    lineHeight: 1,
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <div style={containerStyle}>
      <img
        src="/w.jpg"
        alt="@_abdulwahid02"
        style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f97316', marginBottom: '20px', boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)' }}
      />
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#fff' }}>About Me</h2>
      <h3 style={{ fontSize: '1.5rem', color: '#f97316', marginBottom: '15px' }}>Abdul Wahid (@_abdulwahid02)</h3>

      <p style={{ color: '#a1a1aa', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 30px auto' }}>
        Every journey starts with a single step. Thanks for visiting my portfolio. I hope you enjoy exploring my work and getting to know me better.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <a href="https://instagram.com/_abdulwahid02" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: "rgba(236, 72, 153, 0.2)", borderColor: "#ec4899", color: "#ec4899" }}><FaInstagram size={20} /> Instagram</a>

        <a href="https://www.linkedin.com/in/abdul-wahid02/" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: "rgba(59, 130, 246, 0.2)", borderColor: "#3b82f6", color: "#3b82f6" }}><FaLinkedin size={20} /> LinkedIn</a>

        <a href="https://x.com/_abdulwahid01" target="_blank" rel="noreferrer" style={socialBtnStyle}><FaXTwitter size={20} /> (Twitter)</a>

        <a href="https://www.facebook.com/abdulwahid020" target="_blank" rel="noreferrer" style={socialBtnStyle}><FaFacebook size={20} /> Facebook</a>

        <a href="https://github.com/abdulwahid0173" target="_blank" rel="noreferrer" style={socialBtnStyle}><FaGithub size={20} /> GitHub</a>
      </div>
    </div>
  );
};

export default About;
