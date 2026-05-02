import React from 'react';

function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-dark text-secondary text-center py-3 mt-auto shadow-sm">
      <small>
        &copy; {ano} | Projeto IA
      </small>
    </footer>
  );
}

export default Footer;