function RecruiterHeader({ currentView, onViewChange }) {
  try {
    return (
      <header className="bg-white border-b border-[var(--border-color)]" data-name="recruiter-header" data-file="components/RecruiterHeader.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="index.html" className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)] flex items-center justify-center">
                  <div className="icon-brain text-xl text-white"></div>
                </div>
                <span className="ml-3 text-xl font-bold text-[var(--text-primary)]">HR Avatar</span>
              </a>
            </div>
            
            <nav className="flex items-center space-x-6">
              <button 
                onClick={() => onViewChange('create')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'create' 
                    ? 'bg-[var(--primary-color)] text-white' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="icon-plus text-lg mr-2"></div>
                Создать вакансию
              </button>
              
              <button 
                onClick={() => onViewChange('list')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'list' 
                    ? 'bg-[var(--primary-color)] text-white' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="icon-users text-lg mr-2"></div>
                Кандидаты
              </button>
              
              <a href="index.html" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <div className="icon-log-out text-lg"></div>
              </a>
            </nav>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('RecruiterHeader component error:', error);
    return null;
  }
}