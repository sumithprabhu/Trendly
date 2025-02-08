let chatProgress = 0; // Track which question user is answering
let storedAnswers = []; // Store user responses

const initialMessages = [
  "Before we get started, I want you to deploy your personalized bot. Go to settings and deploy it."
];

const questions = [
    "",
  "What is your name?",
  "What social media platforms do you use the most?",
  "How frequently do you post on social media?",
  "What is your primary goal with social media?",
  "What type of content do you create?",
  "Do you use any scheduling tools?",
  "Do you collaborate with others on content?",
  "How do you measure your success?",
  "Do you monetize your social media?",
  "Are you open to AI-powered automation?",
  "Any specific challenges you face?"
];

export const handleChatResponse = async (message) => {
  // Handle initial messages
  if (chatProgress < initialMessages.length) {
    return initialMessages[chatProgress++];
  }

  // Store user responses in JSON format
  if (chatProgress >= initialMessages.length && chatProgress - initialMessages.length < questions.length) {
    storedAnswers.push({ question: questions[chatProgress - initialMessages.length], answer: message });

    chatProgress++; // Move to the next question

    // If all questions are answered, show completion message
    if (chatProgress - initialMessages.length === questions.length) {
      return "Thank you for answering all the questions. Now it's time to get started! Enter /start to control your bot.";
    }

    return questions[chatProgress - initialMessages.length]; // Ask next question
  }

  // Enable AI chat when form is completed
  if (message === "/start") {
    return "Great! Your AI assistant is now ready. Start giving commands.";
  }

  return "I didn't understand that. Please enter /start to begin commanding your bot.";
};
