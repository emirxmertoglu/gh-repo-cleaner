# 🚀 gh-repo-cleaner

A simple and efficient Node.js script to **delete multiple GitHub repositories at once** while ensuring that specified repositories are **protected from deletion**.

## ✨ Features

- Fetches **all** repositories from your GitHub account (handles pagination).
- **Excludes specific repositories** from deletion using an escape list.
- Deletes repositories **sequentially** to avoid hitting GitHub API rate limits.
- Provides **clear logs** on which repositories were deleted and which failed.

## 📌 Prerequisites

- **Node.js** (v14 or later)
- **[A GitHub Personal Access Token](https://github.com/settings/tokens)** with `repo` and `delete_repo` permissions.

## 🚀 Installation & Usage

### 1️⃣ Clone the repository

```sh
git clone https://github.com/emirxmertoglu/gh-repo-cleaner.git
cd gh-repo-cleaner
```

### 2️⃣ Install dependencies

Since this script only uses **Axios**, you can install it via:

```sh
yarn install
```

### 3️⃣ Configure your credentials

Open `index.js` and replace the placeholders:

```javascript
const GITHUB_ACCESS_TOKEN = "your_personal_access_token";
const USERNAME = "your_github_username";
const ESCAPE_LIST = ["repo1", "repo2", "repo3"];
```

### 4️⃣ Run the script

```sh
node index.js
```

### 📌 Important Notes

- This **action is irreversible**! Double-check the `ESCAPE_LIST` before running the script.
- GitHub imposes **rate limits** on API requests. If you have too many repositories, you might hit these limits.

## 🤝 Contributing

Feel free to **fork** this repository and submit **pull requests**. Any contributions, whether fixing bugs, optimizing code, or adding features, are welcome!

## 🐟 License

This project is licensed under the **MIT License**.

## 📚 Sources

- [List repositories for a user](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user)
- [Delete a repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#delete-a-repository)
