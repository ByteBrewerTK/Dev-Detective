const URL = "https://api.github.com/users/";
const get = param=>document.querySelector(param),
    root = document.documentElement.style,
    mode = get("#mode"),
    modeLabel = get("#mode-label"),
    modeIcon = get("#mode i"),
    searchBar = get(".search-bar"),
    searchInput = get(".search"),
    searchBtn = get(".btn-search"),
    notFound = get(".not-found"),
    avatar = get(".avatar img"),
    fullName = get(".name"),
    joinDate = get(".date-join"),
    userName = get(".user-name"),
    bio = get(".bio"),
    repos = get(".repo-count"),
    followers = get(".follower-count"),
    following = get(".following-count"),
    locationLink = get(".location-data"),
    page = get(".bio-data"),
    twitterLink = get(".twitter-user"), 
    companyName = get(".company-name"),
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let toggleMode = false; 


const getUser = async gitUrl => {
    await fetch(gitUrl)
        .then(response=> response.json())
        .then(data=>{
            updateProfile(data)
        })
        
        .catch(error =>{
            throw error
        })
}

const updateProfile = data =>{

    if(data.message !== "Not Found"){
        notFound.style.display = "none";

        avatar.src = data.avatar_url;
        fullName.innerHTML = data.name ? data.name : data.login;
        userName.innerHTML = "@"+data.login;
        userName.href = data.html_url;
        dateSegment = data.created_at.split("T").shift().split("-");
        joinDate.innerHTML = `Joined ${dateSegment[2]} ${month[dateSegment[1]-1]} ${dateSegment[0]}`;
        bio.innerHTML = data.bio ? data.bio : "This profile has no bio";
        repos.innerHTML = data.public_repos;
            followers.innerHTML = data.followers;
        following.innerHTML = data.following;
        locationLink.innerHTML = data.location ? data.location : "Not available";
        page.innerHTML = data.blog ? data.blog : "Not Available";
        twitterLink.innerHTML = data.twitter_username ? data.twitter_username : "Not Available";
        companyName.innerHTML = data.company ? data.company : "Not Available";

    }
    else{
        notFound.style.display = "block";
        setTimeout(()=>{
            notFound.style.display = "none";
        },1000)
    }
}

searchInput.addEventListener('keydown', (e)=>{
    if(e.key == "Enter")
        if(searchInput.value !== "")
            getUser(URL+searchInput.value);
})
searchBtn.addEventListener('click', ()=>{
    if(searchInput.value !== "")
        getUser(URL+searchInput.value);
})

const darkMode = ()=>{
    root.setProperty("--col-bg", "#000319");
    root.setProperty("--col-bold-text","#aebdef");
    root.setProperty("--col-card", "#3d404c");
    root.setProperty("--col-text","#9eafe8");
    root.setProperty("--col-data-card", "#2f2f2f");
    // root.setProperty("--shadow", "0px 0px 10px -3px #5959cd");
    root.setProperty("--shadow", "0px 0px 10px -3px #000");
    modeIcon.classList.add("bxs-sun");
    modeIcon.classList.remove("bxs-moon");
    modeLabel.textContent = "LIGHT";
    toggleMode = true;
}

const lightMode = ()=>{
    root.setProperty("--col-bg", "#fff");
    root.setProperty("--col-bold-text","#6c6c9f");
    root.setProperty("--col-card", "#fff");
    root.setProperty("--col-text","#747d9a");
    root.setProperty("--col-data-card", "#c4c4c432");
    root.setProperty("--shadow", "0px 0px 10px -3px #000");
    modeLabel.textContent = "DARK";
    modeIcon.classList.add("bxs-moon");
    modeIcon.classList.remove("bxs-sun");
    
    toggleMode = false;
}

lightMode();
mode.addEventListener('click', ()=>{
    // alert("hello");
    (toggleMode) ? lightMode():darkMode();
})
// darkMode();
getUser(URL+"ByteBrewerTK");

const value = localStorage.getItem("dark-mode");
console.log(value);
