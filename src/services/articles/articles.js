import { ArticleService, getOptions } from './articles.class.js'

export const articlePath = 'articles'
export const articleMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './articles.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const article = (app) => {
  // Register our service on the Feathers application
  app.use(articlePath, new ArticleService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: articleMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(articlePath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
