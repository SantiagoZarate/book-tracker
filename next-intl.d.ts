// type UsersMessages = typeof import('./messages/en/users.json');
type AuthMessages = typeof import('./src/app/messages/en/auth.json');

// Create a new type by combining all message types
type Messages = AuthMessages;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare interface IntlMessages extends Messages {}
