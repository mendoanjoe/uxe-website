import { useState } from 'react';
import Link from 'next/link';

const Menu = () => {
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);
  const [isGovernmentsOpen, setIsGovernmentsOpen] = useState(false);

  return (
    <nav className="menu">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About UXE</Link>
        </li>
        <li
          onMouseEnter={() => setIsSolutionOpen(true)}
          onMouseLeave={() => setIsSolutionOpen(false)}
        >
          <span>Solution</span>
          {isSolutionOpen && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h3>Governments</h3>
                <p>All-in-One Security Platform</p>
                <p>Centralized Surveillance</p>
                <div
                  onMouseEnter={() => setIsGovernmentsOpen(true)}
                  onMouseLeave={() => setIsGovernmentsOpen(false)}
                >
                  {isGovernmentsOpen && (
                    <div className="submenu">
                      <h4>Solutions</h4>
                      <ul>
                        <li>
                          <Link href="/video-guard">Video guard</Link>
                        </li>
                        <li>
                          <Link href="/e-guard">E-guard</Link>
                        </li>
                        <li>
                          <Link href="/securepath">Securepath</Link>
                        </li>
                      </ul>
                      <h4>Product</h4>
                      <ul>
                        <li>
                          <Link href="/container-tracker">
                            Container Tracker
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="dropdown-column">
                <h3>Business</h3>
                <p>Transforming Security with Smart Technology</p>
              </div>
            </div>
          )}
        </li>
        <li>
          <Link href="/csr">CSR</Link>
        </li>
        <li>
          <Link href="/media-center">Media Center</Link>
        </li>
        <li>
          <Link href="/careers">Careers</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
