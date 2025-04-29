
import { Link } from "react-router-dom";

const DashboardFooter = () => {
  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">tvstanici</h3>
            <p className="text-sm text-blue-200">
              Your go-to platform for all your TV streaming needs. Watch your favorite channels anytime, anywhere.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="text-blue-200 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/channels" className="text-blue-200 hover:text-white">All Channels</Link>
              </li>
              <li>
                <Link to="/guide" className="text-blue-200 hover:text-white">TV Guide</Link>
              </li>
              <li>
                <Link to="/account" className="text-blue-200 hover:text-white">Account Settings</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-blue-200 hover:text-white">Help Center</Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-blue-200 hover:text-white">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-sm text-blue-300">
          <p>© {new Date().getFullYear()} tvstanici. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
