import Month from "./month";
import * as ExcelJS from 'exceljs'
import {SpreadsheetSettings} from "./spreadsheetSettings";
import Day from "./day";

export default class SpreadsheetFactory {
    private readonly _spot: string
    private readonly _month: Month;
    private readonly _eventDays: number[];
    private readonly _closedDays: number[];
    private readonly _settings: SpreadsheetSettings

    constructor(spot: string, month: Month, eventDays: number[], closedDays: number[], settings: SpreadsheetSettings) {
        this._spot = spot
        this._month = month;
        this._eventDays = eventDays;
        this._closedDays = closedDays;
        this._settings = settings
    }

    async createAndDownloadSpreadsheet() {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet(`${this._spot} ${this._month} dyspo`);

        switch (this._spot) {
            case 'D81':
                await this.d81CreateSpreadsheet(worksheet)
                break
            case 'MDM':
                await this.mdmCreateSpreadsheet(worksheet)
                break
            default:
                throw new Error('Niewłaściwa nazwa lokalu')
        }

        const blob = await workbook.xlsx.writeBuffer();
        const blobUrl = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${this._spot} ${this._month} dyspo.xlsx`;
        link.click();

        URL.revokeObjectURL(blobUrl);
    }

    private async d81CreateSpreadsheet(worksheet: any): Promise<void> {
        let weekId = 1;

        this.addSideBar(worksheet)

        this._month.days.forEach((day, dayIndex) => {
            const dayOfWeekId = day.id;
            const isClosedDay = this._closedDays.includes(dayIndex);
            const isEventDay = this._eventDays.includes(dayIndex);

            this.addDayHeader(worksheet, weekId, dayOfWeekId, day, dayIndex, isEventDay)
            this.addDayBody(worksheet, weekId, dayOfWeekId, isClosedDay, isEventDay)

            if (dayOfWeekId + 1 === 8) {
                weekId += this.shifts().length + 1;
            }
        })

        worksheet.columns.forEach((c: any) => c.width = 24)
    }

    private async mdmCreateSpreadsheet(worksheet: any): Promise<void> {
        let weekId = 1;

        this.addSideBar(worksheet)

        this._month.days.forEach((day, dayIndex) => {
            const dayOfWeekId = day.id;
            const isClosedDay = this._closedDays.includes(dayIndex);
            const isEventDay = this._eventDays.includes(dayIndex);

            this.addDayHeader(worksheet, weekId, dayOfWeekId, day, dayIndex, isEventDay)
            this.addDayBody(worksheet, weekId, dayOfWeekId, isClosedDay, isEventDay)

            if (dayOfWeekId + 1 === 8) {
                weekId += 6;
            }

            worksheet.columns.forEach((c: any) => c.width = 24)
        })
    }

    private addSideBar(worksheet: any) {
        let isInit = true

        worksheet.getCell(1,1).value = `${this._month.value}`
        worksheet.getCell(1,1).font = {bold: true}
        worksheet.getCell(1,1).alignment = {horizontal: 'center'}
        let i = 2

        this._month.days.forEach((day) => {
            if(day.id === 1 || isInit){

                this.shifts().forEach((shift, index) => {
                    worksheet.getCell(i + index, 1).value = `${shift.workingHours.start} - ${shift.workingHours.end} ${shift.name ? shift.name : ''}`
                    worksheet.getCell(i + index, 1).alignment = {horizontal: 'center'}
                })

                isInit = false
                i += this.shifts().length +1
            }
        })
    }

    private addDayHeader(worksheet: any, weekId: number, dayOfWeekId: number, day: Day, dayIndex: number, isEventDay: boolean){
        worksheet.getCell(weekId, dayOfWeekId + 1).value = `${day.value} ${dayIndex}`;
        worksheet.getCell(weekId, dayOfWeekId + 1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'be56be'}
        };
        worksheet.getCell(weekId, dayOfWeekId + 1).border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            right: {style: 'thin'},
            bottom: {style: 'thin'}
        };
        worksheet.getCell(weekId, dayOfWeekId + 1).font = {bold: true};
        worksheet.getCell(weekId, dayOfWeekId + 1).alignment = {horizontal: 'center'};

        if(isEventDay && !this.isEventOnLastShift()){
            worksheet.getCell(weekId, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FF00FF00'}
            };
        }
    }

    private addDayBody(worksheet: any,  weekId: number, dayOfWeekId: number, isClosedDay: boolean, isEventDay: boolean){

        this.shifts().forEach((shift, index) => {
            worksheet.getCell(weekId + 1 + index, dayOfWeekId + 1).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };

            if (isClosedDay) worksheet.getCell(weekId + 1 + index, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            };

            if(isEventDay && this.isEventOnLastShift() && index >= this.shifts().length - 2){
                worksheet.getCell(weekId + 1 + index, dayOfWeekId + 1).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {argb: 'FF00FF00'}
                };
            }
        })
    }

    private shifts = () => this._settings.getShifts(this._spot)!
    private isEventOnLastShift = () => this._settings.getIsEventOnLastDay(this._spot)!
}