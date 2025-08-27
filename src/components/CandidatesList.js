function CandidatesList({ jobs }) {
  try {
    const [selectedJob, setSelectedJob] = React.useState(null);
    const [candidates, setCandidates] = React.useState([]);

    React.useEffect(() => {
      if (selectedJob) {
        loadCandidates(selectedJob.objectId);
      }
    }, [selectedJob]);

    const loadCandidates = async (jobId) => {
      try {
        const candidatesData = await trickleListObjects(`candidate:${jobId}`, 50, true);
        setCandidates(candidatesData.items);
      } catch (error) {
        console.error('Error loading candidates:', error);
      }
    };

    const copyLink = (link) => {
      navigator.clipboard.writeText(link);
      alert('Ссылка скопирована в буфер обмена!');
    };

    return (
      <div className="space-y-6" data-name="candidates-list" data-file="components/CandidatesList.js">
        <div className="card">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Управление вакансиями</h1>
          
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <div className="icon-briefcase text-4xl text-[var(--text-secondary)] mb-4"></div>
              <p className="text-[var(--text-secondary)]">Пока нет созданных вакансий</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <div 
                  key={job.objectId} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedJob?.objectId === job.objectId 
                      ? 'border-[var(--primary-color)] bg-blue-50' 
                      : 'border-[var(--border-color)] hover:border-[var(--primary-color)]'
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">{job.objectData.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        Создана: {new Date(job.objectData.createdAt).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyLink(job.objectData.candidateLink);
                      }}
                      className="btn-primary text-sm px-3 py-1"
                    >
                      <div className="icon-copy text-sm mr-1"></div>
                      Копировать ссылку
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedJob && (
          <div className="card">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
              Кандидаты для: {selectedJob.objectData.title}
            </h2>
            
            {candidates.length === 0 ? (
              <div className="text-center py-8">
                <div className="icon-users text-4xl text-[var(--text-secondary)] mb-4"></div>
                <p className="text-[var(--text-secondary)]">Пока нет кандидатов для этой вакансии</p>
              </div>
            ) : (
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div key={candidate.objectId} className="border border-[var(--border-color)] rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-[var(--text-primary)]">
                          {candidate.objectData.name || 'Кандидат'}
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Подал заявку: {new Date(candidate.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                        {candidate.objectData.score && (
                          <div className="mt-2">
                            <span className={`px-2 py-1 rounded text-sm ${
                              candidate.objectData.score >= 80 ? 'bg-green-100 text-green-800' :
                              candidate.objectData.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              Оценка: {candidate.objectData.score}%
                            </span>
                          </div>
                        )}
                      </div>
                      <button className="btn-primary text-sm">
                        Посмотреть отчет
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('CandidatesList component error:', error);
    return null;
  }
}