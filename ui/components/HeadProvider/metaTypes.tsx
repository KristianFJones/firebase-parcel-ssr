

export interface NewMetaTagParams {
  type: 'meta'
  name: 'description' | 'keywords' | 'author' | 'viewport'
  content: string
}