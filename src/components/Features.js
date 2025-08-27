function Features() {
  try {
    const features = [
      {
        icon: 'file-text',
        title: 'Анализ резюме',
        description: 'Автоматический парсинг и анализ резюме с выявлением ключевых навыков и соответствия требованиям вакансии'
      },
      {
        icon: 'mic',
        title: 'Голосовые интервью',
        description: 'Проведение структурированных интервью с голосовым взаимодействием и адаптивными вопросами'
      },
      {
        icon: 'chart-bar',
        title: 'Умная оценка',
        description: 'Количественное оценивание кандидатов по множественным критериям с прозрачной системой баллов'
      },
      {
        icon: 'file-check',
        title: 'Детальные отчеты',
        description: 'Генерация обоснованных отчетов с анализом сильных и слабых сторон каждого кандидата'
      }
    ];

    return (
      <section id="features" className="py-20 bg-white" data-name="features" data-file="components/Features.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Возможности платформы
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Полный цикл автоматизированного отбора кандидатов с использованием передовых AI-технологий
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--secondary-color)] flex items-center justify-center mx-auto mb-6">
                  <div className={`icon-${feature.icon} text-2xl text-[var(--primary-color)]`}></div>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div id="process" className="mt-20">
            <h3 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-12">
              Как это работает
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Создание вакансии', desc: 'Рекрутер задает требования и критерии оценки' },
                { step: '2', title: 'Отправка ссылки', desc: 'Генерируется уникальная ссылка для кандидата' },
                { step: '3', title: 'Прохождение интервью', desc: 'Кандидат проходит все этапы оценки' },
                { step: '4', title: 'Получение отчета', desc: 'Рекрутер получает детальный анализ' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-color)] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Features component error:', error);
    return null;
  }
}