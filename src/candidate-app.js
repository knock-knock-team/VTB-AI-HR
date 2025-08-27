class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Что-то пошло не так</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function CandidateApp() {
  try {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [jobData, setJobData] = React.useState(null);
    const [candidateData, setCandidateData] = React.useState({
      name: '',
      email: '',
      resume: null,
      interviewAnswers: []
    });

    React.useEffect(() => {
      // Get job ID from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const jobId = urlParams.get('job');
      if (jobId) {
        loadJobData(jobId);
      }
    }, []);

    const loadJobData = async (jobId) => {
      try {
        // In real implementation, fetch job data by ID
        setJobData({
          title: 'Frontend Developer',
          description: 'Разработка пользовательских интерфейсов'
        });
      } catch (error) {
        console.error('Error loading job data:', error);
      }
    };

    const steps = [
      'Информация о кандидате',
      'Загрузка резюме', 
      'Голосовое интервью',
      'Завершение'
    ];

    return (
      <div className="min-h-screen bg-[var(--secondary-color)]" data-name="candidate-app" data-file="candidate-app.js">
        <CandidateHeader jobTitle={jobData?.title} />
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <InterviewSteps steps={steps} currentStep={currentStep} />
          
          {currentStep === 0 && (
            <div className="card mt-8">
              <h2 className="text-2xl font-semibold mb-6">Добро пожаловать!</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                Вы начинаете прохождение интервью для позиции "{jobData?.title}". 
                Процесс займет около 20-30 минут.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={candidateData.name}
                  onChange={(e) => setCandidateData(prev => ({...prev, name: e.target.value}))}
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={candidateData.email}
                  onChange={(e) => setCandidateData(prev => ({...prev, email: e.target.value}))}
                  className="input-field"
                />
              </div>
              <button 
                onClick={() => setCurrentStep(1)}
                className="btn-primary mt-6"
                disabled={!candidateData.name || !candidateData.email}
              >
                Продолжить
              </button>
            </div>
          )}
          
          {currentStep === 1 && (
            <ResumeUpload 
              onNext={() => setCurrentStep(2)}
              onFileUpload={(file) => setCandidateData(prev => ({...prev, resume: file}))}
            />
          )}
          
          {currentStep === 2 && (
            <VoiceInterview 
              onNext={() => setCurrentStep(3)}
              onAnswerRecorded={(answer) => {
                setCandidateData(prev => ({
                  ...prev, 
                  interviewAnswers: [...prev.interviewAnswers, answer]
                }));
              }}
            />
          )}
          
          {currentStep === 3 && (
            <div className="card mt-8 text-center">
              <div className="icon-check-circle text-6xl text-[var(--accent-color)] mb-6"></div>
              <h2 className="text-2xl font-semibold mb-4">Интервью завершено!</h2>
              <p className="text-[var(--text-secondary)]">
                Спасибо за участие. Результаты будут отправлены рекрутеру в течение 24 часов.
              </p>
            </div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error('CandidateApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <CandidateApp />
  </ErrorBoundary>
);