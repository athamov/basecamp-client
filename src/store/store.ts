import { userStore } from "./userStore";
import { projectStore } from './projectStore';
import { memberStore } from './memberStore';
import { taskStore } from './taskStore';
import { subtaskStore } from './subtaskStore';
import { chatStore } from './chatStore';
import { messageStore } from './messageStore';

export class RootStore {
    userStore;
    ProjectStore;
    MemberStore;
    TaskStore;
    SubtaskStore;
    chatStore;
    MessageStore;
    isLoading = false;
    isAuth = false;

    constructor() {
        this.userStore = userStore;
        this.ProjectStore = projectStore;
        this.MemberStore =  memberStore;
        this.TaskStore = taskStore;
        this.SubtaskStore = subtaskStore;
        this.chatStore = chatStore;
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