export type WindowTypes = 'desktop' | 'tablet' | 'mobile' | 'extra';
export type Media<T> = Record<WindowTypes, T>;
