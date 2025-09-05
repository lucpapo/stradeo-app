export interface Filter{
    id : number;
    title : string;
    isCollapsed : boolean;
    check_box : checkBoxData[];
    button : string;
}

export interface checkBoxData{
    checkTitle : string;
    subTitle? : string;
}

export const filterData : Filter[]  = [
    {
       id: 1,
       title: 'Location',
       isCollapsed: false,
       check_box: [
          {
             checkTitle: 'New York',
             subTitle: 'NY (399)'
          },
          {
            checkTitle: 'San Francisco',
            subTitle: 'CA (252)'
         },
          {
             checkTitle: 'Washington',
             subTitle: 'DC (226)'
          },
          {
             checkTitle: 'Seattle',
             subTitle: 'WA (242)'
          },
          {
             checkTitle: 'Chicago',
             subTitle: 'IL (187)'
          }
       ],
       button: 'All Locations'
    },
    {
       id: 2,
       title: 'Job Title',
       isCollapsed: false,
       check_box: [
          {
             checkTitle: 'UI/Ux designer(25)',
          },
          {
             checkTitle: 'Graphic designer(10)',
          },
          {
             checkTitle: 'Front end designer(15)',
          },
          {
             checkTitle: 'PHP developer(42)',
          },
          {
             checkTitle: 'React Developer(5)',
          }
          
       ],
       button: 'All Job Title'
    },
    {
       id: 3,
       title: 'Industry',
       isCollapsed: false,
       check_box: [
          {
             checkTitle: 'Computer Software(14)',
          },
          {
             checkTitle: ' IT Engineer(10)',
          },
          {
             checkTitle: 'Service industry(20)',
          },
          {
             checkTitle: 'Accounting(34)',
          },
          {
             checkTitle: ' Financial Services(5)',
          }
          
       ],
       button: 'All Industry'
    },
    {
       id: 4,
       title: 'Specific skills',
       isCollapsed: false,
       check_box: [
          {
             checkTitle: 'HTML,scss & sass',
          },
          {
             checkTitle: 'Javascript',
          },
          {
             checkTitle: ' Node.js',
          },
          {
             checkTitle: 'Gulp & Pug',
          },
          {
             checkTitle: 'Angular.js',
          }
          
       ],
       button: 'All Skills'
    }
]

export const filterCheckBox = [
   {
      id: "chk-ani",
      label: "Full-time",
      vacancy : 8688
   },
   {
      id: "chk-ani1",
      label: "Contract",
      vacancy : 503
   },
   {
      id: "chk-ani2",
      label: "Part-time",
      vacancy : 288
   },
   {
      id: "chk-ani3",
      label: "Internship",
      vacancy : 236
   },
   {
      id: "chk-ani4",
      label: "Temporary",
      vacancy : 146
   },
   {
      id: "chk-ani5",
      label: "Commission",
      vacancy : 25
   }
]

