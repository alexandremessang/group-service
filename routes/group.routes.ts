import { groupCtrl } from '../controllers/group.controller'
import express from 'express';


export class GroupRouter {

  router = express.Router();

  constructor() {
    this.configure();
  }

  protected configure(): void {

    // Create a new Group
    this.router.post("/", groupCtrl.create);
    
    // Retrieve all Groups
    this.router.get("/", groupCtrl.findAll);

    // Retrieve a single Group with id
    this.router.get("/:id", groupCtrl.findOne);

    // Retrieve Groups of specified member with id
    this.router.get("/member/:id", groupCtrl.findGroupsOfMember);

    // Retrieve Groups of specified type with string
    this.router.get("/type/:type", groupCtrl.findGroupsOfType);

    // Add Member to a specified group with id
    this.router.put("/:id/new", groupCtrl.addMemberToGroup);

    // Update a Group with id
    this.router.put("/:id", groupCtrl.update);

    // Delete a Group with id
    this.router.delete("/:id", groupCtrl.delete);
  }

}
export const groupRouter = new GroupRouter().router;