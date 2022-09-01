import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit({
  auth: "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", // esse token tem validade de 1 ano a contar de 29/08/2022
});

const list = document.querySelector(".list-repos");
const userData = document.querySelector(".repo-user");
const inputSearch = document.querySelector("#search");
let repos, user;

window.addEventListener("load", async (e) => {
  try {
    list.innerHTML = "<li>Carregando ...</li>";
    userData.innerHTML = "<li>Carregando ...</li>";
    repos = await octokit
      .request("GET /users/ayrlondouglas/repos", {
        org: "ORG",
      })
      .then((response) => response.data)
      .catch((error) => {
        list.innerHTML = "<li>Algum erro ocorreu</li>";
      });

    user = await octokit
      .request("GET /users/ayrlondouglas", {
        org: "ORG",
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        userData.innerHTML = "<li>Algum erro ocorreu</li>";
      });

    user && generateDataUser(user);
    repos && generateList(repos);
  } catch (error) {
    console.log(error);
  }
});

inputSearch.addEventListener("keyup", (e) => {
  const value = e.target.value;
  const reposFiltered = repos.filter((repo) =>
    repo.name.toLowerCase().includes(value.toLowerCase())
  );

  generateList(reposFiltered);
});

function generateList(items) {
  console.log(items);
  let newList = "";
  items.map((repo) => {
    newList += `
    <a href="${repo.html_url}" target="_BLANK">
        <li class="repo">
            <p>${repo.name}</p>
        </li>
    <a/>
        `;
  });

  list.innerHTML = newList;
}
function generateDataUser(data) {
  userData.innerHTML = `
    <img src="${data.avatar_url}">
    <div class="wraper-info">
        <h4>${data.name}</h4>
        <p>${data.bio}</p>
        <p>${data.location}</p>
        <p>Repos publicos: ${data.public_repos}</p>
    </div>
    

    `;
  console.log(data);
}
