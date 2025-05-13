const app = require('./appImport')
const Query = require('../Models/questions')
const Answer = require('../Models/answers')

app.post('/query' , async (req , resp) => {
    try{
        let data = await Query(req.body);
        let result = await data.save();

        if(result){
            console.log("Success");
            resp.send(result);
        }else{
            resp.status(300).send("Error Occurred")
        }
    }catch{
        resp.status(404).send("Error Occurred")
    }
})

app.get('/query' , async (req , resp) => {
    try{
        let data = await Query.find();
        if(data){
            console.log("Success");
            resp.send(data);
        }
        else{resp.status(300).send("Error Occurred")}
    }
    catch{ 
        resp.status(404).send("Error Occurred")
    }
})

app.post('/answer', async (req, res) => {
    try {
        const { body, questionId } = req.body;

        if (!body || !questionId) {
            return res.status(400).send("Missing answer or question ID");
        }

        const data = new Answer({ body, questionId });
        const result = await data.save();

        console.log("Answer saved");
        res.send(result);
    } catch (err) {
        console.error("Error saving answer:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/answer/get/:questionId', async (req, res) => {
    try {
        const data = await Answer.find({ questionId: req.params.questionId });
        res.send(data);
    } catch (err) {
        res.status(500).send("Error fetching answers");
    }
});

app.delete('/query/:id', async (req, res) => {
  try {
    const result = await Query.findByIdAndDelete(req.params.id);
    if (result) {
      res.send({ message: 'Deleted successfully' });
    } else {
      res.status(404).send({ error: 'Question not found' });
    }
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

