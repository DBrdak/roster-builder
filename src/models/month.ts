import Day from "./day";

export default class Month {
    id: number;
    value: string;
    days: ReadonlyMap<number, Day>;

    private constructor(id: number, value: string) {
        this.id = id;
        this.value = value;
        this.days = this.createDaysInMonth();
    }

    private createDaysInMonth(): ReadonlyMap<number, Day> {
        const days = new Map<number, Day>();
        const now = new Date();
        const isNextYear = now.getMonth() + 1 >= this.id;
        const year = isNextYear ? now.getFullYear() + 1 : now.getFullYear();

        const firstDayOfMonth = new Date(year, this.id - 1, 1);
        const daysInMonth = new Date(year, this.id, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++, firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1)) {
            days.set(day, Day.fromDateTime(new Date(firstDayOfMonth)));
        }

        return new Map(days);
    }

    static readonly January = new Month(1, "Styczeń");
    static readonly February = new Month(2, "Luty");
    static readonly March = new Month(3, "Marzec");
    static readonly April = new Month(4, "Kwiecień");
    static readonly May = new Month(5, "Maj");
    static readonly June = new Month(6, "Czerwiec");
    static readonly July = new Month(7, "Lipiec");
    static readonly August = new Month(8, "Sierpień");
    static readonly September = new Month(9, "Wrzesień");
    static readonly October = new Month(10, "Październik");
    static readonly November = new Month(11, "Listopad");
    static readonly December = new Month(12, "Grudzień");

    static readonly All: Month[] = [
        Month.January,
        Month.February,
        Month.March,
        Month.April,
        Month.May,
        Month.June,
        Month.July,
        Month.August,
        Month.September,
        Month.October,
        Month.November,
        Month.December,
    ];

    static fromValue(value: string): Month {
        const lowercasedValue = value.toLowerCase();
        const foundMonth = Month.All.find((m) => m.value.toLowerCase() === lowercasedValue);
        if (foundMonth) {
            return foundMonth;
        } else {
            throw new Error(`${value} is an invalid month value`);
        }
    }

    static fromId(id: number): Month {
        const foundMonth = Month.All.find((m) => m.id === id);
        if (foundMonth) {
            return foundMonth;
        } else {
            throw new Error(`${id} is an invalid month ID`);
        }
    }

    static nextMonth() : Month {
        const currentMonthId = new Date().getMonth() + 1
        const nextMonthId = currentMonthId + 1 > 12 ?
            1 : currentMonthId + 1
        return Month.fromId(nextMonthId)
    }

    toString(): string {
        return `${this.value}`;
    }
}