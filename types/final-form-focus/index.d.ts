// Type definitions for final-form-focus 1.1
// Project: https://github.com/final-form/final-form-focus
// Definitions by: Jeow Li Huan <https://github.com/huan086>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import { Decorator } from "final-form";

export interface FocusableInput {
    name: string;
    focus: () => void;
}

export type GetInputs = () => FocusableInput[];

export type FindInput = (inputs: FocusableInput[], errors: object) => FocusableInput | undefined;

/* eslint-disable @definitelytyped/no-unnecessary-generics */
export default function createDecorator<FormValues = object, InitialFormValues = object>(
    getInputs?: GetInputs,
    findInput?: FindInput,
): Decorator<FormValues, InitialFormValues>;
/* eslint-enable @definitelytyped/no-unnecessary-generics */

export function getFormInputs(formName: string): GetInputs;
