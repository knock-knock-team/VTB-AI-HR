function VoiceInterview({ onNext, onAnswerRecorded }) {
  try {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [isRecording, setIsRecording] = React.useState(false);
    const [answers, setAnswers] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [currentTranscript, setCurrentTranscript] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
      generateQuestions();
    }, []);

    const generateQuestions = async () => {
      try {
        const jobRequirements = {
          title: 'Frontend Developer',
          skills: 'React, TypeScript, JavaScript',
          experience: '3+ года'
        };
        
        const resumeAnalysis = {
          overallScore: 78,
          technicalSkills: 85,
          extractedSkills: ['JavaScript', 'React', 'TypeScript']
        };

        const aiQuestions = await AIAnalyzer.generateInterviewQuestions(jobRequirements, resumeAnalysis);
        setQuestions(aiQuestions.questions);
      } catch (error) {
        console.error('Error generating questions:', error);
        setQuestions([
          {
            id: 1,
            text: 'Расскажите о себе и своем опыте работы',
            category: 'experience',
            expectedKeywords: ['опыт', 'разработка', 'проекты']
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    const handleRecordAnswer = () => {
      if (!isRecording) {
        // Start recording
        setIsRecording(true);
        setCurrentTranscript('');
        
        SpeechRecognition.startListening(
          (finalTranscript, interimTranscript) => {
            setCurrentTranscript(finalTranscript + interimTranscript);
          },
          () => {
            // Recording ended
            setIsRecording(false);
          },
          (error) => {
            console.error('Speech recognition error:', error);
            alert('Ошибка записи голоса. Вы можете ввести текст вручную или попробовать записать еще раз.');
            setIsRecording(false);
          }
        );
      } else {
        // Stop recording
        SpeechRecognition.stopListening();
        processAnswer(currentTranscript);
      }
    };

    const processAnswer = async (transcript) => {
      if (!transcript.trim()) {
        alert('Ответ не был записан. Попробуйте еще раз.');
        return;
      }

      try {
        const currentQ = questions[currentQuestion];
        const analysis = await AIAnalyzer.analyzeAnswer(
          currentQ.text,
          transcript,
          currentQ.expectedKeywords
        );

        const answerData = {
          questionId: currentQ.id,
          question: currentQ.text,
          answer: transcript,
          analysis: analysis
        };

        setAnswers(prev => [...prev, answerData]);
        onAnswerRecorded(answerData);
        
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setCurrentTranscript('');
        }
      } catch (error) {
        console.error('Error processing answer:', error);
        alert('Ошибка обработки ответа');
      }
    };

    if (isLoading) {
      return (
        <div className="card mt-8 text-center" data-name="voice-interview" data-file="components/VoiceInterview.js">
          <h2 className="text-2xl font-semibold mb-6">Подготовка вопросов...</h2>
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      );
    }

    return (
      <div className="card mt-8" data-name="voice-interview" data-file="components/VoiceInterview.js">
        <h2 className="text-2xl font-semibold mb-6">Голосовое интервью</h2>
        
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[var(--primary-color)] flex items-center justify-center mx-auto mb-4">
            <div className="icon-user text-3xl text-white"></div>
          </div>
          <h3 className="text-lg font-medium mb-2">HR Аватар</h3>
          <p className="text-[var(--text-secondary)]">Готов задать вам вопросы</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-medium mb-2">Вопрос {currentQuestion + 1} из {questions.length}:</h4>
          <p className="text-[var(--text-secondary)]">{questions[currentQuestion]?.text || 'Загрузка вопроса...'}</p>
        </div>

        <div className="text-center">
          <button
            onClick={handleRecordAnswer}
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-[var(--primary-color)] hover:bg-blue-600'
            }`}
          >
            <div className={`text-2xl text-white ${isRecording ? 'icon-square' : 'icon-mic'}`}></div>
          </button>
          
          <p className="text-sm text-[var(--text-secondary)]">
            {isRecording ? 'Нажмите, чтобы остановить запись' : 'Нажмите, чтобы начать ответ'}
          </p>
          
          <button
            onClick={() => {
              const textAnswer = prompt('Введите ваш ответ текстом:');
              if (textAnswer && textAnswer.trim()) {
                processAnswer(textAnswer.trim());
              }
            }}
            className="btn-secondary text-sm mt-2"
          >
            Ввести текстом
          </button>
          
          {isRecording && currentTranscript && (
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-sm text-gray-700">
                <strong>Распознанная речь:</strong> {currentTranscript}
              </p>
            </div>
          )}
        </div>

        {answers.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-[var(--text-secondary)]">
              Отвечено вопросов: {answers.length} из {questions.length}
            </p>
            
            {answers.length === questions.length && (
              <button onClick={onNext} className="btn-primary mt-4">
                Завершить интервью
              </button>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('VoiceInterview component error:', error);
    return null;
  }
}