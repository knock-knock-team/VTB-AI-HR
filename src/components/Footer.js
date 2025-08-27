function Footer() {
  try {
    return (
      <footer className="bg-[var(--text-primary)] text-white py-12" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)] flex items-center justify-center">
                  <div className="icon-brain text-xl text-white"></div>
                </div>
                <span className="ml-3 text-xl font-bold">HR Avatar</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Революционная платформа для автоматизации процесса подбора персонала с помощью искусственного интеллекта.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Платформа</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="recruiter.html" className="hover:text-white transition-colors">Для рекрутеров</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">Процесс работы</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <div className="icon-mail text-lg mr-2"></div>
                  <span>support@hravatar.ru</span>
                </div>
                <div className="flex items-center">
                  <div className="icon-phone text-lg mr-2"></div>
                  <span>+7 (495) 123-45-67</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HR Avatar. Все права защищены.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}