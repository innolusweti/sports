document.addEventListener("DOMContentLoaded", function() {
  loadPosts();
});

function loadPosts() {
  const postsContainer = document.querySelector(".posts");

  // Fetch the XML file
  fetch("tennis.xml")
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
      })
      .then(data => {
          console.log("Data loaded:", data);
          const parser = new DOMParser();
          const xml = parser.parseFromString(data, "text/xml");
          const posts = xml.getElementsByTagName("post");

          // Clear loading message
          postsContainer.innerHTML = "";

          // Loop through each post and display it
          for (let post of posts) {
              const title = post.getElementsByTagName("title")[0].textContent;
              const content = post.getElementsByTagName("content")[0].textContent;
              const people = post.getElementsByTagName("person"); // Get the people (tennis players)

              // Create a blog post element
              const postElement = document.createElement("div");
              postElement.className = "post";

              const titleElement = document.createElement("h2");
              titleElement.textContent = title;

              const contentElement = document.createElement("p");
              contentElement.textContent = content;

              // Create a list of people (names of tennis players)
              const peopleList = document.createElement("ul");

              for (let person of people) {
                  const personName = person.getElementsByTagName("name")[0].textContent;
                  const listItem = document.createElement("li");
                  listItem.textContent = personName;
                  peopleList.appendChild(listItem);
              }

              // Append the post content and people list to the post element
              postElement.appendChild(titleElement);
              postElement.appendChild(contentElement);
              postElement.appendChild(peopleList); // Add the people list

              postsContainer.appendChild(postElement);
          }
      })
      .catch(error => {
          postsContainer.innerHTML = "<p>Failed to load posts.</p>";
          console.error('Error loading posts:', error);
      });
}

