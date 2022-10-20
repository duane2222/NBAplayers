document.getElementById("Submit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("Input").value;
  if (value === "")
    return;
  console.log(value);
  var playerID;
  const url = "https://www.balldontlie.io/api/v1/players/?search=" + value;
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let results = "";
    
  
    playerID = json.data[0].id
     results += "<div class='main'>";
    results += '<h1 id="Header">You chose ' + json.data[0].first_name + " " +json.data[0].last_name + "</h1>";
    results += "<p id='description'>";
    results += "<h3>" + json.data[0].first_name + " " +json.data[0].last_name + " is " + json.data[0].height_feet + "ft " + json.data[0].height_inches + " inches tall, Wow!</h3>";
    results += "<h3>He played for the " + json.data[0].team.full_name + " in the " + json.data[0].team.division + " Divison which is apart of the " + json.data[0].team.conference + "ern Conference</h3>";
    results += '</p>';
    results += "</div>";
  
    const url2 = "https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=" + playerID;
   fetch(url2)
    .then(function(response) {
        return response.json();
      }).then(function(extra) {
          results += "<hr color='black'>";
          results += "<div class='main'>";
          results += "<h1>" + json.data[0].first_name + " " + json.data[0].last_name  + "'s 2021 season</h1>";
          results += "<h3>He played for " + extra.data[0].games_played + " games with an average playtime of " + extra.data[0].min + ". </h3>";
          results += "<h3>During those games, he averaged " + extra.data[0].pts + " points with an average of " + extra.data[0].ast + " assists</h3>";
          results += "<h3>He also had " + extra.data[0].reb + " rebounds on average and " + extra.data[0].stl + " steals</h3>";
          results += "</div>";
          document.getElementById("Results").innerHTML = results;   
      })
  .catch(error => {
    results += "<h2>Error</h2>";
    results += "<p id='errorMessage'>Player didn't play in the 2021 season. Please check your spelling and try again</p>";
    document.getElementById("Results").innerHTML = results;
  });
  })
  .catch(error => {
    let results = "<h2>Error</h2>";
    results += "<p id='errorMessage'>Player couldn't be found. Please check your spelling and try again</p>";
    document.getElementById("Results").innerHTML = results;
  }); 
});
