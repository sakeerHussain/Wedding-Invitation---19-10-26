// Wedding details supplied by the couple. Times are in India Standard Time.
// Family names, contact information, music and photographs can be added later.
export const invitation = {
  bride: { name: 'Amina', introName: 'Amina', family: '' },
  groom: { name: 'Sakeer Hussain', introName: 'Sakeer', family: '' },
  initials: ['A', 'S'],
  dateLabel: '24 December 2026',
  dateTime: '2026-12-24T12:00:00+05:30',
  endDateTime: null,
  events: [
    {
      title: 'Reception',
      description: 'An afternoon of joy, together with you.',
      date: '23 December 2026',
      dateTime: '2026-12-23T15:30:00+05:30',
      endDateTime: null,
      time: '3:30 PM onwards',
    },
    {
      title: 'Nikah',
      description: 'The beginning of our forever.',
      date: '24 December 2026',
      dateTime: '2026-12-24T12:00:00+05:30',
      endDateTime: null,
      time: '12:00 PM',
    },
  ],
  venue: {
    name: 'Sana Auditorium',
    address: 'Kallumthazham, Kollam, Kerala',
    mapsUrl: 'https://www.google.com/maps/place/Sana+Auditorium/@8.9064143,76.6182784,17z/data=!4m17!1m10!1m2!29m1!3s40f78d2f-ff7b-46f8-88c0-c7e7a6ac0f6a!3m6!1s0x3b05fd2480c4a8d3:0xdf1df2777f303a26!2sSana+Auditorium!8m2!3d8.9064143!4d76.6231707!16s%2Fg%2F1tkqypwf!3m5!1s0x3b05fd2480c4a8d3:0xdf1df2777f303a26!8m2!3d8.9064143!4d76.6231707!16s%2Fg%2F1tkqypwf?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D',
  },
  contact: { label: 'Contact the family', phone: '' },
  // Optional local file under public/audio/. Original ambient notes play when empty.
  audioSrc: '',
  // Optional local photograph under public/images/.
  photoSrc: '',
  photoAlt: 'Amina and Sakeer Hussain',
  closing: 'Your presence will make our beginning even more beautiful.',
}
