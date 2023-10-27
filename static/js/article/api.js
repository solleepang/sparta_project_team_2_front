window.onload = () => {
  getArticle();
};

async function getArticle() {
  // 게시글 정보 가져오기 
  const response = await fetch("http://127.0.0.1:8000/article/", {
    method: "GET",
  });

  const response_json = await response.json();

  // 게시글 정보 보여주기
  let html = "";

  response_json.forEach((element) => {
    html += `<div id="article" class="card mb-3" onclick="getDetailArticle(${element.id})">
                <div id="${element.id}" class="card-body">
                  <h6 id="store_name" class="card-title">${element.store_name}</h6>
                  <h5 id="title" class="card-title">${element.title}</h5>
                  <p id="content" class="card-text">${element.content}</p>
                  <p id="friends" class="card-text" style="font-size: 14px;">모집 현황: <span id="friends-number">${element.member_count} / ${element.friends_number}</span></p>
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
