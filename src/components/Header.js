function Header() {
  try {
    const handleNavigation = (page) => {
      if (page === 'recruiter') {
        window.location.href = 'recruiter.html';
      } else if (page === 'candidate') {
        window.location.href = 'candidate.html';
      }
    };

    return (
      <header className="bg-white border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)] flex items-center justify-center">
                <div className="icon-brain text-xl text-white"></div>
              </div>
              <span className="ml-3 text-xl font-bold text-[var(--text-primary)]">HR Avatar</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Возможности
              </a>
              <a href="#process" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Процесс
              </a>
              <button 
                onClick={() => handleNavigation('recruiter')}
                className="btn-secondary"
              >
                Для рекрутеров
              </button>
            </nav>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}