export const jobCardsData = [
   {
      id : 1,
      rating : 5,
      image : 'assets/images/job-search/1.png',
      title : 'UI/UX IT Frontend Developer',
      subTitle : '(L6) Salt Lake City, UT',
      desc : 'We are looking for an experienced and Kabul designer and/or frontend engineer with expertise in accessibility to join our team , 3+ years of experience working in as a Frontend Engineer or comparable role. You won’t be a team of one though — you’ll be collaborating closely with other...',
      tag : true,
      tagTitle : 'New',
      tagColor : 'primary',
      ribbon : false,
      time : false,
      timeText : '',
   },
   {
      id : 2,
      rating : 4,
      image : 'assets/images/job-search/2.jpg',
      title : 'React/React Native Developer',
      subTitle : 'San Diego, CA',
      desc : 'Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial , Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive, mobile user interface',
      tag : true,
      tagTitle : 'New',
      tagColor : 'primary',
      ribbon : false,
      time : false,
      timeText : '',
   },
   {
      id : 3,
      rating : 3,
      image : 'assets/images/job-search/3.jpg',
      title : 'Senior UX designer',
      subTitle : 'Minneapolis, MN',
      desc : 'The designer will apply Lean UX and Design Thinking practices in a highly collaborative, fast-paced, distributed environment You have 4+ years of UX experience. You support UX leadership by providing continuous feedback regarding the evolution of team process standards',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : true,
      time : true,
      timeText : '2 days ago',
   },
   {
      id : 4,
      rating : 4,
      image : 'assets/images/job-search/4.jpg',
      title : 'Front end web developer',
      subTitle : 'Cisco Lelystad, Netherlands',
      desc : 'Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become.',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : false,
      time : true,
      timeText : '3 days ago',
   },
   {
      id : 5,
      rating : 3,
      image : 'assets/images/job-search/5.png',
      title : 'Graphic designer',
      subTitle : 'Infosys Lelystad, Netherlands',
      desc : 'Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of. No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : false,
      time : true,
      timeText : '3 days ago',
   },
   {
      id : 6,
      rating : 3,
      image : 'assets/images/job-search/6.jpg',
      title : 'Designer, CRM',
      subTitle : 'Citrix Lelystad, Netherlands',
      desc : 'Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing. Is so moments on chamber pressed to. Doubtful yet way properly answered.',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : false,
      time : true,
      timeText : '3 days ago',
   },
   {
      id : 7,
      rating : 4,
      image : 'assets/images/job-search/2.jpg',
      title : 'React/React Native Developer',
      subTitle : 'San Diego, CA',
      desc : 'Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial , Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : true,
      time : true,
      timeText : '5 days ago',
   },
   {
      id : 8,
      rating : 3,
      image : 'assets/images/job-search/3.jpg',
      title : 'Senior UX designer',
      subTitle : 'Minneapolis, MN',
      desc : 'The designer will apply Lean UX and Design Thinking practices in a highly collaborative, fast-paced, distributed environment You have 4+ years of UX experience. You support UX leadership by providing continuous feedback regarding the evolution of team process standards',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : false,
      time : true,
      timeText : '5 days ago',
   },
   {
      id : 9,
      rating : 3,
      image : 'assets/images/job-search/5.png',
      title : 'Graphic designer',
      subTitle : 'Infosys Lelystad, Netherlands',
      desc : 'Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of. No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : false,
      time : true,
      timeText : '3 days ago',
   },
   {
      id : 10,
      rating : 3,
      image : 'assets/images/job-search/6.jpg',
      title : 'Designer, CRM',
      subTitle : 'Citrix Lelystad, Netherlands',
      desc : 'Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing. Is so moments on chamber pressed to. Doubtful yet way properly answered.',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : false,
      time : true,
      timeText : '3 days ago',
   },
   {
      id : 11,
      rating : 5,
      image : 'assets/images/job-search/1.png',
      title : 'UI/UX IT Frontend Developer',
      subTitle : '(L6) Salt Lake City, UT',
      desc : 'We are looking for an experienced and Kabul designer and/or frontend engineer with expertise in accessibility to join our team , 3+ years of experience working in as a Frontend Engineer or comparable role. You won’t be a team of one though — you’ll be collaborating closely with other...',
      tag : true,
      tagTitle : 'New',
      tagColor : 'primary',
      ribbon : false,
      time : false,
      timeText : '',
   },
   {
      id : 12,
      rating : 4,
      image : 'assets/images/job-search/2.jpg',
      title : 'React/React Native Developer',
      subTitle : 'San Diego, CA',
      desc : 'Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial , Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive, mobile user interface',
      tag : true,
      tagTitle : 'New',
      tagColor : 'primary',
      ribbon : false,
      time : false,
      timeText : '',
   },
   {
      id : 13,
      rating : 4,
      image : 'assets/images/job-search/4.jpg',
      title : 'Front end web developer',
      subTitle : 'Cisco Lelystad, Netherlands',
      desc : 'Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become.',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : false,
      time : true,
      timeText : '3 days ago',
   },
   {
      id : 14,
      rating : 3,
      image : 'assets/images/job-search/3.jpg',
      title : 'Senior UX designer',
      subTitle : 'Minneapolis, MN',
      desc : 'The designer will apply Lean UX and Design Thinking practices in a highly collaborative, fast-paced, distributed environment You have 4+ years of UX experience. You support UX leadership by providing continuous feedback regarding the evolution of team process standards',
      tag : false,
      tagTitle : '',
      tagColor : '',
      ribbon : true,
      time : true,
      timeText : '2 days ago',
   },
]
   
export const jobDetail = [
   {
      title : 'Job Description',
      description :  "Endless is looking for a UI/UX Designer to join our team. The world is seeing an explosion in the amount and variety of location-baWe are looking for a versatile UX/UI Designer to join our growing design team. Our designers contribute to clients’ projects at all stages of development. We might start from scratch, conducting user and stakeholder interviews, making personas and journey maps, and continue on to iterating on designs and prototypes through delivering final assets for launch. We might come into the middle of an in-flight program-size project and conduct analysis and usability correction or feature enhancement. We might provide research and vision for handoff to an internal development team."
   },
   {
      title : 'Qualifications',
      data : [
         { description: "Have shipped multiple iOS, Android, and/or web products" },
         { description: "5+ years UI/UX experience" },
         { description: "Portfolio demonstrating mastery of native iOS, Android, and/or responsive web design principles" },
         { description: "Ability to autonomously pursue elegant solutions to open-ended problems" },
         { description: "Comfort with ambiguity" },
         { description: "Proven ability to create interactive prototypes" },
         { description: "Strong verbal communication skills with ability to clearly communicate complex ideas and champion a design vision across all levels of an organization" },
         { description: "Strong written communication skills with ability to make transparent design documentation and client-facing presentations" },
         { description: "Ability to create and maintain flow charts, wire frames, prototypes, and mockups." },
         { description: "Ability to effectively work on more than one project at a time" },
         { description: "Experience conducting user research and stakeholder interviews" },
         { description: "Solid grasp of standard design tools, ex: Sketch, Omnigraffle, the Adobe Suite, Zeplin, etc." },
         { description: "Bonus Considerations" },
      ]   
   },
   {
      title : 'Agency experience',
      data : [
         { description: "Experience working with Agile development teams" },
         { description: "Experience with RITE method usability testing" },
         { description: "Experience in visual and motion design; ability to translate UX design into high quality visuals" },
         { description: "Mastery of Sketch & InVision" },
         { description: "Knowledge of mobile or front-end web programming" },
      ]
   }, 
   {
      title : 'Perks',
      data : [
         { description: "Competitive pay" },
         { description: "Competitive medical, dental, and vision insurance plans" },
         { description: "Company-provided 401(k) plan" },
         { description: "Paid vacation and sick time" },
         { description: "Free snacks and beverages" },
      ]
   }
]