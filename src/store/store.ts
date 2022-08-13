import { UserStore } from './userStore';
import { ProjectStore } from './ProjectStore';
import { MemberStore } from './MemberStore';

export class RootStore {
    userStore:UserStore;
    ProjectStore:ProjectStore;
    MemberStore:MemberStore;
    isLoading = false;
    isAuth = false;

    constructor() {
        this.userStore = new UserStore(this);
        this.ProjectStore = new ProjectStore(this);
        this.MemberStore = new MemberStore(this);
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