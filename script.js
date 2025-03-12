const firebaseConfig = {
    apiKey: "AIzaSyAvn-980wYhxmYygLTcPVVjglKy9tXv_s8",  // Replace with your actual key, but never share it publicly!
    authDomain: "project-database-870cb.firebaseapp.com",
    databaseURL: "https://project-database-870cb-default-rtdb.firebaseio.com",
    projectId: "project-database-870cb",
    storageBucket: "project-database-870cb.appspot.com",
    messagingSenderId: "771011516170",
    appId: "1:771011516170:web:f66a2d3f929d27a32f4cf3",
    measurementId: "G-2HYBZE2W1B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to Load Projects from Firestore
function loadProjects() {
    db.collection("projects").get().then((querySnapshot) => {
        let projectList = document.getElementById("project-list");
        projectList.innerHTML = ""; // Clear existing projects

        querySnapshot.forEach((doc) => {
            let project = doc.data();
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.github}" target="_blank">View on GitHub</a>
            `;
            projectList.appendChild(projectDiv);
        });
    });
}

// Function to Add a New Project (Admin Only)
document.getElementById("add-project").addEventListener("click", function() {
    let title = document.getElementById("project-title").value;
    let description = document.getElementById("project-desc").value;
    let github = document.getElementById("github-link").value;

    if (title && description && github) {
        db.collection("projects").add({
            title: title,
            description: description,
            github: github
        }).then(() => {
            alert("Project added successfully!");
            loadProjects();
        }).catch((error) => {
            console.error("Error adding project: ", error);
        });
    } else {
        alert("Please fill all fields.");
    }
});

// Load projects on page load
loadProjects();
