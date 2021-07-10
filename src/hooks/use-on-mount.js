import { useEffect } from "react";

/**
 *
 * @param func
 */
export default function useOnMount(func) {
  useEffect(func, []);
}
