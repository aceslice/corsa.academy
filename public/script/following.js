const unfollowButtons = document.querySelectorAll(".unfollow");
  const followButtons = document.querySelectorAll(".icon");

  for (let followButton of followButtons) {
    followButton.addEventListener("click", async () => {
      followButton.classList.toggle("tertiary-button");
      if (followButton.classList.contains("tertiary-button")) {
        followButton.innerHTML = "Following";
      } else {
        followButton.innerHTML = "Follow";
      }
      const followerId = followButton.getAttribute("data-custom");
      const userId = followButton.getAttribute("data-user");
      try {
        const res = await fetch(`peers/${userId}/follow`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ followerId }),
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  for (let unfollowButton of unfollowButtons) {
    unfollowButton.addEventListener("click", async () => {
      const followerId = unfollowButton.getAttribute("data-custom");
      const userId = unfollowButton.getAttribute("data-user");
      if (unfollowButton.classList.contains("primary-button")) {
        unfollowButton.innerHTML = "Following";
      } else {
        unfollowButton.innerHTML = "Follow";
      }
      try {
        const res = await fetch(`peers/${userId}/unfollow`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ followerId }),
        });
      } catch (error) {
        console.log(error);
      }
    });
  }