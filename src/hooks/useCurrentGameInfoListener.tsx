import { Router } from 'decky-frontend-lib';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentGameInfo } from '../redux-modules/settingsSlice';

let id: number | undefined;

function useInterval(callback: any, delay: number) {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      if (id) {
        clearInterval(id);
      }
      id = window.setInterval(tick, delay);
      // return () => clearInterval(id);
    }
  }, [delay]);
}

export const useCurrentGameInfoListener = () => {
  const dispatch = useDispatch();

  useInterval(() => {
    const results = {
      id: `${Router.MainRunningApp?.appid || 'default'}`,
      displayName: `${
        Router.MainRunningApp?.display_name || 'default'
      }`,
    };
    dispatch(setCurrentGameInfo(results));
  }, 2000);
};