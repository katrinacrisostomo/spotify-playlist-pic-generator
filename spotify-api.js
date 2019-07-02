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

function generatePlaylistCover() {
  const CLIENT_ID = "326af36f3fbd4a0dbcac034ee7216a2d";
  
  redirect(`https://accounts.spotify.com/authorize`, queryParams={
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: 'https://google.com',
  });
}
//<script src="spotify-api.js"></script>
generatePlaylistCover();
