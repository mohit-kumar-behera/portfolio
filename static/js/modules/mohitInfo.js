const user = {
  firstName: 'Mohit',
  lastName: 'Kumar',

  aboutMe: 'Nothing ....',
  profileImg: '',

  dob: {
    date: '08',
    month: 'October',
    year: '2000',

    formatDOB() {
      return `${this.month.slice(0, 3)} ${this.date}, ${this.year}`;
    },
  },

  address: {
    home: {
      street: 'PLOT NO. - 1583, Udayabhat',
      city: 'Paradeep',
      district: 'Jagatsinghpur',
      PIN: '754142',
      state: 'Odisha',
      country: 'India',
      mapURL: 'https://goo.gl/maps/rfEktawiTEQePXsi6',
    },
    work: {
      street: 'PLOT NO. - 1583, Udayabhat',
      city: 'BBSR',
      district: 'Khorda',
      PIN: '754142',
      state: 'Odisha',
      country: 'India',
      mapURL: 'https://goo.gl/maps/rfEktawiTEQePXsi6',
    },
  },

  contact: {
    phone: ['98610 13399'],
    email: ['mahitkumar166@gmail.com'],
  },

  languageSpoken: ['English', 'Hindi', 'Odia'],

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  getAge() {
    return new Date().getFullYear() - +this.dob.year;
  },

  getAddress(type = 'home', short = true) {
    type = type.toLowerCase();
    return short
      ? {
          address: `${this.address[type].city}, ${this.address[type].state}`,
          url: `${this.address[type].mapURL}`,
        }
      : {
          address: `${this.address[type].street}, ${this.address[type].city}, ${this.address[type].district}, PIN-${this.address[type].PIN}, ${this.address[type].state}`,
          url: `${this.address[type].mapURL}`,
        };
  },

  getNationality(type = 'home') {
    return this.address[type.toLowerCase()].country;
  },

  getPIN() {
    return this.address.PIN;
  },

  getContact() {
    return [this.contact.phone[0], this.contact.email[0]];
  },

  getPhoneNum() {
    const [phone] = this.getContact();
    return {
      phone: `+91 ${phone}`,
      url: `tel:${phone}`,
    };
  },

  getEmail() {
    const [, email] = this.getContact();
    return {
      email,
      url: `mailto:${email}`,
    };
  },

  getLanguageSpoken() {
    return this.languageSpoken;
  },

  getShortBio() {
    const biodata = [
      {
        key: 'First Name',
        value: this.firstName,
      },
      {
        key: 'Last Name',
        value: this.lastName,
      },
      {
        key: 'DOB',
        value: this.dob.formatDOB(),
      },
      {
        key: 'Age',
        value: this.getAge(),
      },
      {
        key: 'Nationality',
        value: this.getNationality(),
      },
      {
        key: 'Address',
        value: this.getAddress(),
      },
      {
        key: 'Phone',
        value: this.getPhoneNum(),
      },
      {
        key: 'Email',
        value: this.getEmail(),
      },
      {
        key: 'Languages',
        value: this.getLanguageSpoken().join(', '),
      },
    ];

    return biodata;
  },

  socialAccounts: [
    {
      name: 'linkedin',
      logo: 'fa-linkedin',
      img: '/static/media/image/linkedin-high.jpg',
      url: 'https://www.linkedin.com/',
    },
    {
      name: 'whatsapp',
      logo: 'fa-whatsapp',
      img: '/static/media/image/whatsapp-high.jpg',
      url: 'https://wa.me/919861013399',
    },
    {
      name: 'github',
      logo: 'fa-github',
      img: '/static/media/image/github-high.jpg',
      url: 'https://www.github.com/',
    },
    {
      name: 'facebook',
      logo: 'fa-facebook-square',
      img: '/static/media/image/facebook-high.jpg',
      url: 'https://www.facebook.com/',
    },
    {
      name: 'twitter',
      logo: 'fa-twitter',
      img: '/static/media/image/twitter--low.jpg',
      url: 'https://www.twitter.com/',
    },
    {
      name: 'instagram',
      logo: 'fa-instagram',
      img: '/static/media/image/instagram-high.jpg',
      url: 'https://www.instagram.com/',
    },
  ],

  knowledge: {
    education: {
      phase: [
        {
          institute: {
            name: 'Bethany Convent School',
            tag: 'Elementary School',
            state: 'Odisha',
          },
          duration: {
            startYear: '2006',
            endYear: '2017',
          },
        },
        {
          institute: {
            name: 'Mothers Public School',
            tag: 'High School',
            state: 'Odisha',
          },
          duration: {
            startYear: '2017',
            endYear: '2019',
          },
        },
        {
          institute: {
            name: 'IIIT BBSR',
            tag: 'Graduation',
            state: 'Odisha',
          },
          duration: {
            startYear: '2019',
            endYear: '2023',
          },
        },
      ],

      getDuration(duration) {
        return duration && `${+duration.endYear - +duration.startYear}`;
      },

      formatDurationStr(duration) {
        return duration && `${duration.startYear} - ${duration.endYear}`;
      },

      getDetail(phase) {
        return (
          phase && {
            name: `${phase.institute.name}, ${phase.institute.state}`,
            tag: phase.institute.tag,
            durationStr: this.formatDurationStr(phase.duration),
            duration: this.getDuration(phase.duration),
          }
        );
      },

      // getDetail(phase) {
      // 	return new Promise((resolve, reject) => {
      // 		if (!phase)
      // 			reject('Error fetching data')
      // 		resolve({
      // 			name: `${phase.institute.name}, ${phase.institute.state}`,
      // 			tag: phase.institute.tag,
      // 			durationStr: this.formatDurationStr(phase.duration),
      // 			duration: this.getDuration(phase.duration),
      // 		})
      // 	})
      // }
    },

    skills: {
      phase: [
        {
          name: 'HTML',
          rate: '0.85',
        },
        {
          name: 'DJANGO',
          rate: '0.75',
        },
        {
          name: 'REACT JS',
          rate: '0.45',
        },
        {
          name: 'CSS',
          rate: '0.75',
        },
        {
          name: 'NODE JS',
          rate: '0.3',
        },
        {
          name: 'Python',
          rate: '0.8',
        },
        {
          name: 'BOOTSTRAP',
          rate: '0.9',
        },
        {
          name: 'PHP',
          rate: '0.4',
        },
        {
          name: 'C',
          rate: '0.6',
        },
        {
          name: 'EXPRESS JS',
          rate: '0.3',
        },
        {
          name: 'SQL',
          rate: '0.7',
        },
        {
          name: 'MONGO DB',
          rate: '0.4',
        },
        {
          name: 'SELENIUM WEBDRIVER',
          rate: '0.5',
        },
        {
          name: 'C++',
          rate: '0.7',
        },
      ],

      getDetail(phase) {
        return (
          phase && {
            name: phase.name,
            rate: +phase.rate,
          }
        );
      },
    },

    experience: {
      phase: [
        {
          company: {
            name: 'Verzeo',
            logo: '/static/media/image/verzeo-logo.png',
            url: 'https://www.verzeo.com/',
          },
          duration: {
            startYear: '2020',
            endYear: '2020',
            months: '2',
          },
          position: 'Web Developer',
        },
        {
          company: {
            name: 'Alineter',
            logo: '/static/media/image/alineter-logo.jpg',
            url: 'https://www.alineter.com/',
          },
          duration: {
            startYear: '2021',
            endYear: '2021',
            months: '6',
          },
          position: 'Web Developer',
        },
      ],

      formatDurationStr(duration) {
        const durationStr =
          duration.startYear === duration.endYear
            ? duration.startYear
            : `${duration.startYear} - ${duration.endYear}`;
        return duration && `${duration.months} months (${durationStr})`;
      },

      getDetail(phase) {
        return (
          phase && {
            name: phase.company.name,
            logo: phase.company.logo,
            url: phase.company.url,
            position: phase.position,
            duration: +phase.duration.months,
            durationStr: this.formatDurationStr(phase.duration),
          }
        );
      },
    },

    awards: {
      phase: [
        {
          name: 'Django',
          imgPath: '/static/media/image/django.png',
        },
        {
          name: 'IACE Hackathon',
          imgPath: '/static/media/image/iace-hackathon.png',
        },
        {
          name: 'MERN Stack',
          imgPath: '/static/media/image/webdev-mern.png',
        },
        {
          name: 'Digital Marketing',
          imgPath: '/static/media/image/digital-marketing.png',
        },
        {
          name: 'Verzeo Internship',
          imgPath: '/static/media/image/webdev-internship-verzeo.jpg',
        },
        {
          name: 'Web Scraping',
          imgPath: '/static/media/image/web-scraping.jpg',
        },
        {
          name: 'Blockchain',
          imgPath: '/static/media/image/blockchain.png',
        },
      ],

      getDetail(phase) {
        return (
          phase && {
            name: phase.name,
            imgPath: phase.imgPath,
          }
        );
      },
    },
  },
};

export default user;
