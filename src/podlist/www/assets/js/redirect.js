(() => {
  // node_modules/@muze-nl/metro-oauth2/src/oauth2.popup.mjs
  function handleRedirect() {
    let params = new URLSearchParams(window.location.search);
    if (!params.has("code") && window.location.hash) {
      let query = window.location.hash.substr(1);
      params = new URLSearchParams("?" + query);
    }
    let parent = window.parent ? window.parent : window.opener;
    if (params.has("code")) {
      parent.postMessage({
        authorization_code: params.get("code")
      }, window.location.origin);
    } else if (params.has("error")) {
      parent.postMessage({
        error
      }, window.location.origin);
    } else {
      parent.postMessage({
        error: "Could not find an authorization_code"
      }, window.location.origin);
    }
  }

  // podlist/redirect.mjs
  handleRedirect();
  window.close();
})();
