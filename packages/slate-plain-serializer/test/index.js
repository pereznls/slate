import Plain from '..'
import assert from 'assert'
import fs from 'fs'
import { Value, KeyUtils } from 'slate'
import { basename, extname, resolve } from 'path'

beforeEach(KeyUtils.resetGenerator)

describe('slate-plain-serializer', () => {
  describe('deserialize()', () => {
    const dir = resolve(__dirname, './deserialize')
    const tests = fs
      .readdirSync(dir)
      .filter(t => t[0] != '.')
      .map(t => basename(t, extname(t)))

    for (const test of tests) {
      it(test, async () => {
        const module = require(resolve(dir, test))
        const { input, output, options } = module
        const value = Plain.deserialize(input, options)
        const actual = Value.isValue(value) ? value.toJSON() : value
        const expected = Value.isValue(output) ? output.toJSON() : output
        assert.deepEqual(actual, expected)
      })
    }
  })

  describe('serialize()', () => {
    const dir = resolve(__dirname, './serialize')
    const tests = fs
      .readdirSync(dir)
      .filter(t => t[0] != '.')
      .map(t => basename(t, extname(t)))

    for (const test of tests) {
      it(test, async () => {
        const module = require(resolve(dir, test))
        const { input, output, options } = module
        const string = Plain.serialize(input, options)
        const actual = string
        const expected = output
        assert.deepEqual(actual, expected)
      })
    }
  })
})
