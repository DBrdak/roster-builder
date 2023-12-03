import Month from "./month";
import * as ExcelJS from 'exceljs'

export default class SpreadsheetFactory {
    private readonly _month: Month;
    private readonly _eventDays: number[];
    private readonly _closedDays: number[];

    constructor(month: Month, eventDays: number[], closedDays: number[]) {
        this._month = month;
        this._eventDays = eventDays;
        this._closedDays = closedDays;
    }

    async createAndDownloadSpreadsheet(): Promise<void> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`D81 ${this._month} dyspo`);

        let weekId = 1;

        this._month.days.forEach((day, dayIndex) => {
            const dayOfWeekId = day.id;
            const isClosedDay = this._closedDays.includes(dayIndex);
            const isEventDay = this._eventDays.includes(dayIndex);

            worksheet.getCell(weekId, dayOfWeekId).value = `${day.value} ${dayIndex}`;
            worksheet.getCell(weekId, dayOfWeekId).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'be56be'} // LightPastelPurple
            };
            worksheet.getCell(weekId, dayOfWeekId).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            worksheet.getCell(weekId, dayOfWeekId).font = {bold: true};
            worksheet.getCell(weekId, dayOfWeekId).alignment = {horizontal: 'center'};

            worksheet.getCell(weekId + 1, dayOfWeekId).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 1, dayOfWeekId).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            }; // Red
            worksheet.getCell(weekId + 2, dayOfWeekId).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 2, dayOfWeekId).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            }; // Red
            worksheet.getCell(weekId + 3, dayOfWeekId).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                right: {style: 'thin'},
                bottom: {style: 'thin'}
            };
            if (isClosedDay) worksheet.getCell(weekId + 3, dayOfWeekId).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFF0000'}
            }; // Red
            if (isEventDay) worksheet.getCell(weekId + 3, dayOfWeekId).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FF00FF00'}
            }; // BrightGreen

            if (dayOfWeekId + 1 === 8) {
                weekId += 4;
            }


            worksheet.columns.forEach(c => c.width = 24)
        })

        const blob = await workbook.xlsx.writeBuffer();
        const blobUrl = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));

        // Create a download link and simulate a click to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `D81 ${this._month} dyspo.xlsx`;
        link.click();

        // Clean up the object URL to release resources
        URL.revokeObjectURL(blobUrl);
    }
}