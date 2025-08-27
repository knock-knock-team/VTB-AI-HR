function Hero() {
  try {
    const handleGetStarted = () => {
      window.location.href = 'recruiter.html';
    };

    return (
      <section className="gradient-bg py-20" data-name="hero" data-file="components/Hero.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Умный HR-аватар для<br />
              <span className="text-blue-200">автоматизированного отбора</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Революционная платформа, которая проводит структурированные интервью, 
              анализирует резюме и предоставляет объективную оценку кандидатов с помощью ИИ
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button onClick={handleGetStarted} className="btn-primary bg-white text-[var(--primary-color)] hover:bg-gray-100">
                <div className="icon-rocket text-lg mr-2"></div>
                Начать работу
              </button>
              <button className="btn-secondary border-white text-white hover:bg-white hover:text-[var(--primary-color)]">
                <div className="icon-play text-lg mr-2"></div>
                Посмотреть демо
              </button>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-blue-200">Точность оценки</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">80%</div>
                  <div className="text-blue-200">Экономия времени</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-blue-200">Доступность</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}