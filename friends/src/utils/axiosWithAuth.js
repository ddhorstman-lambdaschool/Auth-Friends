import axios from "axios";

const baseURL = "http://localhost:5000/api/";

/**
 * Create an axios instance which automatically includes
 * an authorization token specified by the "token" key in
 * localStorage as well as the ability to cancel the call
 * if the component unmounts.
 * This version expects the token to be a JSON-encoded string.
 * @param {object} options The options to pass on to axios.create()
 */
export function axiosWithAuthCancellable(options) {
  if (!options) options = {};
  const token = JSON.parse(localStorage.getItem("token"));
  let unmountedInternal = false;
  let source = axios.CancelToken.source();
  /**
   * A function to cancel the API call in progress
   * and prevent any downstream changes based on the unmounted() property.
   * Call in componentWillUnmount() or return from useEffect().
   */
  const cancelAPICall = () => {
    unmountedInternal = true;
    source.cancel("Component unmounted. Data fetching cancelled.");
  };
  /**
   * A function to perform axios calls which automatically include
   * an authorization token specified by the "token" key in
   * localStorage as well as the ability to cancel the call
   * if the component unmounts using cancelAPICall().
   * This version expects the token to be a JSON-encoded string.
   * Specify any additional options when calling the parent function.
   */
  const axiosWithAuth = () =>
    axios.create({
      baseURL,
      cancelToken: source.token,
      headers: {
        Authorization: token,
      },
      ...options,
    });

  return {
    ...axios,
    /**
     * @returns {boolean} Whether the component has been unmounted
     */
    unmounted: () => unmountedInternal,
    axiosWithAuth,
    cancelAPICall,
  };
}
/**
 * A function to perform axios calls which automatically include
 * an authorization token specified by the "token" key in
 * localStorage.
 * This version expects the token to be a JSON-encoded string.
 * @param {object} options The options to be passed to axios.create()
 */
export function axiosWithAuth(options) {
  if (!options) options = {};
  const token = JSON.parse(localStorage.getItem("token"));

  return axios.create({
    baseURL,
    headers: {
      Authorization: token,
    },
    ...options,
  });
}
/**
 * A function to perform axios calls similarly to axiosWithAuth,
 * but without automatically including an authorization token.
 * @param {object} options The options to be passed to axios.create()
 */
export function axiosWithoutAuth(options) {
  if (!options) options = {};

  return axios.create({
    baseURL,
    ...options,
  });
}

export default axiosWithAuth;
