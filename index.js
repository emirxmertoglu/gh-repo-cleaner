import axios from "axios";

const GITHUB_ACCESS_TOKEN = "GITHUB_ACCESS_TOKEN"; // Add your token here
const USERNAME = "USERNAME"; // Add your GitHub username here
const ESCAPE_LIST = []; // Add repository names that you don't want to delete here

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

async function getRepositories() {
  try {
    let repositories = [];
    let page = 1;

    while (true) {
      const response = await githubApi.get(`/user/repos`, {
        params: { per_page: 100, page },
      });

      if (response.data.length === 0) break;

      repositories = repositories.concat(
        response.data.map((repo) => repo.name)
      );
      page++;
    }

    return repositories;
  } catch (error) {
    console.error(
      "❌ Failed to fetch repositories:",
      error.response?.statusText || error.message
    );
    return [];
  }
}

async function deleteRepository(repoName) {
  try {
    await githubApi.delete(`/repos/${USERNAME}/${repoName}`);
    console.log(`✅ Deleted: ${repoName}`);
  } catch (error) {
    console.error(
      `❌ Failed to delete (${repoName}):`,
      error.response?.statusText || error.message
    );
    throw error;
  }
}

async function deleteRepositories(reposToDelete) {
  let successCount = 0;
  let failCount = 0;

  for (const repo of reposToDelete) {
    try {
      await deleteRepository(repo);
      successCount++;
    } catch {
      failCount++;
    }
  }

  console.log(
    `✅ Deletion complete: ${successCount} success, ${failCount} failed.`
  );
}

// Main function
(async () => {
  const repositories = await getRepositories();

  if (repositories.length === 0) {
    console.log("No repositories found.");
    return;
  }

  const reposToDelete = repositories.filter(
    (repo) => !ESCAPE_LIST.includes(repo)
  );

  if (reposToDelete.length === 0) {
    console.log(
      "No repositories to delete. All repositories are in the escape list."
    );
    return;
  }

  console.log(`Total ${reposToDelete.length} repositories will be deleted...`);

  await deleteRepositories(reposToDelete);

  console.log("✅ All specified repositories have been deleted.");
})();
