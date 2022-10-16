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
    console.log(json)
    console.log(json.data[0].id)
    playerID = json.data[0].id
    results += '<h1 id="Header">You chose ' + json.data[0].first_name + " " +json.data[0].last_name + "</h1>";
    results += "<p id='description'>";
    results += "<h3>" + json.data[0].first_name + " " +json.data[0].last_name + " is " + json.data[0].height_feet + "ft " + json.data[0].height_inches + " inches tall, Wow!</h3>";
    results += "<h3>He played for the " + json.data[0].team.full_name + " in the " + json.data[0].team.division + " Divison which is apart of the " + json.data[0].team.conference + "ern Conference</h3>";
    results += '</p>';
  
    const url2 = "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" + playerID;
   fetch(url2)
    .then(function(response) {
        return response.json();
      }).then(function(extra) {
          console.log(extra.data[0].games_played)
          results += "He played for " + extra.data[0].games_played + "games."
      })
  .catch(error => {
    document.getElementById("Results").innerHTML = "";
    document.getElementById('forecast').style.border= "0px";
  });
  
  
  
  
    document.getElementById("Results").innerHTML = results;   
    
    
    

    
  })
  .catch(error => {
    let results = "<h2>Error</h2>";
    results += "<p id='errorMessage'>City couldn't be found. Please check your spelling and try again</p>";
    document.getElementById("Results").innerHTML = results;
  });
  
 
});
