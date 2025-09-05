export interface faqTopPart {
   title: string;
   colClass: string;
   desc: string;
   icon: string;
}

export interface featuredTutorial {
   id: number;
   rating: number;
   img: string;
   post: string;
   desc: string;
   date: string;
}

export interface articlesAndVideos {
   row: number;
   class: string;
   data: {
      id: number;
      icon: string;
      title: string;
      desc: string;
      class: string;
   }[];
}[]

export const FaqTopPartData: faqTopPart[] = [
   {
      title: 'Articles',
      colClass: 'col-xl-4 box-col-6',
      desc: "How little experience or technical knowledge you currently have. The web is a very big place, and if you are the typical internet user, you probably visit several websites every day.",
      icon: 'file-text'
   },
   {
      title: 'Knowledgebase',
      colClass: 'col-xl-4 col-sm-6 box-col-6',
      desc: "A Website Designing course enables learners to use essential designing and programming in tools required to do the job. The curriculum is a blend of various themes.",
      icon: 'book-open'
   },
   {
      title: 'Support',
      colClass: 'col-xl-4 col-sm-6 box-col-12',
      desc: "The customer support industry is renaissance. Customer support as a specialty is coming into its own, offering companies competitive advantage that’s difficult to copy.",
      icon: 'aperture'
   }
]

export const navigationData1 = [
   {
      icon: 'edit',
      title: 'Tutorials',

   },
   {
      icon: 'globe',
      title: 'Help center',

   },
   {
      icon: 'book-open',
      title: 'Knowledgebase',
   },
   {
      icon: 'file-text',
      title: 'Articles',
      count: '42'
   },
   {
      icon: 'youtube',
      title: 'Video Tutorials',
      count: '648'
   },
   {
      icon: 'message-circle',
      title: 'Ask our community',
      count: ''
   },
   {
      icon: 'mail',
      title: 'Contact us',

   },
]

export const navigationData2 = [
   {
      icon: 'message-circle',
      title: 'Ask our community',

   },
   {
      icon: 'mail',
      title: 'Contact us',

   }
]

export const featuredTutorialData: featuredTutorial[] = [
   {
      id: 1,
      rating: 5,
      img: 'assets/images/faq/1.jpg',
      post: 'Web Design',
      desc: "A Web Designing course belongs to the field of Computer It enables students to learn various techniques.",
      date: 'Dec 15, 2024',
   },
   {
      id: 2,
      rating: 4,
      img: 'assets/images/faq/2.jpg',
      post: 'Web Development',
      desc: "A Web Development course belongs to the field of Computer It enables students to learn various techniques.",
      date: 'Dec 15, 2024',
   },
   {
      id: 3,
      rating: 5,
      img: 'assets/images/faq/3.jpg',
      post: 'UI Design',
      desc: "User interface design (UI) is the design for machines and software, such as mobile devices, computers.",
      date: 'Dec 15, 2024',
   },
   {
      id: 4,
      rating: 4.5,
      img: 'assets/images/faq/4.jpg',
      post: 'UX Design',
      desc: "User Experience design (UX) is the design for machines and software, such as mobile devices, computers.",
      date: 'Dec 15, 2024',
   }
]

