import React from 'react';

function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="text-center py-3 border-top mt-auto" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
      <small className="text-secondary">
        &copy; {ano} | Projeto de Design Front-End - Universidade da Madeira
      </small>
    </footer>
  );
}

export default Footer;