import {SpreadsheetSettings} from "../models/spreadsheetSettings";
import {makeAutoObservable} from "mobx";

export default class CommonStore {
    settings: SpreadsheetSettings = new SpreadsheetSettings()

    constructor() {
        makeAutoObservable(this)
    }
}