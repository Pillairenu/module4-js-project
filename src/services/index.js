import { article } from './articles/articles.js'

import { messages } from './messages/messages.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(article)

  app.configure(messages)

  app.configure(user)

  // All services will be registered here
}
