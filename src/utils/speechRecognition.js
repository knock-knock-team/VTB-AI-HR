// Speech Recognition utilities with fallback support
const SpeechRecognition = {
  recognition: null,
  isListening: false,
  fallbackMode: false,

  // Initialize speech recognition
  init: function() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new SpeechRecognition();
    } else {
      console.warn('Speech recognition not supported');
      return false;
    }

    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'ru-RU';
    this.recognition.maxAlternatives = 1;
    
    return true;
  },

  // Start listening for speech with fallback
  startListening: function(onResult, onEnd, onError) {
    if (!this.recognition) {
      if (!this.init()) {
        this.enableFallbackMode(onResult, onEnd, onError);
        return;
      }
    }

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      onResult(finalTranscript, interimTranscript);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'network' || event.error === 'not-allowed') {
        this.enableFallbackMode(onResult, onEnd, onError);
      } else {
        onError(`Ошибка распознавания речи. Попробуйте ввести текст вручную.`);
      }
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      console.error('Failed to start recognition:', error);
      this.enableFallbackMode(onResult, onEnd, onError);
    }
  },

  // Enable fallback mode for manual text input
  enableFallbackMode: function(onResult, onEnd, onError) {
    this.fallbackMode = true;
    const userInput = prompt('Голосовое распознавание недоступно. Пожалуйста, введите ваш ответ текстом:');
    
    if (userInput && userInput.trim()) {
      onResult(userInput.trim(), '');
      setTimeout(() => {
        onEnd();
        this.fallbackMode = false;
      }, 100);
    } else {
      onError('Ответ не был введен. Попробуйте еще раз.');
      this.fallbackMode = false;
    }
  },

  // Stop listening
  stopListening: function() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  },

  // Check if currently listening
  isCurrentlyListening: function() {
    return this.isListening || this.fallbackMode;
  }
};
