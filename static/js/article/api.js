window.onload = () => {
  console.log("로딩");
  getArticle();
};

async function getArticle() {
  const response = await fetch("http://127.0.0.1:8000/article/", {
    method: "GET",
  });

  const response_json = await response.json();
  console.log(response_json);

  const articles = document.getElementById("articles");

  response_json.forEach((element) => {
    const article = document.createElement("div");
    const title = document.createElement("h3");
    const content = document.createElement("div");
    const store_name = document.createElement("div");
    const button = document.createElement("button");

    article.id = element.id;
    title.innerText = element.title;
    content.innerText = element.content;
    store_name.innerText = element.store_name;
    button.innerText = "X";

    button.addEventListener("click", e => {
      deleteArticle(e);
    });

    article.append(title, content, store_name, button);
    articles.appendChild(article);
  
  });
}

async function postArticle() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const store_name = document.getElementById("store_name").value;
  const latitudeField = document.getElementById("latitudeField").value;
  const longitudeField = document.getElementById("longitudeField").value;

  const response = await fetch("http://127.0.0.1:8000/article/", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      "title": title,
      "content": content,
      "store_name": store_name,
      "latitudeField": latitudeField,
      "longitudeField": longitudeField,
    }),
  });
  const response_json = await response.json();
  console.log(response_json);
}

async function deleteArticle(e) {
  target_id = e.target.parentElement.id;

  const response = await fetch(`http://127.0.0.1:8000/article/${target_id}/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "DELETE",
  });

  console.log(response);
}