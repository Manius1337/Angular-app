import { Kanban } from "../enums/kanban.enum";

export interface Functionality {
    ID:string;
      name: string;
      description: string;
      project: "Default Project"; 
      user: "Maciej";
      kanban: Kanban;
    }