import { createStore } from 'redux';
import rootStore from '../store/reduces/root'

const reducer = rootStore

export function create(initialState?: any) {
  return createStore(reducer, initialState);
}
