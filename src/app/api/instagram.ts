const accessToken = process.env.INSTAGRAM_TOKEN;

export default function handler(req, res) {
  fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${accessToken}`
  )
    .then((response) => response.json())
    .then((response) => {
      if (!Array.isArray(response.data)) {
        throw response;
      }

      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json([]);
    });
}
