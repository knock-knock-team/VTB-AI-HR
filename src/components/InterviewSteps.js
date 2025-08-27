function InterviewSteps({ steps, currentStep }) {
  try {
    return (
      <div className="card" data-name="interview-steps" data-file="components/InterviewSteps.js">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep 
                  ? 'bg-[var(--primary-color)] text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1}
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${
                  index <= currentStep 
                    ? 'text-[var(--text-primary)]' 
                    : 'text-gray-500'
                }`}>
                  {step}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block w-16 h-0.5 ml-6 ${
                  index < currentStep 
                    ? 'bg-[var(--primary-color)]' 
                    : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('InterviewSteps component error:', error);
    return null;
  }
}