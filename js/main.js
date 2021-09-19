$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    // Make request to Github
    $.ajax({
        url:'https://api.github.com/users/'+username,
        data:{
          client_id:'b9315bcd5a07fcd759d8',
          client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4'
        }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'b9315bcd5a07fcd759d8',
          client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="card">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge forks">Forks: ${repo.forks_count}</span>
                  <span class="badge watchers">Watchers: ${repo.watchers_count}</span>
                  <span class="badge count">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn repo-page">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="card mb-3" style="max-width: 100rem;">
          <div class="card-header name"><h3>${user.name}</h3></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3 profile">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <br><br>
              <a target="_blank" class="btn viewProfile" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge repos">Public Repos: ${user.public_repos}</span>
              <span class="badge gists">Public Gists: ${user.public_gists}</span>
              <span class="badge followers">Followers: ${user.followers}</span>
              <span class="badge following">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item"><strong>Company:</strong> ${user.company}</li>
                <li class="list-group-item"><strong>Website/blog:</strong> <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                <li class="list-group-item"><strong>Location:</strong> ${user.location}</li>
                <li class="list-group-item"><strong>Member Since:</strong> ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
        `);
    });
  });
});
