import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from 'src/store/reducers';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(
      applyMiddleware(thunk)
    ),
   );
  const persistor = persistStore(store);

  return { store, persistor }
}
