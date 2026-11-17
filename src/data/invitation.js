import backgroundMusic from '../assets/audio/ranjha.m4a?url'

// Transcribed from the supplied Nikkah card. Times are in India Standard Time.
export const invitation = {
  bride: {
    name: 'Amina', introName: 'Amina', profileName: 'Amina', nameSuffix: 'S', family: '',
    parents: { father: 'A.K. Sayeed', mother: 'Sajitha C' },
    address: 'Panayara House, Kilikollur P.O., Kollam',
  },
  groom: {
    name: 'Sakeer Hussain', introName: 'Sakeer', profileName: 'Sakeer Hussain', nameSuffix: 'S', family: '',
    parents: { father: 'the late Shahul Hameed M', mother: 'Saboora Beevi E' },
    address: 'Shabna Manzil, Kallumthazham P.O., Kilikollur, Kollam',
  },
  initials: ['A', 'S'],
  dateLabel: '24 December 2026',
  dayLabel: 'Thursday',
  hijriDateLabel: '15 Rajab 1448 AH',
  dateTime: '2026-12-24T12:00:00+05:30',
  endDateTime: '2026-12-24T12:30:00+05:30',
  invitationMessage: 'By the grace of Almighty Allah, you are warmly invited to witness the Nikkah of Amina S and Sakeer Hussain S.',
  hostsMessage: 'A.K. Sayeed and Sajitha C warmly invite you to the Nikkah of their daughter, Amina S, with Sakeer Hussain S.',
  events: [
    {
      title: 'Nikkah',
      description: 'The beginning of our forever.',
      date: '24 December 2026',
      dateTime: '2026-12-24T12:00:00+05:30',
      endDateTime: '2026-12-24T12:30:00+05:30',
      time: '12:00–12:30 PM IST',
    },
  ],
  venue: {
    name: 'Sana Auditorium',
    address: 'Moonamkutty, Kollam, Kerala',
    mapsUrl: 'https://www.google.com/maps/place/Sana+Auditorium/@8.9064143,76.6182784,17z/data=!4m17!1m10!1m2!29m1!3s40f78d2f-ff7b-46f8-88c0-c7e7a6ac0f6a!3m6!1s0x3b05fd2480c4a8d3:0xdf1df2777f303a26!2sSana+Auditorium!8m2!3d8.9064143!4d76.6231707!16s%2Fg%2F1tkqypwf!3m5!1s0x3b05fd2480c4a8d3:0xdf1df2777f303a26!8m2!3d8.9064143!4d76.6231707!16s%2Fg%2F1tkqypwf?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D',
  },
  contact: { label: 'Contact the family · 8848339090', phone: '+918848339090' },
  sharingJoy: ['Shabna', 'Sanooj', 'Naira'],
  // Full-length optimized recording; fetched only after a sound-enabled tap.
  audioSrc: backgroundMusic,
  // Optional local photograph under public/images/.
  photoSrc: '',
  photoAlt: 'Amina S and Sakeer Hussain S',
  closing: 'May Allah bless their marriage with love, mercy and peace. Ameen.',
}
