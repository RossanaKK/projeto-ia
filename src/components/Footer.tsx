import React from 'react';

function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="p-3 text-center bg-light border-top mt-auto">
      <small>&copy; {ano} | Projeto IA</small>
    </footer>
  );
}

export default Footer;