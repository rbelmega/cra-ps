const accessToken = process.env.INSTAGRAM_TOKEN;

export const getPosts = () =>
  fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${accessToken}`,
    { next: { revalidate: 3600 } }
  )
    .then((response) => response.json())
    .then((response) => {
      if (!Array.isArray(response.data)) {
        throw response;
      }

      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
