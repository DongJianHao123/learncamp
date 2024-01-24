// reducers/index.js
import { combineReducers } from 'redux';
// import userReducer from './user';
import calcReducer from './calc'

// 使用 combineReducers 将所有 reducer 合并为一个根 reducer
export default combineReducers({
  // ... 添加其他 reducers
  // userReducer,
  calcReducer,
  
});
