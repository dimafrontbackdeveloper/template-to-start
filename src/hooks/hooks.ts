import { AppDispatch, RootState } from '../redux/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '../redux/actions/index';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Cookies from 'js-cookie';

// use dispatch
export const useTypedDispatch: () => AppDispatch = useDispatch;

// use selector
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// for dispatch actions without fails
export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};

// for using local storage
export const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    const jsonVal = localStorage.getItem(key);
    if (jsonVal !== null) return JSON.parse(jsonVal);

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

// for controlled input
export const useInput = (initialVal: any) => {
  const [val, setVal] = useState(initialVal);

  const reset = () => {
    setVal(initialVal);
  };

  const bind = {
    value: val,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setVal(e.target.value),
  };

  return { val, reset, bind };
};

type TypeOut = {
  ref: any;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
};

// 	Hide element when click outside

export const useOutside = (initialIsVisible: boolean): TypeOut => {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  return { ref, isShow, setIsShow };
};

export const useCookie = (name: any, initialValue: any) => {
  const [value, setValue] = useState(() => {
    const cookie = Cookies.get(name);
    if (cookie) return cookie;

    Cookies.set(name, initialValue);
    return initialValue;
  });

  const updateCookie = useCallback(
    (newVal: any, options: any) => {
      Cookies.set(name, newVal, options);
      setValue(newVal);
    },
    [name],
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(null);
  }, [name]);

  return [value, updateCookie, deleteCookie];
};

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(url);
        const data = await res.json();

        setData(data);
      };

      fetchData();
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, error };
};
