
interface TimeRange {
    start: string
    end: string
}

export interface Shift {
    name: string | null
    workingHours: TimeRange
}


export class SpreadsheetSettings {
    private shifts: Map<string, Shift[]>
    private isEventOnLastShift!: Map<string, boolean>

    public constructor() {
        this.shifts = new Map<string, Shift[]>()
        this.isEventOnLastShift = new Map<string, boolean>()
        this.setD81Default()
        this.setMdmDefault()
    }

    private setD81Default(){
        const shifts: Shift[] = [
            {name: null, workingHours: {start: "8:00", end: '14:00'}},
            {name: null, workingHours: {start: "9:00", end: '15:00'}},
            {name: null, workingHours: {start: "14:00", end: '20:00'}},
            {name: null, workingHours: {start: "15:00", end: '20:00'}},
        ]

        this.shifts.set('D81', shifts)
        this.isEventOnLastShift.set('D81', true)
    }

    private setMdmDefault(){
        const shifts: Shift[] = [
            {name: 'BAR', workingHours: {start: "10:00", end: '16:00'}},
            {name: 'KUCHNIA', workingHours: {start: "10:00", end: '16:00'}},
            {name: 'POMOC', workingHours: {start: "13:00", end: '17:00'}},
            {name: 'BAR', workingHours: {start: "16:00", end: '21:00'}},
            {name: 'KUCHNIA', workingHours: {start: "16:00", end: '21:00'}},
        ]

        this.shifts.set('MDM', shifts)
        this.isEventOnLastShift.set('MDM', false)
    }

    public setCustomShifts(shifts: Shift[], spot: string){
        this.shifts.set(spot, shifts)
    }

    public getShifts(spot: string) {
        const shifts = this.shifts.get(spot)?.values()

        if(!shifts){
            return []
        }

        return Array.from(shifts)
    }

    public getIsEventOnLastDay(spot: string) {
        const isEventOnLastShift = this.isEventOnLastShift.get(spot)

        if(isEventOnLastShift === undefined){
            return null
        }

        return isEventOnLastShift
    }
}