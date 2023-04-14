import { combineReducers } from 'redux';

import user from './user';
import favorites from './favorites';

const root = combineReducers({
    user,
    favorites
});

export default root;