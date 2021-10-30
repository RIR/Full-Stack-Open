import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  // Seems to be fine to use define and freeze this in here. So far at least...
  const state = initialState;
  deepFreeze(state);

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test('ok is incremented', () => {
    const action = {
      type: 'OK',
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });
  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });
  test('zero resets the state', () => {
    const action = {
      type: 'ZERO',
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
