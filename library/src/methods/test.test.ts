import { describe, expect, expectTypeOf, test } from 'vitest';
import { number, numberAsync, object, objectAsync, string, stringAsync } from "../schemas/index"
import { safeParse } from './safeParse';
import { flatten } from '../error';
import { customAsync } from '../validations';
describe('test', () => {
    test('', () => {
        const syncSchema = object({
            first: string()
        })

        const asyncSchema = objectAsync({
            nestedObject: object({}),
            first: number(),
            last: string()
        })


        const flattenedErrors = safeParse(syncSchema, {});

        expect(flattenedErrors.success === false)

        expectTypeOf<Partial<Record<"first", [string, ...string[]]>>>(flatten<typeof syncSchema>(
            flattenedErrors.issues!
        ).nested)


        expectTypeOf<Partial<Record<"first", [string, ...string[]]>>>(flatten<typeof asyncSchema>(
            flattenedErrors.issues!
        ).nested)
    })
})