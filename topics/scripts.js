document.addEventListener("DOMContentLoaded", function () {
    const itemList = [
        { text: "Item 1", imageUrl: "category/sports.png" },
        { text: "Item 2", imageUrl: "category/history.png" },
        { text: "Item 3", imageUrl: "category/music.png" },
        { text: "Item 4", imageUrl: "category/agriculture.png" },
        { text: "Item 5", imageUrl: "category/sports.png"},
        { text: "Item 6", imageUrl: "category/science.png" }
    ];

    const container = document.querySelector(".container-grid");

itemList.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "custom-class", "col-auto" , "col-centered" , "animated" ,  "wow" , "jackInTheBox" , "slow");

    const img = document.createElement("img");
    img.src = item.imageUrl;

    // Add different classes to even and odd images
    if (index % 2 === 0) {
    img.classList.add("img-fluid", "mx-auto", "d-block", "animated", "wow", "jello", "slow", "infinite");
    } else {
    img.classList.add("img-fluid", "mx-auto", "d-block", "animated", "wow", "rotateIn", "slower", "infinite");
    }

    card.appendChild(img);

    const text = document.createElement("p");
    text.textContent = item.text;
    card.appendChild(text);

    container.appendChild(card);
});
});