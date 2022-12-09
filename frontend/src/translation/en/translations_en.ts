export const TRANSLATIONS_EN = {
  exam: {
    examNotFoundNoti: "we couldn't find your exam",
    badge: '✈️ JOIN THE BETA',
    name: 'Łukasz Wojdat',
    position: 'Chief Executive Officer',
    congratulationCard: {
      title: 'Thank you!',
      awaiting:
        'you passed the exam your score is: {{score}}% thank you for wanting to join us wait now for your exam to be accepted!',
      declined: 'Your application has been rejected! try again in a few days!',
      accepted:
        'Your application has been accepted! Now you can complete the registration process by clicking the button below!',
      blocked:
        "Unfortunately you got banned you can't join us :( you want more information write to us on discord!",
      backHome: 'Back to home',
      continueRegister: 'Continue registration',
    },
    invite: {
      title: 'Welcome to LOT VA',
      body1:
        'We are happy to welcome you to our virtual airline website, in order to start flying for us you must pass a short knowledge test.',
      body2:
        'If you are a pilot in any virtual network, tell us about it in the form and you will receive additional benefits',
      body3:
        'We are here to provide you with a good atmosphere and fun. we are looking forward to your joining us',
      startButton: 'Start Exam',
      continueButton: 'Continue Exam',
      resultButton: 'Show Result',
      emailPlaceholder: 'Type your email',
      ctaButton: 'Close',
    },
    startExam: {
      title: 'Welcome candidate!',
      body: 'Please check our homepage before starting a new career at Virtual LOT and particularly pay attention to our F.A.Q.',
      subTitle: 'Exam information:',
      questions: 'Questions: {{value}}',
      time: 'Time per question: {{value}} sec',
      percent: 'Percentage to pass: {{value}}%',
      failed: 'If exam failed: {{value}} day blocked',
      emailPlaceholder: 'Your email',
      namePlaceholder: 'Your Name',
      surnamePlaceholder: 'Your surname',
      start: 'Start Exam',
      back: 'Back',
    },
    examProgress: {
      title: 'Question',
      timeCounter: 'Time to end: {{ value }}',
    },
  },

  register: {
    badge: '✈️ JOIN THE BETA',
    password: 'Type your password',
    repassword: 'Confirm your password',
    country: 'Select your country',
    hub: 'Select your main hub',
    vid: 'Type your vid',
    button: 'Register',
    errors: {
      USER_EXIST: 'Provided user is exist',
      HUB_NOT_FOUND: 'Hub not found',
      NOT_ALLOWED: 'Your are not allowed to register',
      VID_EMPTY: 'Type your vid',
      PASSWORD_EMPTY: 'Type your password',
      COUNTRY_EMPTY: 'You must choose your country',
      HUB_GUID_EMPTY: 'You must choose your main hub',
    },
  },

  login: {
    badge: '✈️ JOIN THE BETA',
    login: 'Type your login',
    password: 'Type your password',
    remember: 'Remember me',
    loginButton: 'Continue',
    cta: "don't have an account?",
    link: ' create account',
    errors: {
      EMAIL_OR_PASSWORD: 'Email or password is invalid',
      INACTIVE_OR_BAN: 'your account is inactive or your account is blocked',
    },
  },

  assigneSimbriefModal: {
    title: 'Add simbrief',
    description: 'Put your simbrief id or alias and we can help you generate a flight plan',
    button: 'Proceed',
    NOT_FOUND: 'Simbrief account not found',
    INTERNAL_SERVER_ERROR: 'Internal server error try again later'
  }
};
