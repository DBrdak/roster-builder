import {SpreadsheetSettings} from "../models/spreadsheetSettings";
import {makeAutoObservable} from "mobx";

export default class CommonStore {
    settings: SpreadsheetSettings = new SpreadsheetSettings()
    selectedSpot: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    setSelectedSpot = (spot: string) => this.selectedSpot = spot
}