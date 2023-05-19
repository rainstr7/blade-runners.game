export type LayoutView = 'Default' | 'GameOver' | 'Landing' | 'Error'

export interface IRootStore {
  layout: {
    type: LayoutView
  },
  score: {
    value: number
  }
}
