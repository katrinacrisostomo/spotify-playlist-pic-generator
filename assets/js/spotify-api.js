const CLIENT_ID = '326af36f3fbd4a0dbcac034ee7216a2d';
const IS_DEV = true;

// If we have either the accessToken or error in the URL, then this is a popup
// window for authorization. Pass the results back to the original window and close
// the popup. Store the results in local storage so we don't need to re-authenticate
window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
  const accessToken = hashParams.get('access_token');
  const error = urlParams.get('error');

  if (accessToken || error) {
    if (accessToken) {
      localStorage.setItem('spotify-access-token', accessToken);
    }
    window.opener.onAuthorizationSuccess(accessToken, error)
    window.close();
  }
});

function addQueryParams(url, queryParams) {
  let queryString = '?';
  for (const key in queryParams) {
    queryString += `${key}=${queryParams[key]}&`
  }
  return url + queryString;
}

function generatePlaylistCover(playlistUrl, accessToken) {
  // TODO: start calling the Spotify API with the given params
  console.log("Got the access token and url:", playlistUrl);
}

function submitPlaylistUrl(form, e) {
  e.preventDefault();

  // Store the url in local storage to be used after authentication
  const playlistUrl = form.elements['playlistUrl'].value;
  localStorage.setItem('spotify-playlist-url', playlistUrl);

  // If we already have the authorization token, don't reauthenticate
  const accessToken = localStorage.getItem('spotify-access-token');
  if (accessToken) {
    generatePlaylistCover(playlistUrl, accessToken);
    return;
  }

  // TODO: update this to the real URL once we launch the site
  let redirect_uri = '';
  if (IS_DEV) {
    redirect_uri = 'http://localhost:8000';
  }

  authUrl = addQueryParams('https://accounts.spotify.com/authorize', queryParams={
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: redirect_uri,
  });

  // Do the authorization in a new window so that it's less disruptive
  // The window should automatically close after the user authorizes
  window.open(
    authUrl,
    "Login with Spotify",
  );
}

function onAuthorizationSuccess(accessToken, error) {
  if (accessToken) {
    const playlistUrl = localStorage.getItem('spotify-playlist-url');
    generatePlaylistCover(playlistUrl, accessToken);
  } else if (error) {
    // TODO: display error message on the webpage
    console.log("Failed to authorize:", error);
  }
}
