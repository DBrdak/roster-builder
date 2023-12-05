export default class Day {
    id: number;
    value: string;
    shorthand: string

    private constructor(id: number, value: string, shorthand: string) {
        this.id = id;
        this.value = value;
        this.shorthand = shorthand
    }

    static readonly Monday = new Day(1, "Poniedziałek", 'Pn');
    static readonly Tuesday = new Day(2, "Wtorek", 'Wt');
    static readonly Wednesday = new Day(3, "Środa", 'Śr');
    static readonly Thursday = new Day(4, "Czwartek", 'Czw');
    static readonly Friday = new Day(5, "Piątek", 'Pt');
    static readonly Saturday = new Day(6, "Sobota", 'Sob');
    static readonly Sunday = new Day(7, "Niedziela", 'Niedz');

    static readonly All: Day[] = [
        Day.Monday,
        Day.Tuesday,
        Day.Wednesday,
        Day.Thursday,
        Day.Friday,
        Day.Saturday,
        Day.Sunday
    ];

    static fromValue(value: string): Day {
        const lowercasedValue = value.toLowerCase();
        const foundDay = Day.All.find((d) => d.value.toLowerCase() === lowercasedValue);
        if (foundDay) {
            return foundDay;
        } else {
            throw new Error(`${value} is an invalid day value`);
        }
    }

    static fromId(id: number): Day {
        const foundDay = Day.All.find((d) => d.id === id);
        if (foundDay) {
            return foundDay;
        } else {
            throw new Error(`${id} is an invalid day ID`);
        }
    }

    static fromDateTime(date: Date): Day {
        const dayOfWeekEnum = date.getDay();

        return Day.fromDayOfWeekEnum(dayOfWeekEnum);
    }

    static fromDayOfWeekEnum(dayOfWeekEnum: number): Day {
        let id = dayOfWeekEnum;

        if (id === 0) {
            id = 7;
        }

        return Day.All.find((d) => d.id === id) || Day.Monday; // Default to Monday if not found
    }

    toString(): string {
        return `${this.value}`;
    }
}