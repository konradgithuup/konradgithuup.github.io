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

function loadGithubProjects(id) {
    var timespans;
    timespans = fetch("resources/projects.json").then(re => re.json);
    var parent = document.getElementById(id);


    window.fetch(GITHUB_PROFILE + "/repos").then(function (response) {
        return response.json();
    }).then(function (repos) {

        fetch("resources/projects.json").then(re => re.json()).then(function (timespans) {
            timespans.forEach(timespan => {
                createTimespanHeading(parent, timespan.timespan);
                timespan.projects.forEach(project => {
                    repos.forEach(repo => {
                        if (project.id == repo.id) {
                            createProjectPanel(parent, project, repo);
                        }
                    })
                })
            })
        })
    });
}

function createTimespanHeading(parent, timespan) {
    var title = document.createElement("div");
    title.setHTMLUnsafe("<h2>" + timespan + "</h2>");
    parent.appendChild(title);
}

function createProjectPanel(parent, project, repo) {
    var name = repo.name;
    var link = repo.html_url;
    var stars = repo.stargazers_count;

    var container = document.createElement("div");
    container.classList.add("repo");

    var title = document.createElement("a");
    title.classList.add("repoLink");
    title.setAttribute("href", link);
    title.textContent = name + " (★ " + stars + ")";

    var body = document.createElement("div");
    body.textContent = project.description;

    container.appendChild(title);
    container.appendChild(body);
    parent.appendChild(container);
}