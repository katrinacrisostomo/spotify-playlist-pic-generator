function redirect(url, queryParams) {
  if (queryParams) {
    let queryString = "?";
    for (const key in queryParams) {
      queryString += `${key}=${queryParams[key]}&`
    }
    url += queryString;
  }
  location.href = url;
}

function generatePlaylistCover(e) {
  e.preventDefault();

  const CLIENT_ID = "326af36f3fbd4a0dbcac034ee7216a2d";
  const IS_DEV = true;
  
  // TODO: update this to the real URL once we launch this
  let redirect_uri = "";
  if (IS_DEV) {
    redirect_uri = "http://localhost:8000";
  }
  redirect(`https://accounts.spotify.com/authorize`, queryParams={
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: redirect_uri,
  });
}
