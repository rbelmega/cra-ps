export default function handler(req, res) {
  fetch(`https://graph.instagram.com/me/media?fields=id,caption&access_token=${process.env.INSTAGRAM_TOKEN}`)
    .then(response => response.json()).then(response => {
      const promises = response.data.map(item => fetch(`https://graph.instagram.com/${item.id}/?fields=media_url&access_token=${process.env.INSTAGRAM_TOKEN}`)
        .then(response => response.json()));

       Promise.all(promises).then(img => {
        res.status(200).json(img)
      })
  })
}
