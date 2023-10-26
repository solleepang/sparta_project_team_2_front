window.onload = () => {
    loadMypage()
}

function userIdSearch() {
    const url = window.location.href
    const url_split = url.split(["?"])[1]
    const user_id = url_split.split(["="])[1]

    return user_id
}

    
    
async function loadMypage() {

    const user_id = userIdSearch()

    const response = await fetch(`http://127.0.0.1:8000/user/mypage/${user_id}/`, {
        method : 'GET'
    })
    const response_json = await response.json()
    console.log(response_json)
    console.log(response_json.nickname)


    const user_image = document.getElementById("profile_image")
    const nickname = document.getElementById("nickname")
    const following_num = document.getElementById("following_count")
    const follower_num = document.getElementById("follower_count")

    nickname.innerText = response_json.nickname
    following_num.innerText = response_json.following_count
    follower_num.innerText = response_json.follower_count
    const user_image_img = document.createElement('img')
    user_image_img.style.height = "100px";
    // console.log(response_json.image)
    user_image_img.src = "http://127.0.0.1:8000" + response_json.image
    user_image_img.setAttribute("alt","user image")
    user_image.appendChild(user_image_img)
}

    
    
    
async function handleFollow() {
    if (localStorage.getItem("access"))

        var user_id = userIdSearch()

        const response = await fetch(`http://127.0.0.1:8000/user/follow/${user_id}/`, {
            method : 'POST',
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("access"),
            },
            
        })
        console.log(response)
    location.reload()
}