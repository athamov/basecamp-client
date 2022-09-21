import { userStore } from "./userStore";
import { projectStore } from './ProjectStore';
import { memberStore } from './MemberStore';
import { taskStore } from './TaskStore';
import { subtaskStore } from './SubtaskStore';
import { chatStore } from './ChatStore';
import { messageStore } from './MessageStore';

export class RootStore {
    userStore;
    ProjectStore;
    MemberStore;
    TaskStore;
    SubtaskStore;
    ChatStore;
    MessageStore;
    isLoading = false;
    isAuth = false;

    constructor() {
        this.userStore = userStore;
        this.ProjectStore = projectStore;
        this.MemberStore =  memberStore;
        this.TaskStore = taskStore;
        this.SubtaskStore = subtaskStore;
        this.ChatStore = chatStore;
        this.MessageStore = messageStore;
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