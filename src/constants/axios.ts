import axios from "axios";
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
} from "axios-extensions";
import LRUCache from "lru-cache";

const LONG_MAX_AGE = 300000;
const LONG_MAX_STACK = 200;
const SHORT_MAX_AGE = 10000;
const SHORT_MAX_STACK = 100;

export const axiosCacheLong = axios.defaults.adapter
  ? axios.create({
      baseURL: "/",
      headers: { "Cache-Control": "no-cache" },
      adapter: throttleAdapterEnhancer(
        cacheAdapterEnhancer(axios.defaults.adapter, {
          defaultCache: new LRUCache({
            maxAge: LONG_MAX_AGE,
            max: LONG_MAX_STACK,
          }),
          enabledByDefault: false,
        })
      ),
    })
  : null;

export const axiosCacheShort = axios.defaults.adapter
  ? axios.create({
      baseURL: "/",
      headers: { "Cache-Control": "no-cache" },
      adapter: throttleAdapterEnhancer(
        cacheAdapterEnhancer(axios.defaults.adapter, {
          defaultCache: new LRUCache({
            maxAge: SHORT_MAX_AGE,
            max: SHORT_MAX_STACK,
          }),
          enabledByDefault: false,
        })
      ),
    })
  : null;
