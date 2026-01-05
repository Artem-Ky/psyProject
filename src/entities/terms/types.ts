export interface Term {
  term: string
  definition: string
}

export interface TermsCollection {
  [key: string]: string
}

export interface Topic {
  id: string
  name: string
  terms: Term[]
}
