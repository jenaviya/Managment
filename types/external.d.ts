// TypeScript module declarations for missing modules
// Place this file in the types/ directory for global augmentation

declare module 'cloudinary';
declare module 'emailjs-com';
declare module 'firebase/app';
declare module 'firebase/messaging';

// CSS module declarations
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
