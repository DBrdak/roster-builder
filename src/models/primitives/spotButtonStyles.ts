export interface SpotButtonStyles {
    mdm: {
        size: string,
            maxSize: string,
            fontSize: string,
            opacity: string,
            variant: 'outlined' | 'contained'
    },
        d81: {
            size: string,
                maxSize: string,
                fontSize: string,
                opacity: string,
                variant: 'outlined' | 'contained'
        }
}

export class SpotButtonStylesBuilder {

    public static mdmSelected() : SpotButtonStyles{
        return {
            mdm: {
                size: '40vw',
                maxSize: '400px',
                fontSize: '36px',
                opacity: '1',
                variant: 'contained'
            },
            d81: {
                size: '30vw',
                maxSize: '300px',
                fontSize: '28px',
                opacity: '0.2',
                variant: 'outlined'
            }
        }
    }

    public static d81Selected() : SpotButtonStyles{
        return {
            mdm: {
                size: '30vw',
                maxSize: '300px',
                fontSize: '28px',
                opacity: '0.2',
                variant: 'outlined'
            },
            d81: {
                size: '40vw',
                maxSize: '400px',
                fontSize: '36px',
                opacity: '1',
                variant: 'contained'
            },
        }
    }

    public static neitherSelected() : SpotButtonStyles {
        return {
            mdm: {
                size: '40vw',
                maxSize: '400px',
                fontSize: '36px',
                opacity: '1',
                variant: 'outlined'
            },
            d81: {
                size: '40vw',
                maxSize: '400px',
                fontSize: '36px',
                opacity: '1',
                variant: 'outlined'
            },
        }
    }
}