function CandidateHeader({ jobTitle }) {
  try {
    return (
      <header className="bg-white border-b border-[var(--border-color)]" data-name="candidate-header" data-file="components/CandidateHeader.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)] flex items-center justify-center">
                <div className="icon-brain text-xl text-white"></div>
              </div>
              <span className="ml-3 text-xl font-bold text-[var(--text-primary)]">HR Avatar</span>
            </div>
            
            {jobTitle && (
              <div className="text-[var(--text-secondary)]">
                Интервью для: <span className="font-medium text-[var(--text-primary)]">{jobTitle}</span>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('CandidateHeader component error:', error);
    return null;
  }
}