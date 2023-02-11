export const TRANSLATIONS_EN = {
  headers: {
    signin: 'Sign In',
    signup: 'Sign Up',
    choose: 'Choose Company',
    method: 'Onbording',
    join: 'Join To Company',
    details: 'Company Details',
    configuration: 'Company Configuration',
    base: 'Company Base',
    schedules: 'Schedules',
    aircrafts: 'Aircrafts',
    dealer: 'Aircraft Dealer',
    verify: 'Email Verification',
    users: 'Users',
  },
  signIn: {
    errors: {
      NOT_FOUND: 'Email or password is invalid',
    },
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

    errors: {
      EMAIL_EXIST: 'Account with provided email is existing',
    },

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
      exist: 'Join To Existing Company',
      new: 'Create Your Own Copany',
    },
    details: {
      title: 'Company Details',
      subTitle: 'Let us help you set up your company!',
      airlineName: 'Enter company name',
      airlineIcao: 'Enter company icao',
      airlineDescriptionLabel: 'Enter description (Optional)',
      airlineDescription: 'Enter description about your company',
      method: 'Choose Joining method',
      INVITATION_ONLY: 'Invitation Only',
      APPROVAL_NEEDED: 'Need Approval From Admin',
      PUBLIC_ACCESS: 'Public Access',
    },
    configuration: {
      title: '{{airlineName}} Configuration',
      subTitle: 'select options that will help you better manage your company!',
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
      subTitle: 'Choose your first company base and start your sky adventure!',
    },
  },

  airlineCard: {
    badges: {
      APPROVAL_NEEDED: 'Need Approval For Access',
      PUBLIC_ACCESS: 'Approval Not Needed',
    },
    pilot: 'Pilot',
    pilots: 'Pilots',
    aircraft: 'Aircraft',
    aircrafts: 'Aircrafts',
    flight: 'Flight in this month',
    flights: 'Flights in this month',
    buttons: {
      APPROVAL_NEEDED: 'Request Access',
      PUBLIC_ACCESS: 'Join',
      signIn: 'Sign In',
    },
  },
  sidebar: {
    home: 'Home',
    schedules: 'Schedules',
    aircrafts: 'Aircrafts',
    users: 'Pilots',
    logOut: 'Log Out',

    roles: {
      ADMIN: 'Admin',
      DISPATCHER: 'Dispatcher',
      PILOT: 'Pilot',
    },
  },
  aircraftDealer: {
    errors: {
      BAD_REQUEST_AIRLINE: 'Please check your airline',
      REGISTRATION_OWNED: 'Provided registration is owned by another aircraft',
      TRANSACTION: 'An error occurred, try again later.',
      BALANCE: 'Insufficient funds to buy this plane',
    },
  },
  airportSearch: {
    label: 'Search Airport',
    placeholder: 'Type ICAO or name of airport',
  },
  aircraftSearch: {
    label: 'Search aircraft type',
    placeholder: 'Type ICAO or aircraft name',
  },
  schedules: {
    header: 'Today Schedules',
    create: 'Create Schedule',
    card: {
      salary: 'Estimated Salary',
      book: 'Book Flight',
      remove: 'Remove',
      EVERYDAY: 'Everyday',
      ON_CERTAIN_DAYS: 'On Selected Days',
      ONCE: 'Only once',
    },
  },

  createScheduleModal: {
    header: 'Create New Schedule',
    EVERYDAY: 'Everyday',
    ON_CERTAIN_DAYS: 'On Selected Days',
    ONCE: 'Only once',
    days: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
    errors: {
      AIRPORT: 'Departure or Desination airport is not in database',
      AIRCRAFT: 'Provided aircraft is not existing in your company',
      AIRLINE: 'Something went wrong! try again later',
      EXIST: 'Schedule with provided flight number is existing',
      SCHEUDLE_NOT_FOUND: 'Schedule with provided ID is not existing',
      SIMBRIEF: 'Simbrief is busy try again later',
    },
    callsignLabel: 'Callsign',
    callsignPlaceholder: 'Type callsign for new flight',
    flightLabel: 'Flight Number *',
    flightPlaceholder: 'Type callsign for new flight',
    originLabel: 'Search Derarture Airport *',
    destinationLabel: 'Search Destination Airport *',
    aircraftLabel: 'Search Aircraft Type *',
    costLabel: 'Cost Index *',
    costPlaceholder: 'Type cost index for flight',
    pickDay: 'Pick Day Of Schedule *',
    routeLabel: 'Planned Route',
    routePlaceholder: 'Type planned route',
    required: '* required inputs',
    close: 'Close',
    create: 'Create',
  },

  verify: {
    title: 'Verification Code',
    body: 'We have sent a verification code to this email address if you do not see it check your spam email',
    button: 'Verify',
    resend: 'Resend verification code',
    error: 'Provided code is invalid',
  },

  users: {
    OLDEST: 'Sort by older',
    LATEST: 'Sort by newer',
    inviteButton: 'Invite User',
    placeholder: 'Enter name or email',
    empty: 'Invite your first pilots to your virtual airline!',

    errors: {
      OWN_COMPANY: 'You cannot edit yourself',
      NOT_FOUND: 'Membership not found',
      MEMBERSHIP: 'Membership not found',
      NOT_FOUND_COMPANY: "You don't have permission to do that action",
      COMPANY: "You don't have permission to do that action",
      USER_EXIST: 'Provided Emailis exist in this airline',
      forbidden: "You don't have permission to do that action",
    },
  },

  inviteModal: {
    header: 'Invite User',
    placeholder: 'Provide user email',
    cancelButton: 'Cancel',
    acceptButton: 'Invite',
  },

  membershipCard: {
    menu: {
      canActive: 'Active user',
      canDisable: 'Disable user',
      canResendInvite: 'Resend Invite',
    },
    status: {
      ACTIVE: 'Active',
      NON_ACTIVE: 'Not Active',
      DISABLED: 'Disabled',
      WAITING_APPROVAL: 'Waiting For Approval',
      WAITING_TO_JOIN: 'Waiting For Join',
    },
  },

  aircraftCard: {
    menu: {
      canSellAircraft: 'Sell Aircraft',
    },

    sellModal: {
      title: 'Sell Aircraft',
      text: 'Are you sure you wanna sell aircraft {{aircraftReg}} ({{aircraftType}}) for {{money}} this action can not be undone!',
    },

    errors: {
      NOT_FOUND_DEALER: 'Dealer now is not buying this aircraft.',
      NOT_FOUND_AIRCRAFT: 'You cannot sell this aircraft',
      COMPANY: 'You cannot sell this aircraft in this company',
      INTERNAL: "Something wen't wrong, try again later.",
    },
  },

  welcomeModal: {
    title: 'Congratulation!',
    body: "You have just become the owner of your own virtual airline, go to the 'aircrafts' tab and buy your first plane and become the best airline in the sky!",
    button: 'Close',
  },

  bookModal: {
    title: 'Book Flight',
    callLabel: 'Callsign',
    callPlaceholder: 'provide callsign for your flight',
    airLabel: 'Select Aircraft',
    airPlaceholder: 'Choose aircraft for flight',
    cancelButton: 'Cancel',
    acceptButton: 'Book Flight',
    errors: {
      INTERNAL_SERVER_ERROR: 'Something went wrong. Try again later',
      NOT_FOUND_AIRLINE: 'You cannot book flight in this company',
      NOT_FOUND_SCHEDULE: 'You cannot book flight in this company',
      NOT_FOUND_AIRCRAFT: 'You cannot book flight in this company',
      NOT_FOUND_PIREP: 'Pirep not found',
      TRANSACTION: 'Something went wrong with getting the route',
      AIRCRAFT_CONDITION:
        'Aircraft is in bad condition you cannot book this aircraft for the flight',
    },
  },
};
