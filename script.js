'use strict';
const searchURL = 'https://api.github.com/users';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>`
    );}
  $('#results').removeClass('hidden');
}
  

function getUserHandle(username) {
  const url = searchURL + `/${username}/` + 'repos';
  console.log(url)
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-search-for').val();
    getUserHandle(username);
    $('#js-error-message').empty();
  });
}

$(watchForm);