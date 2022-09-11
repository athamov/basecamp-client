import { UserStore } from './UserStore.js';
import { ProjectStore } from './ProjectStore.js';
import { MemberStore } from './MemberStore';
import { TaskStore } from './TaskStore';
import { SubtaskStore } from './SubtaskStore';
import { ChatStore } from './ChatStore';
import { MessageStore } from './MessageStore';

export class RootStore {
    userStore:UserStore;
    ProjectStore:ProjectStore;
    MemberStore:MemberStore;
    TaskStore:TaskStore;
    SubtaskStore:SubtaskStore;
    ChatStore:ChatStore;
    MessageStore:MessageStore;
    isLoading = false;
    isAuth = false;

    constructor() {
        this.userStore = new UserStore(this);
        this.ProjectStore = new ProjectStore(this);
        this.MemberStore = new MemberStore(this);
        this.TaskStore = new TaskStore(this);
        this.SubtaskStore = new SubtaskStore(this);
        this.ChatStore = new ChatStore(this);
        this.MessageStore = new MessageStore(this);
        this.isLoading = false;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

}

const store = new RootStore();

export default store;