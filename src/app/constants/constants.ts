// Error Messages
export const ERROR_MAX_EMAILS = "You can only add up to 4 emails.";
export const getErrorDuplicateEmail = (email: string) =>
  `${email} has already been added. Please enter a unique email.`;
export const getErrorInvalidEmail = (email: string) =>
  `${email} is an invalid email, please enter a valid email.`;

// Email validation pattern
export const EMAIL_VALIDATION_PATTERN =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Household size options
export const HOUSEHOLD_SIZES = [
  { value: "", label: "How big is your household", disabled: true },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];
