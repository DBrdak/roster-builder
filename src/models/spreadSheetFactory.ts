import Month from "./month";
import * as ExcelJS from 'exceljs'

export default class SpreadsheetFactory {
    private readonly _spot: string
    private readonly _month: Month;
    private readonly _eventDays: number[];
    private readonly _closedDays: number[];

    constructor(spot: string, month: Month, eventDays: number[], closedDays: number[]) {
        this._spot = spot
        this._month = month;
        this._eventDays = eventDays;
        this._closedDays = closedDays;
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

        this.d81AddSideNavbar(worksheet)

        this._month.days.forEach((day, dayIndex) => {
            const dayOfWeekId = day.id;
            const isClosedDay = this._closedDays.includes(dayIndex);
            const isEventDay = this._eventDays.includes(dayIndex);

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

            worksheet.getCell(weekId + 1, dayOfWeekId + 1).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 1, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            };
            worksheet.getCell(weekId + 2, dayOfWeekId + 1).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 2, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            };
            worksheet.getCell(weekId + 3, dayOfWeekId + 1).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 3, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            };
            if (isEventDay) worksheet.getCell(weekId + 3, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FF00FF00'}
            };

            if (dayOfWeekId + 1 === 8) {
                weekId += 4;
            }

            worksheet.columns.forEach((c: any) => c.width = 24)
        })
    }

    private async mdmCreateSpreadsheet(worksheet: any): Promise<void> {
        let weekId = 1;

        this.mdmAddSideNavbar(worksheet)

        this._month.days.forEach((day, dayIndex) => {
            const dayOfWeekId = day.id;
            const isClosedDay = this._closedDays.includes(dayIndex);
            const isEventDay = this._eventDays.includes(dayIndex);

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
            if(isEventDay) worksheet.getCell(weekId, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FF00FF00'}
            };

            worksheet.getCell(weekId + 1, dayOfWeekId + 1).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 1, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            };

            worksheet.getCell(weekId + 2, dayOfWeekId + 1).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 2, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            };

            worksheet.getCell(weekId + 3, dayOfWeekId + 1).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 3, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            };

            worksheet.getCell(weekId + 4, dayOfWeekId + 1).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 4, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            };

            worksheet.getCell(weekId + 5, dayOfWeekId + 1).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 5, dayOfWeekId + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            };

            if (dayOfWeekId + 1 === 8) {
                weekId += 6;
            }

            worksheet.columns.forEach((c: any) => c.width = 24)
        })
    }

    private mdmAddSideNavbar(worksheet: any) {
        let isInit = true

        worksheet.getCell(1,1).value = `${this._month.value}`
        worksheet.getCell(1,1).font = {bold: true}
        worksheet.getCell(1,1).alignment = {horizontal: 'center'}
        let i = 2

        this._month.days.forEach((day, dayIndex) => {
            if(day.id === 1 || isInit){

                worksheet.getCell(i,1).value = '10:00 - 16:00 BAR'
                worksheet.getCell(i+1,1).value = '10:00 - 16:00 KUCHNIA'
                worksheet.getCell(i+2,1).value = '13:00 - 17:00 POMOC'
                worksheet.getCell(i+3,1).value = '16:00 - 21:00 BAR'
                worksheet.getCell(i+4,1).value = '16:00 - 21:00 KUCHNIA'

                isInit = false
                i += 6
            }
        })
    }

    private d81AddSideNavbar(worksheet: any) {
        let isInit = true

        worksheet.getCell(1,1).value = `${this._month.value}`
        worksheet.getCell(1,1).font = {bold: true}
        worksheet.getCell(1,1).alignment = {horizontal: 'center'}
        let i = 2

        this._month.days.forEach((day, dayIndex) => {
            if(day.id === 1 || isInit){

                worksheet.getCell(i,1).value = '8:00 - 14:00'
                worksheet.getCell(i+1,1).value = '9:00 - 17:00'
                worksheet.getCell(i+2,1).value = '13:45 - 20:00'

                isInit = false
                i += 4
            }
        })
    }
}