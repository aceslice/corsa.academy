// Get the container element and all tab links
const container = document.querySelector(".container");
const tabs = document.querySelectorAll(".tablinks");
const allTab = document.querySelector(".tablinks:first-child");
allTab.className += " active";
// Fetch courses based on the active tab
async function fetchCourses() {
  try {
    // Get the active tab link
    const activeTab = document.querySelector(".tablinks.active");
    let activeTabText = "all";
    if (activeTab) {
      // Get the text content of the active tab link
      activeTabText = activeTab.textContent.trim().toLowerCase();
    }
    // Add the "active" class to the "All" tab link if no tab link is active
    container.innerHTML = `<h1>Loading...</h1>`;

    // Fetch course data from the API
    const response = await fetch("/courses/api");
    const data = await response.json();

    let filteredData = data;
    // Filter the data based on the active tab
    if (activeTabText !== "all") {
      filteredData = data.filter(
        (course) => course.tags && course.tags.includes(activeTabText)
      );
    }
    // Generate HTML for the course cards
    if (filteredData.length > 0) {
      let cards = "";
      filteredData.forEach((course) => {
        let { name, tutor, price, location, thumbnail, tags } = course;
        if (!isNaN(price)) {
          price = `<p>GHS <span class="price">${Number(price)}</span>.00</p>`;
        } else {
          price = `<p>${price}</p>`;
        }
        cards += `
          <div class="card">
            <div class="header" style="background-image: url('${thumbnail}')">
              <div class="overlay">
                <div class="more">
                  <a href="#">
                    <span class="profile-picture" style="background-image: url('${tutor.tutorImage}')"></span>
                  </a>
                  <img src="./assets/bookmark.svg" alt="" class="bookmark" />
                </div>
              </div>
            </div>
            <div class="details">
              <p class="tutor">${tutor.tutorName}</p>
              <p class="course-name">${name}</p>
              <a href="" class="tag">${location}</a>
              <div class="actions">
                ${price}
                <a href="courses/${course._id}"><button>Join</button></a>
              </div>
            </div>
          </div>
        `;
      });
      // Update the container with the generated HTML
      container.innerHTML = cards;
    } else {
      // Display a message if no courses were found
      container.innerHTML = `<h1> No courses on ${activeTabText} was found</h1>`;
    }
  } catch (err) {
    console.log(err);
    // Display an error message if there was an error fetching the data
    container.innerHTML = `<h1> Oops! Something went wrong.</h1>`;
  }
}

// Call fetchCourses on page load
fetchCourses();

// Add click event listeners to the tab links
tabs.forEach((tab) => {
  tab.addEventListener("click", (evt) => {
    evt.preventDefault();
    const cityName = evt.target.childNodes[0].data.trim();
    openCity(evt, cityName);
    fetchCourses();
  });
});

// Update the active tab link
function openCity(evt) {
  evt.preventDefault();
  console.log(evt.currentTarget);
  // Get all tab links and remove the "active" class
  let i, tablinks;
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // Add the "active" class to the clicked tab link
  evt.currentTarget.className += " active";
}

// Call fetchCourses again to update the courses based on the active tab
fetchCourses();

