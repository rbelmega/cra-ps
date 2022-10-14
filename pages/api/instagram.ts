const accessToken = process.env.INSTAGRAM_TOKEN;

export default function handler(req, res) {
  fetch(
    `https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}`
  )
    .then((response) => response.json())
    .then((response) => {
      if (!Array.isArray(response.data)) {
        throw response;
      }

      const promises = response.data.map((item) =>
        fetch(
          `https://graph.instagram.com/${item.id}/?fields=media_url,media_type&access_token=${accessToken}`
        ).then((response) => response.json())
      );

      Promise.all(promises).then((img) => {
        res.status(200).json(img);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json([]);
    });
}
