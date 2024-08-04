import React from "react";

// Footer section
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <h3>BlogHog</h3>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
