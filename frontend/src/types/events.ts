import { ChangeEvent } from 'react';

export type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type SelectChangeEvent = ChangeEvent<{ value: unknown }>; 