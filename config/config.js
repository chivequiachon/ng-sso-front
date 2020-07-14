var config_file = "config/local.json";
var api_url;

$(document).ready(function () {
  $("#login-form").submit(function (event) {
    //stop submit the form, we will post it manually.
    event.preventDefault();

    authenticate();
  });
  $.getJSON(config_file, function (data) {
    api_url = data.api_url;
    console.log(api_url);
  });
});

function authenticate() {
  var username = $("#login-user").val();
  var password = $("#login-pass").val();
  var authorization;
  console.log(username);
  console.log(password);

  $.ajax({
    url: api_url + "/authenticate",
    contentType: "application/json",
    type: "POST",
    async: false,
    data: JSON.stringify({
      username: username,
      password: password
    }),
    dataType: "json",
    success: function (response) {
      authorization = "Bearer " + response.jwt;
    },
    error: function (xhr, status) {
      console.log("error");
    }
  });

  console.log(authorization);

  $.ajax({
    url: api_url + "/hello",
    contentType: "application/x-www-form-urlencoded",
    type: "GET",
    async: false,
    dataType: "json",
    headers: { 'Authorization': authorization },
    success: function (response) {
      console.log(response.message);
    },
    error: function (xhr, status) {
      console.log("error");
    }
  });
}
