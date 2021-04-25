import { objectType } from "nexus"

export const DBError = objectType({
  name: 'DBError',
  definition(t) {
    t.string('code')
    t.string('message')
  }
})

export const AuthPayload = objectType({
    name: 'AuthPayload',
    definition(t) {
      t.field('error', { type: 'DBError'})
      t.string('token')
      t.field('user', { type: 'User' })
    },
  })
  