const fetchLocalSongs = () => {
  fetch("../JSON/songs.json")
  .then(res => res.json())
  .then(songs => {
    console.log(songs);
    // Write the code to:
    //Save the songs for local use
  })
}

