import * as Stomp from "stompjs"
import {makeAutoObservable} from "mobx";

export default class Store {
    stompClient: Stomp.Client | null = null;

    constructor() {
        makeAutoObservable(this);
    }
}