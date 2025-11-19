import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import subredditsReducer from '../store/slices/subbredditsSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState = {
        subreddits: {
            posts: [],
            loading: false,
            error: null,
            searchTerm: ''
        }
    },
    store = configureStore({ reducer: { subreddits: subredditsReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}