export const TRANSLATIONS_EN = {
  signIn: {
    title: 'Sign in to Manager',
    subTitle: 'faster, easier manage your virtual airline',

    inputEmail: {
      label: 'Email Address',
      placeholder: 'Enter your email address',
      error: 'Provided email is invalid',
    },

    inputPassword: {
      label: 'Email Password',
      placeholder: 'Enter Password',
      error: 'Provided password is too short',
    },

    button: 'Sign In',
    cta: 'Need an account?',
    signUp: 'Sign Up',
  },
  signUp: {
    beta: '✈️ JOIN THE BETA',
    title: 'Create an Account',
    subTitle: 'More effective manage your virtual airline',

    inputFirstName: {
      label: 'First Name',
      placeholder: 'Enter first name',
      error: 'Provided first name is invalid',
    },
    inputLastName: {
      label: 'Last Name',
      placeholder: 'Enter last name',
      error: 'Provided last name is invalid',
    },
    inputEmail: {
      label: 'Email Address',
      placeholder: 'Enter your email address',
      error: 'Provided email is invalid',
    },

    inputPassword: {
      label: 'Email Password',
      placeholder: 'Enter Password',
      error: 'Provided password is too short',
    },

    showLastName: 'Show my last name',

    button: 'Create account',
    cta: 'Already a user?',
    signIn: 'Sign In',
  },

  onbording: {
    method: {
      title: 'Make A Decision',
      subTitle:
        'Choose if you want to join to the airline as a pilot or create new one and try to beat others!',
      exist: 'Join To Existing Airline',
      new: 'Create Your Own Airline',
    },
    details: {
      title: 'Airline Details',
      subTitle: 'Let us help you set up your first airline!',
      airlineName: 'Enter airline name',
      airlineIcao: 'Enter airline icao',
      airlineDescriptionLabel: 'Enter description (Optional)',
      airlineDescription: 'Enter description about your airline',
      method: 'Choose Joining method',
      INVITATION_ONLY: 'Invitation Only',
      APPROVAL_NEEDED: 'Need Approval From Admin',
      PUBLIC_ACCESS: 'Public Access',
    },
    configuration: {
      title: '{{airlineName}} Configuration',
      subTitle: 'select options that will help you better manage your airline!',
      PILOT_CAN_SCHEDULED_NEW_FLIGHT: 'Pilot can scheduled new flight',
      PENALTY_FOR_PILOT_FOR_HARD_LANDING:
        'Pilot will get salary penalty for hard landing',
      PENALTY_FOR_PILOT_FOR_NO_LANDING_LIGHTS:
        'Pilot will get salary penalty for no lights below FL100',
      PILOT_CAN_CHANGE_FLIGHT_NUMBER:
        'Pilot can change flight number for scheduled flight',
    },

    base: {
      title: '{{airlineName}} Base',
      subTitle: 'Choose your first airline base and start your sky adventure!',
    },
  },
};
