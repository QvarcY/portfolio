import { mkdir, writeFile } from 'node:fs/promises';

const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error('GITHUB_TOKEN is required');
}

const searchQuery = 'author:QvarcY is:pr is:merged -user:QvarcY';

const query = `
  query Contributions($query: String!, $cursor: String) {
    search(query: $query, type: ISSUE, first: 100, after: $cursor) {
      nodes {
        ... on PullRequest {
          title
          number
          url
          mergedAt
          repository {
            nameWithOwner
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const items = [];

let cursor = null;
let hasNextPage = true;

while (hasNextPage) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'qvarcy-portfolio'
    },
    body: JSON.stringify({
      query,
      variables: {
        query: searchQuery,
        cursor
      }
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    throw new Error(
      payload.errors.map(error => error.message).join('; ')
    );
  }

  const search = payload.data.search;

  for (const pullRequest of search.nodes) {
    if (!pullRequest?.mergedAt) {
      continue;
    }

    items.push({
      repo: pullRequest.repository.nameWithOwner,
      number: pullRequest.number,
      title: pullRequest.title,
      url: pullRequest.url,
      merged_at: pullRequest.mergedAt
    });
  }

  hasNextPage = search.pageInfo.hasNextPage;
  cursor = search.pageInfo.endCursor;
}

items.sort((a, b) => {
  return new Date(b.merged_at) - new Date(a.merged_at)
    || a.repo.localeCompare(b.repo)
    || b.number - a.number;
});

const output = {
  count: items.length,
  items
};

await mkdir('data', { recursive: true });

await writeFile(
  'data/contributions.json',
  `${JSON.stringify(output, null, 2)}\n`,
  'utf8'
);

console.log(`Wrote ${items.length} merged contributions`);