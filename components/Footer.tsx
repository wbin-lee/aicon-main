export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* First div - split horizontally */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Left div - DS AI Week 2025 */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-white">DS AI Week 2025</h3>
          </div>
          
          {/* Right div - Reference sites */}
          <div className="text-right">
            <h4 className="text-lg font-semibold text-gray-300 mb-3">참고 사이트</h4>
            <div className="space-y-2">
              <div>
                <a 
                  href="#" 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                >
                  DDCON23
                </a>
              </div>
              <div>
                <a 
                  href="#" 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                >
                  DDCON24
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Second div - Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-400 text-sm">
            ⓒ 2025 S/W Culture Office. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 