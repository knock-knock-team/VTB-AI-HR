function ReportViewer({ candidate, job, onClose }) {
  try {
    const [report, setReport] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      generateReport();
    }, [candidate]);

    const generateReport = async () => {
      try {
        const candidateData = {
          name: candidate.objectData.name,
          email: candidate.objectData.email
        };

        const resumeAnalysis = candidate.objectData.resumeAnalysis || {};
        const interviewResults = candidate.objectData.interviewAnswers || [];
        const jobWeights = job.objectData.weights || {};

        const aiReport = await AIAnalyzer.generateReport(
          candidateData,
          resumeAnalysis,
          interviewResults,
          jobWeights
        );

        setReport(aiReport);
      } catch (error) {
        console.error('Error generating report:', error);
        setReport({
          finalScore: 0,
          recommendation: 'reject',
          summary: 'Ошибка генерации отчета'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Генерация отчета...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="report-viewer" data-file="components/ReportViewer.js">
        <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Отчет по кандидату</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <div className="icon-x text-xl"></div>
            </button>
          </div>

          {report && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Общая информация</h3>
                  <p><strong>Имя:</strong> {candidate.objectData.name}</p>
                  <p><strong>Email:</strong> {candidate.objectData.email}</p>
                  <p><strong>Дата подачи:</strong> {new Date(candidate.createdAt).toLocaleDateString('ru-RU')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Итоговая оценка</h3>
                  <div className={`text-3xl font-bold ${
                    report.finalScore >= 80 ? 'text-green-600' :
                    report.finalScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {report.finalScore}%
                  </div>
                  <div className={`px-3 py-1 rounded text-sm mt-2 ${
                    report.recommendation === 'hire' ? 'bg-green-100 text-green-800' :
                    report.recommendation === 'consider' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {report.recommendation === 'hire' ? 'Рекомендуем к найму' :
                     report.recommendation === 'consider' ? 'Рассмотреть' : 'Отклонить'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Краткое резюме</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded">{report.summary}</p>
              </div>

              {report.detailedAnalysis && (
                <div>
                  <h3 className="font-semibold mb-3">Детальный анализ</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(report.detailedAnalysis).map(([key, value]) => (
                      <div key={key} className="border rounded p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium capitalize">{
                            key === 'technical' ? 'Технические навыки' :
                            key === 'experience' ? 'Опыт' :
                            key === 'communication' ? 'Коммуникация' :
                            key === 'cultural' ? 'Культурное соответствие' : key
                          }</span>
                          <span className="font-bold">{value.score}%</span>
                        </div>
                        <p className="text-sm text-gray-600">{value.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-3">Рекомендации</h3>
                <p className="text-gray-700 bg-blue-50 p-4 rounded">{report.nextSteps}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ReportViewer component error:', error);
    return null;
  }
}