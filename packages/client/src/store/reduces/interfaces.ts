export type LayoutView = 'Default' | 'GameOver' | 'Landing'

export interface IRootStore {
  layout: {
    type: LayoutView
  }
}
