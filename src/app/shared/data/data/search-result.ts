export interface all {
    class: string;
    data: data[]
}

export interface data {
    url: string;
    title: string;
    desc: string;
    rating?: number;
    votes: number;
    type: string;
    contentSide: string;
}

export interface video {
    heading: string;
    data: videos[];
}

export interface videos {
    url: string;
    youtubeUrl: string;
    title: string;
    rating: number;
    votes: number;
    type: string;
}

export const allData: all[] = [
    {
        class: 'col-xxl-6 col-xl-6 box-col-12',
        data: [
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio/',
                title: 'PixelStrap - Portfolio | ThemeForest',
                desc: "2020's best selling creative wp themes. the #1 source of premium wp themes! themeforest 45,000+ wp themes & website templates from $2. check it out!",
                votes: 590,
                type: 'Theme',
                contentSide: 'left',
            },
            {
                url: 'PixelStrap - Portfolio | ThemeForestthemeforest.net › user ›',
                title: 'PixelStrap - Portfolio | ThemeForest',
                desc: "the #1 marketplace for premium website templates, including themes for wordpress, magento, drupal, joomla, and more. create a website, fast.",
                votes: 590,
                type: 'Theme',
                contentSide: 'left',
            },
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                title: 'Morbi feugiat mauris vel semper fringilla.',
                desc: "Kabul introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.",
                votes: 590,
                rating: 3,
                type: 'Theme',
                contentSide: 'left',
            },
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                title: 'Morbi feugiat mauris vel semper fringilla.',
                desc: "Kabul introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.",
                rating: 3,
                votes: 590,
                type: 'Theme',
                contentSide: 'left',
            },
        ]
    },
    {
        class: 'col-xxl-6 col-xl-6 box-col-12 search-all',
        data: [
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                title: 'Pixelstrap Website Templates from ThemeForest',
                desc: "Get 59 pixelstrap website templates on themeforest. buy pixelstrap website templates from $7. all created by our global community of independent web ...",
                rating: 3,
                votes: 590,
                type: 'Theme',
                contentSide: 'right',
            },
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                title: 'Morbi feugiat mauris vel semper fringilla.',
                desc: "Kabul introduces a ielts coaching, toefl coaching, gre coaching, gmat coaching, sat coaching in surat.",
                votes: 590,
                type: 'Theme',
                rating: 3,
                contentSide: 'right',
            },
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                title: 'PixelStrap - Portfolio | ThemeForest',
                desc: "2020's Best Selling Creative WP Themes. The #1 Source of Premium WP Themes! ThemeForest 45,000+ WP Themes & Website Templates From $2. Check it Out!",
                votes: 590,
                type: 'Theme',
                contentSide: 'right',
            },
            {
                url: 'PixelStrap - Portfolio | ThemeForestthemeforest.net › user ›',
                title: 'PixelStrap - Portfolio | ThemeForest',
                desc: "The #1 marketplace for premium website templates, including themes for WordPress.",
                votes: 590,
                type: 'Theme',
                contentSide: 'right',
            },
        ]
    }
]

export const videosData: video[] = [
    {
        heading: 'About 6,000 results (0.60 seconds)',
        data: [
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                youtubeUrl: 'https://www.youtube.com/embed/CJnfAXlBRTE',
                title: 'Koho introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching.',
                rating: 3,
                votes: 590,
                type: 'Theme'
            },
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                youtubeUrl: 'https://www.youtube.com/embed/wpmHZspl4EM',
                title: 'Tivo introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching.',
                rating: 3,
                votes: 590,
                type: 'Theme'
            },
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                youtubeUrl: 'https://www.youtube.com/embed/-L4gEk7cOfk',
                title: 'Kabul introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching.',
                rating: 3,
                votes: 590,
                type: 'Theme'
            },
        ]
    },
    {
        heading: 'About 6,000 results (0.60 seconds)',
        data: [
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                youtubeUrl: 'https://www.youtube.com/embed/CJnfAXlBRTE',
                title: 'Enzo introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching.',
                rating: 3,
                votes: 590,
                type: 'Theme'
            },
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                youtubeUrl: 'https://www.youtube.com/embed/-L4gEk7cOfk',
                title: 'Morbi eget quam et purus commodo dapibus.',
                rating: 3,
                votes: 590,
                type: 'Theme'
            },
            {
                url: 'https://themeforest.net/user/pixelstrap/portfolio',
                youtubeUrl: 'https://www.youtube.com/embed/wpmHZspl4EM',
                title: 'Tivo introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching.',
                rating: 3,
                votes: 590,
                type: 'Theme'
            },
        ]
    }

]