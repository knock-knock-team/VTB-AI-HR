function ResumeUpload({ onNext, onFileUpload }) {
  try {
    const [file, setFile] = React.useState(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const [analysis, setAnalysis] = React.useState(null);

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        onFileUpload(selectedFile);
      }
    };

    const analyzeResume = async () => {
      setIsAnalyzing(true);
      
      try {
        // Get job requirements from URL or props
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('job');
        
        // Mock job requirements - in real app, fetch from database
        const jobRequirements = {
          skills: 'React, TypeScript, JavaScript, CSS, HTML',
          experience: 'Минимум 3 года разработки',
          title: 'Frontend Developer'
        };

        // Extract text from file (simplified - in real app use PDF parser)
        const resumeText = `Опытный Frontend разработчик с 4 годами опыта. 
        Навыки: JavaScript, React, TypeScript, Vue.js, CSS, HTML, Node.js.
        Работал в компаниях: TechCorp, StartupX. 
        Образование: Высшее техническое.`;

        const aiAnalysis = await AIAnalyzer.analyzeResume(resumeText, jobRequirements);
        
        setAnalysis({
          score: aiAnalysis.overallScore,
          skills: aiAnalysis.extractedSkills,
          experience: `${aiAnalysis.yearsOfExperience} лет`,
          match: aiAnalysis.recommendation,
          fullAnalysis: aiAnalysis
        });
      } catch (error) {
        alert('Ошибка анализа резюме: ' + error.message);
        setAnalysis({
          score: 0,
          skills: [],
          experience: 'Не определено',
          match: 'Ошибка анализа'
        });
      } finally {
        setIsAnalyzing(false);
      }
    };

    return (
      <div className="card mt-8" data-name="resume-upload" data-file="components/ResumeUpload.js">
        <h2 className="text-2xl font-semibold mb-6">Загрузка резюме</h2>
        
        <div className="border-2 border-dashed border-[var(--border-color)] rounded-lg p-8 text-center">
          <div className="icon-upload text-4xl text-[var(--text-secondary)] mb-4"></div>
          <p className="text-[var(--text-secondary)] mb-4">
            Загрузите ваше резюме в формате PDF или DOC
          </p>
          
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />
          <label htmlFor="resume-upload" className="btn-primary cursor-pointer">
            Выбрать файл
          </label>
          
          {file && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">Файл загружен: {file.name}</p>
            </div>
          )}
        </div>

        {file && !analysis && (
          <button 
            onClick={analyzeResume}
            disabled={isAnalyzing}
            className="btn-primary mt-6"
          >
            {isAnalyzing ? 'Анализируем...' : 'Анализировать резюме'}
          </button>
        )}

        {analysis && (
          <div className="mt-6 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-3">Результаты анализа:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Соответствие: {analysis.score}%</p>
                <p className="text-sm text-[var(--text-secondary)]">Опыт: {analysis.experience}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Ключевые навыки:</p>
                <p className="text-sm">{analysis.skills.join(', ')}</p>
              </div>
            </div>
            <button onClick={onNext} className="btn-primary mt-4">
              Продолжить к интервью
            </button>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('ResumeUpload component error:', error);
    return null;
  }
}