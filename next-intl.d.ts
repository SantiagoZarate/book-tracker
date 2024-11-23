type AuthMessages = typeof import('./src/app/messages/en/auth.json');
type AddMessages = typeof import('./src/app/messages/en/add.json');
type HomeMessages = typeof import('./src/app/messages/en/home.json');
type NavMessages = typeof import('./src/app/messages/en/nav.json');

// Create a new type by combining all message types
type Messages = AuthMessages & AddMessages & HomeMessages & NavMessages;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare interface IntlMessages extends Messages {}
