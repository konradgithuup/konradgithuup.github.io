const GITHUB_PROFILE = "https://api.github.com/users/konradgithuup"

function loadGithubProfile(id) {
    window.fetch(GITHUB_PROFILE).then(function (response) {
        return response.json();
    }).then(function (user) {
        img = document.createElement("img");
        img.classList.add("profile-picture");
        img.src = user.avatar_url;
        document.getElementById(id).appendChild(img);

        var link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = user.avatar_url;
    });
}
