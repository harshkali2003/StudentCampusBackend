const app = require('./appImport');
const likeData = require('../Models/likes');

app.post('/likes', async (req, resp) => {
  const { userId, postId } = req.body;

  try {
    const like = await likeData.create({ postId, userId });
    console.log("Liked");
    resp.status(201).send(`${userId}`);
  } catch (err) {
    if (err.code === 11000) {
      resp.status(409).send("Already liked");
    } else {
      resp.status(500).send("Error");
    }
  }
});


app.get('/likes/:postId' , async (req , resp) => {
    const count = await likeData.countDocuments( { postId: req.params.postId } );
    resp.send(`${count}`);
})