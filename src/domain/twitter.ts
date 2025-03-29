interface TweetData {
  id: string;
  text: string;
  created_at: string;
}

export async function getTweets(): Promise<TweetData[]> {
  try {
    if (!process.env.TWITTER_BEARER_TOKEN) {
      console.error('Twitter Bearer Token is not configured');
      return [];
    }

    // First, get the user ID
    const userResponse = await fetch(
      'https://api.twitter.com/2/users/by/username/izzz0',
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!userResponse.ok) {
      console.error('Twitter API user lookup error:', userResponse.status);
      return [];
    }

    const userData = await userResponse.json();
    const userId = userData.data?.id;

    if (!userId) {
      console.error('Could not find user ID');
      return [];
    }

    // Then get the tweets using the user ID
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at,text`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
        next: {
          revalidate: 3600,
          tags: ['tweets'],
        },
      }
    );

    if (tweetsResponse.status === 401) {
      console.error(
        'Twitter API: Unauthorized - Please check your Bearer Token'
      );
      return [];
    }

    if (tweetsResponse.status === 429) {
      console.error('Twitter API: Rate limit reached');
      return [];
    }

    if (!tweetsResponse.ok) {
      console.error('Twitter API tweets error:', tweetsResponse.status);
      return [];
    }

    const data = await tweetsResponse.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return [];
  }
}
