// AI Analysis utilities using built-in AI agent
const AIAnalyzer = {
  
  // Analyze resume content against job requirements
  analyzeResume: async function(resumeText, jobRequirements) {
    try {
      const systemPrompt = `Вы - эксперт по анализу резюме. Ваша задача - проанализировать резюме кандидата и оценить соответствие требованиям вакансии.

Критерии оценки:
- Технические навыки (0-100)
- Опыт работы (0-100) 
- Образование (0-100)
- Общее соответствие (0-100)

Верните результат в JSON формате:
{
  "overallScore": число от 0 до 100,
  "technicalSkills": число от 0 до 100,
  "experience": число от 0 до 100,
  "education": число от 0 до 100,
  "extractedSkills": ["навык1", "навык2"],
  "yearsOfExperience": число,
  "strengths": ["сильная сторона 1", "сильная сторона 2"],
  "weaknesses": ["слабая сторона 1", "слабая сторона 2"],
  "recommendation": "краткая рекомендация"
}

НЕ добавляйте \`\`\`json или \`\`\` в ответ.`;

      const userPrompt = `Требования к вакансии:
${JSON.stringify(jobRequirements)}

Текст резюме:
${resumeText}`;

      let response = await invokeAIAgent(systemPrompt, userPrompt);
      response = response.replace(/```json/g, '').replace(/```/g, '').trim();
      
      return JSON.parse(response);
    } catch (error) {
      console.error('Resume analysis error:', error);
      throw new Error('Ошибка анализа резюме');
    }
  },

  // Generate interview questions based on job requirements and resume analysis
  generateInterviewQuestions: async function(jobRequirements, resumeAnalysis) {
    try {
      const systemPrompt = `Вы - HR-специалист. Создайте 5 персонализированных вопросов для интервью на основе требований вакансии и анализа резюме кандидата.

Верните результат в JSON формате:
{
  "questions": [
    {
      "id": 1,
      "text": "текст вопроса",
      "category": "technical|behavioral|experience",
      "expectedKeywords": ["ключевое слово 1", "ключевое слово 2"]
    }
  ]
}

НЕ добавляйте \`\`\`json или \`\`\` в ответ.`;

      const userPrompt = `Требования к вакансии:
${JSON.stringify(jobRequirements)}

Анализ резюме:
${JSON.stringify(resumeAnalysis)}`;

      let response = await invokeAIAgent(systemPrompt, userPrompt);
      response = response.replace(/```json/g, '').replace(/```/g, '').trim();
      
      return JSON.parse(response);
    } catch (error) {
      console.error('Question generation error:', error);
      throw new Error('Ошибка генерации вопросов');
    }
  },

  // Analyze interview answer
  analyzeAnswer: async function(question, answer, expectedKeywords) {
    try {
      const systemPrompt = `Вы - эксперт по оценке ответов на интервью. Оцените ответ кандидата по шкале от 0 до 100.

Критерии оценки:
- Полнота ответа
- Релевантность
- Использование ключевых слов
- Структурированность

Верните результат в JSON формате:
{
  "score": число от 0 до 100,
  "feedback": "краткий отзыв",
  "foundKeywords": ["найденное ключевое слово"],
  "missingKeywords": ["пропущенное ключевое слово"]
}

НЕ добавляйте \`\`\`json или \`\`\` в ответ.`;

      const userPrompt = `Вопрос: ${question}
Ожидаемые ключевые слова: ${expectedKeywords.join(', ')}
Ответ кандидата: ${answer}`;

      let response = await invokeAIAgent(systemPrompt, userPrompt);
      response = response.replace(/```json/g, '').replace(/```/g, '').trim();
      
      return JSON.parse(response);
    } catch (error) {
      console.error('Answer analysis error:', error);
      throw new Error('Ошибка анализа ответа');
    }
  },

  // Generate final interview report
  generateReport: async function(candidateData, resumeAnalysis, interviewResults, jobWeights) {
    try {
      const systemPrompt = `Вы - HR-аналитик. Создайте финальный отчет о кандидате на основе всех данных.

Верните результат в JSON формате:
{
  "finalScore": число от 0 до 100,
  "recommendation": "hire|consider|reject",
  "summary": "краткое резюме",
  "detailedAnalysis": {
    "technical": {
      "score": число,
      "feedback": "отзыв"
    },
    "experience": {
      "score": число, 
      "feedback": "отзыв"
    },
    "communication": {
      "score": число,
      "feedback": "отзыв"
    },
    "cultural": {
      "score": число,
      "feedback": "отзыв"
    }
  },
  "nextSteps": "рекомендации по дальнейшим действиям"
}

НЕ добавляйте \`\`\`json или \`\`\` в ответ.`;

      const userPrompt = `Данные кандидата: ${JSON.stringify(candidateData)}
Анализ резюме: ${JSON.stringify(resumeAnalysis)}
Результаты интервью: ${JSON.stringify(interviewResults)}
Весовые коэффициенты: ${JSON.stringify(jobWeights)}`;

      let response = await invokeAIAgent(systemPrompt, userPrompt);
      response = response.replace(/```json/g, '').replace(/```/g, '').trim();
      
      return JSON.parse(response);
    } catch (error) {
      console.error('Report generation error:', error);
      throw new Error('Ошибка генерации отчета');
    }
  }
};