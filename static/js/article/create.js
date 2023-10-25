 $(document).ready(function () {
    // post_atricle 에서 submit 버튼 클릭시 작동
    $("#post-form").submit(function (e) {
      console.log("?")
      e.preventDefault();
      let postData = {
        title: $("#title").val(),
        content: $("#content").val(),
        store_name: $("#store-name").val(),
        latitude: $("#latitudeField").val(),
        longitude: $("#longitudeField").val(),
        friends_number: $("#friends-number").val()
      };

      console.log("Post data:", postData);
      postArticle(postData);
    });
 });
 

async function postArticle(postData) {
  // 로그인 토큰 가져오기 
  // let token = localStorage.getItem("token");
  // TODO: 1)로그인 되었는지 확인, 2)토큰 만료시 새로 발급

  // 게시글 작성 api 호출
  const response = await fetch("http://127.0.0.1:8000/article/", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(postData),
  });
  const response_json = await response.json();
  console.log(response_json);
};