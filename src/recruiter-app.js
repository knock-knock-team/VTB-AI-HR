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

function RecruiterApp() {
  try {
    const [currentView, setCurrentView] = React.useState('create');
    const [jobs, setJobs] = React.useState([]);
    
    React.useEffect(() => {
      loadJobs();
    }, []);
    
    const loadJobs = async () => {
      try {
        const jobsData = await trickleListObjects('job', 20, true);
        setJobs(jobsData.items);
      } catch (error) {
        console.error('Error loading jobs:', error);
      }
    };
    
    const handleJobCreated = (newJob) => {
      setJobs(prev => [newJob, ...prev]);
      setCurrentView('list');
    };

    return (
      <div className="min-h-screen bg-[var(--secondary-color)]" data-name="recruiter-app" data-file="recruiter-app.js">
        <RecruiterHeader currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          {currentView === 'create' && (
            <JobForm onJobCreated={handleJobCreated} />
          )}
          
          {currentView === 'list' && (
            <CandidatesList jobs={jobs} />
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error('RecruiterApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <RecruiterApp />
  </ErrorBoundary>
);