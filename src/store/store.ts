import { userStore } from "./userStore";
import { ProjectStore } from './projectStore';
import { MemberStore } from './memberStore';
import { TaskStore } from './taskStore';
import { SubtaskStore } from './subtaskStore';
import { ChatStore } from './chatStore';
import { MessageStore } from './messageStore';

export class RootStore {
    userStore;
    ProjectStore:ProjectStore;
    MemberStore:MemberStore;
    TaskStore:TaskStore;
    SubtaskStore:SubtaskStore;
    ChatStore:ChatStore;
    MessageStore:MessageStore;
    isLoading = false;
    isAuth = false;

    constructor() {
        this.userStore = userStore;
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