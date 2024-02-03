// Sample current test score
const currentTestScore = 0;

// Function to update leaderboard
function updateLeaderboard() {
    const quizData = JSON.parse(localStorage.getItem('userData')) || [];

    // Check if the current test score is higher than the existing score
    const isScoreHigher = quizData.some(data => currentTestScore > data.score);

    if (isScoreHigher) {
        // Sort data in descending order based on score
        quizData.sort((a, b) => b.score - a.score);

        // Clear the existing table rows
        const leaderboardTable = document.getElementById('leaderboard');
        leaderboardTable.innerHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

        // Populate the table with sorted data
        quizData.forEach((data, index) => {
            const row = `<tr>
                            <td>${index + 1}</td>
                            <td>${data.username}</td>
                            <td>${data.score}</td>
                        </tr>`;
            leaderboardTable.innerHTML += row;
        });
    } else {
        console.log("Current test score is not higher than the existing scores. Leaderboard not updated.");
    }
}

// Call the function to initially populate the leaderboard
updateLeaderboard();


// Function to update leaderboard
function updateLeaderboard() {
    const quizData = JSON.parse(localStorage.getItem('userData')) || [];

    // Sort data in descending order based on score
    quizData.sort((a, b) => b.score - a.score);

    // Clear the existing table rows
    const leaderboardTable = document.getElementById('leaderboard');
    leaderboardTable.innerHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

    // Populate the table with sorted data
    quizData.forEach((data, index) => {
        const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${data.username}</td>
                        <td>${data.score}</td>
                    </tr>`;
        leaderboardTable.innerHTML += row;
    });
}

// Call the function to initially populate the leaderboard
updateLeaderboard();



function logout() {
    localStorage.setItem('loggedInUser', "");
    
    location.href = "index.html"
  }
  