/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom"; // <-- use react-router-dom Link for SPA navigation

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ridex</h3>
            <p className="text-gray-400">
              Your trusted partner for quality car rentals. Experience comfort
              and reliability on every journey.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <Link to="/rides" className="hover:text-gray-400">
                Explore Cars
              </Link>

              <li>
                <Link to="/payment" className="hover:text-gray-400">
                  Payment
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Rental Street</li>
              <li>Kothrud, Pune 10001</li>
              <li>Phone: (+91) 8908125125</li>
              <li>Email: info@carrental.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
              <li>Saturday: 9:00 AM - 6:00 PM</li>
              <li>Sunday: 10:00 AM - 4:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Car Rental. All rights reserved. @Abhay
            DCP
          </p>
        </div>
      </div>
    </footer>
  );
}