export const articlesAndVideosData: articlesAndVideos[] = [
   {
      row: 1,
      class: 'col-xl-4 col-md-6',
      data: [
         {
            id: 1,
            class: 'col-sm-12',
            icon: 'codepen',
            title: 'Using Video',
            desc: 'The web is a very big place, and if you are the typical internet base user.'
         },
         {
            id: 2,
            class: 'col-sm-12',
            title: 'Knows your sources',
            icon: 'codepen',
            desc: 'A book giving information on many subjects or on many aspects of one subject.'
         },
         {
            id: 3,
            class: 'col-sm-12',
            title: 'Sources credible/reliable',
            icon: 'codepen',
            desc: 'Simple demos of frequently asked questions about using the information resources'
         },
      ]
   },
   {
      row: 2,
      class: 'col-xl-4 col-md-6',
      data: [
         {
            id: 4,
            class: 'col-sm-12',
            title: 'Validate website',
            icon: 'file-text',
            desc: 'Website is the process of ensuring that the pages on the website conform.'
         },
         {
            id: 5,
            class: 'col-sm-12',
            title: 'Tailwind Design',
            icon: 'file-text',
            desc: 'Tailwind is so low-level, it never encourages you to design the same site twice.'
         },
         {
            id: 6,
            class: 'col-sm-12',
            title: 'Knows your sources',
            icon: 'file-text',
            desc: 'A book giving information on many subjects or on many aspects of one subject.'
         },
      ]
   },
   {
      row: 3,
      class: 'col-xl-4',
      data: [
         {
            id: 7,
            class: 'col-xl-12 col-md-6',
            title: 'Sources Demos',
            icon: 'youtube',
            desc: 'Simple demos of frequently asked questions about using the information resources'
         },
         {
            id: 8,
            class: 'col-xl-12 col-md-6',
            title: 'Validate Html',
            icon: 'youtube',
            desc: 'Website is the process of ensuring that the pages on the website conform.'
         },
         {
            id: 9,
            class: 'col-xl-12',
            title: 'Web Design',
            icon: 'youtube',
            desc: 'Web is so high-level, it never encourages you to design the same site twice'
         },
      ]
   }
]

export const questionData = [
   {
      data: [
         {
            panel: 'allData',
            title: 'Integrating WordPress with Your Website?',
            desc: 'How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.',
         },
         {
            panel: 'Second',
            title: 'WordPress Site Maintenance ?',
            desc: 'We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.',
         },
         {
            panel: 'Third',
            title: 'Meta Tags in WordPress ?',
            desc: 'Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.',
         },
         {
            panel: 'Fourth',
            title: 'WordPress in Your Language ?',
            desc: 'As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.',
         },
      ]
   },
   {
      heading: 'Intellectual Property',
      data: [
         {
            panel: 'Fifth',
            title: 'WordPress Site Maintenance ?',
            desc: 'We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.',
         },
         {
            panel: 'Six',
            title: ' WordPress in Your Language ?',
            desc: 'As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.',
         },
         {
            panel: 'Seven',
            title: 'Integrating WordPress with Your Website ?',
            desc: 'How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.',
         },
      ]
   },
   {
      heading: 'Selling And Buying',
      data: [
         {
            panel: 'Nine',
            title: 'WordPress Site Maintenance ?',
            desc: 'We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.',
         },
         {
            panel: 'Ten',
            title: 'Meta Tags in WordPress ?',
            desc: 'Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.',
         },
         {
            panel: 'Eleven',
            title: 'Validating a Website ?',
            desc: 'Validating a website is the process of ensuring that the pages on the website conform to the norms or standards defined by various organizations.',
         },
         {
            panel: 'Twelve',
            title: 'Know Your Sources ?',
            desc: 'A book or set of books giving information on many subjects or on many aspects of one subject. Some are intended as an entry point into research for a general audience, some provide detailed information.',
         },
      ]
   },
   {
      heading: 'User Accounts',
      data: [
         {
            panel: 'Thirteen',
            title: 'Integrating WordPress with Your Website ?',
            desc: 'How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.',
         },
         {
            panel: 'Fourteen',
            title: 'WordPress Site Maintenance ?',
            desc: 'We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.',
         },
         {
            panel: 'Fifteen',
            title: 'WordPress in Your Language ?',
            desc: 'As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.',
         },
         {
            panel: 'Sixteen',
            title: 'Validating a Website ?',
            desc: 'Validating a website is the process of ensuring that the pages on the website conform to the norms or standards defined by various organizations.',
         },
         {
            panel: 'Saventeen',
            title: 'Meta Tags in WordPress ?',
            desc: 'Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.',
         },

      ]
   }
]