window.onload = () => {
  console.log("로딩");
  getArticle();
};

async function getArticle() {
  // 게시글 정보 가져오기 
  const response = await fetch("http://127.0.0.1:8000/article/", {
    method: "GET",
  });

  const response_json = await response.json();
  console.log(response_json);

  // 게시글 정보 보여주기
  const articles = document.getElementById("articles");
  let html = "";

  response_json.forEach((element) => {
    html += `<div id="article" class="card mb-3" onclick="getDetailArticle(${element.id})">
                <div id="${element.id}" class="card-body">
                  <h6 id="store_name" class="card-title">${element.store_name}</h6>
                  <h5 id="title" class="card-title">${element.title}</h5>
                  <p id="content" class="card-text">${element.content}</p>
                  <p id="author" class="card-text" style="text-align: right">${element.username}</p>
                </div>
              </div>`;

    $("#articles").html(html);
  });
}

async function getDetailArticle(articleID) {
  // 특정 게시글 상세 페이지로 이동
  window.location.href = `/article/detail_article.html?articleID=${articleID}`;
}

async function postArticle() {
  // 게시글 생성하기
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const store_name = document.getElementById("store_name").value;
  const latitudeField = document.getElementById("latitudeField").value;
  const longitudeField = document.getElementById("longitudeField").value;

  // 로그인 토큰 가져오기
  // let token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/article/", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      title: title,
      content: content,
      store_name: store_name,
      latitudeField: latitudeField,
      longitudeField: longitudeField,
    }),
  });
  const response_json = await response.json();
  console.log(response_json);
}

async function putArticle(e) {
  // 게시글 수정하기
  // 로그인 토큰 가져오기
  let token = localStorage.getItem("token");

  target_id = e.target.parentElement.id;
  console.log(target_id);

  const response = await fetch(`http://127.0.0.1:8000/article/${target_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const response_json = await response.json();
  console.log(response_json);
  // 작성자와 수정자가 같을 경우 = 게시글 수정
  // 작성자와 수정자가 다를 경우 = 밥친구 신청
}

async function deleteArticle(e) {
  // 게시글 지우기
  target = e.target.parentElement;
  console.log(target);

  title = target.children.title.innerText;
  content = target.children.content.innerText;
  console.log(title, content);

  // 로그인 토큰 가져오기
  let token = localStorage.getItem("token");

  const response = await fetch(`http://127.0.0.1:8000/article/${target.id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  console.log(response);
}