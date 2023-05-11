export type LayoutView = 'Default' | 'GameOver' | 'Landing' | '404' | '500'

export interface IRootStore {
  layout: {
    type: LayoutView
  }
}
