function JobForm({ onJobCreated }) {
  try {
    const [formData, setFormData] = React.useState({
      title: '',
      description: '',
      requirements: '',
      skills: '',
      experience: '',
      interviewStages: ['Анализ резюме', 'Техническое интервью', 'Культурное соответствие'],
      weights: {
        technical: 40,
        experience: 30,
        cultural: 20,
        communication: 10
      }
    });
    
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        const jobData = {
          ...formData,
          createdAt: new Date().toISOString(),
          candidateLink: `${window.location.origin}/candidate.html?job=${Date.now()}`,
          status: 'active'
        };
        
        const newJob = await trickleCreateObject('job', jobData);
        
        alert(`Вакансия создана! Ссылка для кандидатов: ${jobData.candidateLink}`);
        onJobCreated(newJob);
        
      } catch (error) {
        console.error('Error creating job:', error);
        alert('Ошибка при создании вакансии');
      } finally {
        setIsSubmitting(false);
      }
    };

    const updateWeight = (key, value) => {
      setFormData(prev => ({
        ...prev,
        weights: { ...prev.weights, [key]: parseInt(value) }
      }));
    };

    return (
      <div className="max-w-4xl mx-auto" data-name="job-form" data-file="components/JobForm.js">
        <div className="card">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Создание новой вакансии</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                Название должности *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                className="input-field"
                placeholder="Например: Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                Описание вакансии *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                className="input-field"
                placeholder="Подробное описание роли и обязанностей..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Ключевые навыки *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.skills}
                  onChange={(e) => setFormData(prev => ({...prev, skills: e.target.value}))}
                  className="input-field"
                  placeholder="React, TypeScript, Node.js..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Требования к опыту *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({...prev, experience: e.target.value}))}
                  className="input-field"
                  placeholder="Минимум 3 года опыта разработки..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                Весовые коэффициенты оценки (сумма должна быть 100%)
              </label>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">Технические навыки</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.weights.technical}
                    onChange={(e) => updateWeight('technical', e.target.value)}
                    className="input-field mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">Опыт работы</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.weights.experience}
                    onChange={(e) => updateWeight('experience', e.target.value)}
                    className="input-field mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">Культурное соответствие</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.weights.cultural}
                    onChange={(e) => updateWeight('cultural', e.target.value)}
                    className="input-field mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">Коммуникация</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.weights.communication}
                    onChange={(e) => updateWeight('communication', e.target.value)}
                    className="input-field mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? 'Создается...' : 'Создать вакансию'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('JobForm component error:', error);
    return null;
  }
}
