import React from "react";

export default function Footer() {
  return (
    <footer className="bg-support border-top-gray">
      <div className="footer-container">
        <div>
          <img className="footer-logo" src="/logo.png" alt="logo" />
        </div>
        <p id="tagline">Sync, Share, and Shop Together.</p>

        <table>
          <tbody>
            <tr>
              <th>Features</th>
              <th>Resources</th>
              <th>Company</th>
              <th>Get Started</th>
            </tr>
            <tr>
              <td>Why SyncList</td>
              <td>SyncList News</td>
              <td>About Us</td>
              <td>Sign Up for free</td>
            </tr>
            <tr>
              <td>How it works</td>
              <td>Product Updates</td>
              <td>Careers</td>
              <td>Log In</td>
            </tr>
            <tr>
              <td>Forum</td>
              <td>Help Center</td>
              <td>Press </td>
            </tr>
            <tr>
              <td></td>
              <td>Contact Us</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="social-icons">
          <i className="text-dark fa-brands fa-facebook"></i>
          <i className="text-dark fa-brands fa-twitter"></i>
          <i className="text-dark fa-brands fa-youtube"></i>
          <i className="text-dark fa-brands fa-instagram"></i>
        </div>

        <p className="copyright text-dark-gray">© 2025 Nataliia Amons</p>
      </div>
    </footer>
  );
}
