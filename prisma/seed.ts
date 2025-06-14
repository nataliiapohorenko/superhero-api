import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await prisma.image.deleteMany();
  await prisma.superhero.deleteMany();
  const heroes = [
    {
      nickname: 'Superman',
      real_name: 'Clark Kent',
      origin_description: 'Born Kal-El on Krypton, rocketed to Earth before its destruction...',
      superpowers: ['solar energy absorption and healing factor', 'solar flare and heat vision', 'solar invulnerability', 'flight'],
      catch_phrase: "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648351/0670889330033_guokjh.jpg' },
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648332/images_ey7vtj.jpg' }
      ]
    },
    {
      nickname: 'Batman',
      real_name: 'Bruce Wayne',
      origin_description: 'A wealthy philanthropist who fights crime in Gotham City.',
      superpowers: ['intelligence', 'martial arts', 'stealth'],
      catch_phrase: "I am vengeance. I am the night. I am Batman!",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648334/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_yprfil.jpg' },
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648333/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_apm8gn.jpg' }
      ]
    },
    {
      nickname: 'Wonder Woman',
      real_name: 'Diana Prince',
      origin_description: 'An Amazonian warrior princess from Themyscira.',
      superpowers: ['strength', 'combat skill', 'lasso of truth'],
      catch_phrase: "In a world of ordinary mortals, you are a wonder woman.",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648332/images_2_owontg.jpg' }
      ]
    },
    {
      nickname: 'Flash',
      real_name: 'Barry Allen',
      origin_description: 'Struck by lightning and doused in chemicals, became the fastest man alive.',
      superpowers: ['super speed', 'time travel', 'dimensional travel'],
      catch_phrase: "My name is Barry Allen, and I am the fastest man alive.",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648351/images_1_ccdcdh.jpg' }
      ]
    },
    {
      nickname: 'Aquaman',
      real_name: 'Arthur Curry',
      origin_description: 'Half-human, half-Atlantean ruler of Atlantis.',
      superpowers: ['underwater breathing', 'telepathy with sea creatures', 'super strength'],
      catch_phrase: "The sea calls to me.",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648332/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_2_gqt3xr.jpg' }
      ]
    },
    {
      nickname: 'Spider-Man',
      real_name: 'Peter Parker',
      origin_description: 'Bitten by a radioactive spider, gained superpowers.',
      superpowers: ['wall-crawling', 'spider sense', 'super agility'],
      catch_phrase: "With great power comes great responsibility.",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648333/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_3_ica6ww.jpg' }
      ]
    },
    {
      nickname: 'Iron Man',
      real_name: 'Tony Stark',
      origin_description: 'Billionaire engineer who built a powered suit of armor.',
      superpowers: ['powered armor', 'genius intellect', 'wealth'],
      catch_phrase: "I am Iron Man.",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648333/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_4_aw1ma4.jpg' }
      ]
    },
    {
      nickname: 'Captain America',
      real_name: 'Steve Rogers',
      origin_description: 'Super-soldier from WWII with enhanced strength and endurance.',
      superpowers: ['strength', 'shield combat', 'leadership'],
      catch_phrase: "I can do this all day.",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648333/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_5_xyppfm.jpg' }
      ]
    },
    {
      nickname: 'Black Panther',
      real_name: 'T’Challa',
      origin_description: 'King of Wakanda, enhanced by the heart-shaped herb.',
      superpowers: ['strength', 'vibranium suit', 'advanced technology'],
      catch_phrase: "Wakanda forever!",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648333/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_6_nbruut.jpg' },
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648334/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_7_vo3g1a.jpg'}
      ]
    },
    {
      nickname: 'Doctor Strange',
      real_name: 'Stephen Strange',
      origin_description: 'Former neurosurgeon turned Master of the Mystic Arts.',
      superpowers: ['magic', 'time manipulation', 'dimensional travel'],
      catch_phrase: "Dormammu, I’ve come to bargain.",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648332/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_9_lvmgzu.jpg' }
      ]
    },
    {
      nickname: 'Hulk',
      real_name: 'Bruce Banner',
      origin_description: 'Gamma radiation turned scientist into a green powerhouse.',
      superpowers: ['super strength', 'regeneration', 'rage power'],
      catch_phrase: "HULK SMASH!",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648333/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_12_r1szeq.jpg' }
      ]
    },
    {
      nickname: 'Thor',
      real_name: 'Thor Odinson',
      origin_description: 'Norse god of thunder, wielder of Mjolnir.',
      superpowers: ['lightning control', 'immortality', 'flight'],
      catch_phrase: "Bring me Thanos!",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648334/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_13_cl4pvz.jpg' }
      ]
    },
    {
      nickname: 'Deadpool',
      real_name: 'Wade Wilson',
      origin_description: 'Regenerating degenerate with a dark sense of humor.',
      superpowers: ['regeneration', 'combat skill', 'fourth wall awareness'],
      catch_phrase: "Maximum effort.",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648332/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_11_sgq6bp.jpg' },
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648332/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_10_h5rasr.jpg' }
      ]
    },
    {
      nickname: 'Green Lantern',
      real_name: 'Hal Jordan',
      origin_description: 'Chosen by the ring to protect Sector 2814.',
      superpowers: ['energy constructs', 'space travel', 'flight'],
      catch_phrase: "In brightest day, in blackest night...",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648334/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_14_m8xvwn.jpg' }
      ]
    },
    {
      nickname: 'Black Widow',
      real_name: 'Natasha Romanoff',
      origin_description: 'Trained assassin and former KGB spy.',
      superpowers: ['martial arts', 'espionage', 'weapon mastery'],
      catch_phrase: "At some point, we all have to choose.",
      images: [
        { url: 'https://res.cloudinary.com/djlkjudlo/image/upload/v1749648334/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_8_ep7gwn.jpg' }
      ]
    }
  ];

  for (const hero of heroes) {
    await prisma.superhero.create({
      data: {
        nickname: hero.nickname,
        real_name: hero.real_name,
        origin_description: hero.origin_description,
        superpowers: hero.superpowers,
        catch_phrase: hero.catch_phrase,
        images: {
          create: hero.images,
        },
      },
    });
  }

  console.log('Seeded 15 superheroes');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
