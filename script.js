// 🌙 থিম লোড
window.onload = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("dark");
  loadPosts();
  checkAdmin();
};

// 🌙 থিম টগল
function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// ✅ পোস্ট লোড
function loadPosts() {
  const postsDiv = document.getElementById("posts");
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const isAdmin = localStorage.getItem("admin") === "true";
  const search = document.getElementById("searchBox")?.value?.toLowerCase() || "";

  postsDiv.innerHTML = "";

  posts
    .filter(post =>
      post.title.toLowerCase().includes(search) ||
      post.details.toLowerCase().includes(search)
    )
    .forEach((post, i) => {
      const el = document.createElement("div");
      el.className = "post";
      el.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>ক্যাটেগরি:</strong> ${post.category}</p>
        <p>${post.details.substring(0, 100)}...</p>
        <a href="post.html?id=${i}">বিস্তারিত</a>
        ${isAdmin ? `<a href="#" onclick="deletePost(${i})">🗑️ Delete</a>` : ""}
      `;
      postsDiv.appendChild(el);
    });
}

// ❌ পোস্ট ডিলিট
function deletePost(index) {
  if (confirm("আপনি কি পোস্টটি ডিলিট করতে চান?")) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
  }
}

// 🔐 অ্যাডমিন চেক
function checkAdmin() {
  const isAdmin = localStorage.getItem("admin") === "true";
  document.getElementById("logoutBtn").style.display = isAdmin ? "inline" : "none";
  document.getElementById("adminBtn").style.display = isAdmin ? "none" : "inline";
}

// 🚪 লগআউট
function logout() {
  localStorage.removeItem("admin");
  window.location.reload();
}

// 🔍 সার্চ রিয়েলটাইম
document.addEventListener("input", (e) => {
  if (e.target.id === "searchBox") loadPosts();
});
