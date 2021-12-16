import { Group } from "../models/group.model";

class GroupCtrl {
  model = Group;
  modelname = 'groups';

  // Create and Save a new Reward
  create = (req, res) => {
    // Validate request
    if (!req.body) 
      res.status(400).send({ message: "Content can not be empty!" });


    const group = new Group({
      name: req.body.name,
      type: req.body.type,
      img: req.body.img,
      members: req.body.members,
    });

    // Save Reward in the database
    Group
    .create(group)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Group state."
      });
    });

    return;
  }
  
  // Retrieve all Groups from the database.
  findAll = async (req, res) => {
   
    try {
      const obj = await this.model.find();
      console.log(obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  // Retrieve all Groups of a specified member from the database.
  findGroupsOfMember = (req, res) => {
    Group.find({ members: { $in : req.params.memberId } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving groups."
        });
      });
  };

  // Retrieve all Groups of a specified type from the database.
  findGroupsOfType = (req, res) => {
    Group.find({ type: req.params.type })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving groups."
        });
      });
  };

  // Find a Group with id
  findOne = (req, res) => {
    Group.findOne({ _id: req.params.id })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving group."
        });
      });
  };

  // Update a Group with id
  update = (req, res) => {
    console.log(req.body);
    const data = req.body;
    
    Group.findOneAndUpdate({ _id: req.params.id }, {
      name: data.name,
      type: data.type,
      img: data.img,
      members: data.members
    })
      .then(data => {
        console.log(data);
        
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating groups."
        });
      });
  };

  // Delete a Reward with id
  delete = (req, res) => {
    Group.findOneAndDelete({ _id: req.params.id })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting group."
        });
      });
  };

  // Update a Group with id
  addMemberToGroup = (req, res) => {
    const member = req.body;
    
    Group.findOne({ _id: req.params.id })
      .then(data => {
        data.members.push(member);
        data.save();
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating groups."
        });
      });
  };
 
}

export const groupCtrl = new GroupCtrl();

