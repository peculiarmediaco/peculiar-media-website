document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.querySelector(".simple-search");
  const topicCards = document.querySelectorAll(".topic-card");
  const resources = document.querySelectorAll(".simple-resource");

  let activeTopic = "all";

  function filterResources() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    resources.forEach(function (resource) {

      const resourceText = resource.textContent.toLowerCase();
      const resourceTopics =
        (resource.dataset.topics || "").toLowerCase().split(" ");

      const matchesSearch =
        resourceText.includes(searchTerm);

      const matchesTopic =
        activeTopic === "all" ||
        resourceTopics.includes(activeTopic);

      if (matchesSearch && matchesTopic) {
        resource.style.display = "grid";
      } else {
        resource.style.display = "none";
      }

    });
  }


  searchInput.addEventListener("input", function () {
    activeTopic = "all";

    topicCards.forEach(function (card) {
      card.classList.remove("active");
    });

    filterResources();
  });

  searchInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {
    event.preventDefault();

    filterResources();

    searchInput.blur();

    document
      .querySelector(".simple-resource-list")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  }

});

  topicCards.forEach(function (card) {

    card.addEventListener("click", function (event) {
      event.preventDefault();

      const selectedTopic = card.dataset.topic;

      if (activeTopic === selectedTopic) {
        activeTopic = "all";
        card.classList.remove("active");
      } else {
        activeTopic = selectedTopic;

        topicCards.forEach(function (otherCard) {
          otherCard.classList.remove("active");
        });

        card.classList.add("active");
      }

      filterResources();

      document
        .querySelector(".simple-resource-list")
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    });

  });

});
