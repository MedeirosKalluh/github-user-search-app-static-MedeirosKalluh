const NOT_FOUND = 404

//Dark mode
function changeMode() {
    const element = document.body;
    element.classList.toggle("dark-mode");
}

// Set API

const cardEl = document.querySelector(".card")
const initialState = document.querySelector(".card__initial")
const loadingEl = document.getElementById("loading")
const notFoundScreenEl = document.getElementById("not-found")
const searchEl = document.querySelector(".search")
const searchInput = document.querySelector(".search__bar")
const API_GIT  = `https://api.github.com`

searchEl.addEventListener('submit', async function(event){
    event.preventDefault();
    setLoadingScreen();
    const infoApi = await getUser(searchInput.value)
    writeHtmlCardInfo(infoApi)
    setResult(infoApi.status)
})

function setResult (statusCode){
    if(statusCode === NOT_FOUND){
        return setUserNotFound();
    } else {
        return  setCardScreen();
    }        
}

async function getUser(username) {
    const response = await fetch(`${API_GIT}/users/${username}`);
    const apiStatus = response.status
    const info = await response.json();
    return {...info, status:apiStatus}
}


function setLoadingScreen() {
    initialState.style.display = "none";
    cardEl.style.display = "none"
    notFoundScreenEl.style.display = "none"
    loadingEl.style.display = "flex";
}

function setCardScreen(){
    loadingEl.style.display = "none";
    cardEl.style.display = "grid";
    notFoundScreenEl.style.display = "none";
}

function setUserNotFound(){
    cardEl.style.display = "none"
    loadingEl.style.display = "none";
    notFoundScreenEl.style.display = "flex";
}

const userAvatar = document.getElementById("user-avatar")
const userName = document.getElementById("user-name")
const githubProfileLink = document.getElementById("profile-link")
const githubJoinDate = document.getElementById("join-date")
const userBio = document.getElementById("user-bio")
const userRepos = document.getElementById("user-repos")
const userFollowers = document.getElementById("user-followers")
const userFollowing = document.getElementById("user-following")
const userLocation = document.getElementById("user-location")
const userTwitter = document.getElementById("user-twitter")
const userBlog = document.getElementById("user-blog")
const userCompany = document.getElementById("user-company")

function setContentOrFallback (apiValue, value = "Empty"){
    return apiValue ? apiValue : value;    
}

function setDisable(element, value){
    if(!value){
        element.closest(".card__social").classList.add("card__text--not-enabled")
    } else if (value){
        element.closest(".card__social").classList.remove("card__text--not-enabled")
    } 
}

function writeHtmlCardInfo(infoApi){
    userAvatar.src = setContentOrFallback(infoApi.avatar_url, 'images/Oval.png'); 
    userName.textContent = setContentOrFallback(infoApi.name)
    githubProfileLink.textContent =   setContentOrFallback(infoApi.login)
    githubProfileLink.href =  setContentOrFallback(infoApi.html_url)
    const apiDate = new Date(infoApi.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'})
    githubJoinDate.textContent =  setContentOrFallback(`Joined ${apiDate}`)    
    userBio.textContent =  setContentOrFallback(infoApi.bio, "BIO EMPTY")
    userRepos.textContent =  setContentOrFallback(infoApi.public_repos, "0")
    userFollowers.textContent =  setContentOrFallback(infoApi.followers, "0")
    userFollowing.textContent = setContentOrFallback(infoApi.following, "0")   
    userLocation.textContent = setContentOrFallback(infoApi.location)
    setDisable(userLocation, infoApi.location)    
    userTwitter.textContent = setContentOrFallback(infoApi.twitter_username)
    setDisable(userTwitter, infoApi.twitter_username)
    userBlog.href = setContentOrFallback(infoApi.blog)
    userBlog.textContent = setContentOrFallback(infoApi.blog)   
    setDisable(userBlog, infoApi.blog)
    userCompany.textContent = setContentOrFallback(infoApi.company)
    setDisable(userCompany, infoApi.company)
}