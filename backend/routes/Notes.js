import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import Note from "../models/Todo.js";

const noteRouter = express.Router();

noteRouter.post("/addnote", fetchuser, async (req, res) => {
  try {
    const { title } = req.body;
    const note = new Note({
      title,
      user: req.user.id,
    });
    const savedNote = await note.save();
    res.send(savedNote);
  } catch (error) {
    console.log(error.message);
  }
});
noteRouter.get("/getallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.send(notes);
});

noteRouter.put("/updatenote/:id",  fetchuser, async (req, res) => {
  const {value} = req.body;
  try {
     await Note.findByIdAndUpdate(req.params.id , {done:value})
    
    // console.log(true)

  } catch (error) {
    res.status(401).send("Internal server error");
  }
});
noteRouter.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not Found");
    }
    if(note.user.toString()!=req.user.id){
        return res.status(400).send("Not Found");
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json(`success : Note has been deleted ${note}`)
  } catch (error) {
    res.status(401).send('Internal server error')
  }
});

export default noteRouter;
