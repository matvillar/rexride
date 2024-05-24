import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex w-full relative bottom-0 text-center  justify-center items-center gap-2 text-gray-500 p-5">
      <p>&copy; {currentYear} RexRide App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
