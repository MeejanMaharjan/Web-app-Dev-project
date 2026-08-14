

const SAMPLE_MOVIES = [
  {
    title: "Harakiri",
    genre: "Drama, Thriller",
    year: 1962,
    rating: 8.6,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/f/fd/Harakiri_Poster.jpg",
    synopsis: "A ronin arrives at a feudal lord's palace requesting an honorable place to commit ritual suicide, but his true purpose is far more complex and confrontational.",
    cast: [
      { name: "Tatsuya Nakadai", role: "Hanshiro Tsugumo" },
      { name: "Akira Ishihama", role: "Motome Chijiiwa" }
    ]
  },
  {
    title: "12 Angry Men",
    genre: "Drama",
    year: 1957,
    rating: 9.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/12_Angry_Men_%281957_film_poster%29.jpg",
    synopsis: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
    cast: [
      { name: "Henry Fonda", role: "Juror 8" },
      { name: "Lee J. Cobb", role: "Juror 3" }
    ]
  },
  {
    title: "Come and See",
    genre: "War, Drama",
    year: 1985,
    rating: 8.2,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/0/08/Come_and_See_%28poster%29.jpg",
    synopsis: "A young boy joins the Soviet resistance against the invading German forces and experiences the atrocities of World War II in Belarus.",
    cast: [
      { name: "Aleksei Kravchenko", role: "Flyora" },
      { name: "Olga Mironova", role: "Glasha" }
    ]
  },
  {
    title: "The Human Condition III: A Soldier's Prayer",
    genre: "War, Drama",
    year: 1961,
    rating: 9.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/3/38/A_Soldier%27s_Prayer_%28poster%29.jpg",
    synopsis: "The concluding chapter follows Kaji as a Japanese soldier during the final chaotic days of World War II and his desperate journey home through Manchuria.",
    cast: [
      { name: "Tatsuya Nakadai", role: "Kaji" },
      { name: "Michiyo Aratama", role: "Michiko" }
    ]
  },
  {
    title: "Seven Samurai",
    genre: "Action, Drama, Adventure",
    year: 1954,
    rating: 8.6,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/c/c8/Seven_Samurai_Poster.png",
    synopsis: "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
    cast: [
      { name: "Toshiro Mifune", role: "Kikuchiyo" },
      { name: "Takashi Shimura", role: "Kambei Shimada" }
    ]
  },
  {
    title: "High and Low",
    genre: "Crime, Drama, Thriller",
    year: 1963,
    rating: 8.4,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/6/6a/HIGH_AND_LOW_JP_.jpg",
    synopsis: "An executive's family is thrown into turmoil when a kidnapper mistakenly abducts his chauffeur's son and demands a ransom anyway.",
    cast: [
      { name: "Toshiro Mifune", role: "Kingo Gondo" },
      { name: "Tatsuya Nakadai", role: "Detective Tokura" }
    ]
  },
  {
    title: "The Godfather Part II",
    genre: "Crime, Drama",
    year: 1974,
    rating: 9.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg",
    synopsis: "The early life of Vito Corleone in 1920s New York is portrayed, while his son Michael expands and tightens his grip on the family crime syndicate.",
    cast: [
      { name: "Al Pacino", role: "Michael Corleone" },
      { name: "Robert De Niro", role: "Vito Corleone" }
    ]
  },
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    rating: 9.3,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    synopsis: "A prominent banker unjustly convicted of murder is sentenced to life imprisonment at the Shawshank prison. He finds unique ways to deal with his new, harsh life, befriending a fellow inmate named Red over the course of several decades.",
    cast: [
      { name: "Tim Robbins", role: "Andy Dufresne" },
      { name: "Morgan Freeman", role: "Ellis Boyd 'Red' Redding" }
    ]
  },
  {
    title: "City of God",
    genre: "Crime, Drama",
    year: 2002,
    rating: 8.6,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/1/10/CidadedeDeus.jpg",
    synopsis: "In the slums of Rio de Janeiro, two boys growing up amid drugs and violence take different paths: one becomes a photographer, the other a feared drug lord.",
    cast: [
      { name: "Alexandre Rodrigues", role: "Rocket" },
      { name: "Leandro Firmino", role: "Lil Ze" }
    ]
  },
  {
    title: "The Human Condition I: No Greater Love",
    genre: "War, Drama",
    year: 1959,
    rating: 8.8,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/8/8a/No_Greater_Love_%28poster%29.jpg",
    synopsis: "A pacifist Japanese man is sent to work as a labor supervisor in occupied Manchuria, where his ideals are tested by the brutality of the war around him.",
    cast: [
      { name: "Tatsuya Nakadai", role: "Kaji" },
      { name: "Michiyo Aratama", role: "Michiko" }
    ]
  },
  {
    title: "Yi Yi",
    genre: "Drama",
    year: 2000,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/5/5c/Yiyiposter.jpg",
    synopsis: "The struggles of an engineer and three generations of his middle-class Taiwanese family unfold in Taipei over the course of a year.",
    cast: [
      { name: "Nien-Jen Wu", role: "NJ" },
      { name: "Elaine Jin", role: "Min-Min" }
    ]
  },
  {
    title: "Parasite",
    genre: "Comedy, Thriller, Drama",
    year: 2019,
    rating: 8.5,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
    synopsis: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    cast: [
      { name: "Song Kang-ho", role: "Kim Ki-taek" },
      { name: "Lee Sun-kyun", role: "Park Dong-ik" }
    ]
  },
  {
    title: "Schindler's List",
    genre: "History, Drama, War",
    year: 1993,
    rating: 9.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg",
    synopsis: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    cast: [
      { name: "Liam Neeson", role: "Oskar Schindler" },
      { name: "Ralph Fiennes", role: "Amon Goeth" }
    ]
  },
  {
    title: "The Godfather",
    genre: "Crime, Drama",
    year: 1972,
    rating: 9.2,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    synopsis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    cast: [
      { name: "Marlon Brando", role: "Vito Corleone" },
      { name: "Al Pacino", role: "Michael Corleone" }
    ]
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    genre: "Fantasy, Adventure, Drama",
    year: 2003,
    rating: 9.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/4/48/Lord_Rings_Return_King.jpg",
    synopsis: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    cast: [
      { name: "Elijah Wood", role: "Frodo Baggins" },
      { name: "Viggo Mortensen", role: "Aragorn" }
    ]
  },
  {
    title: "Ikiru",
    genre: "Drama",
    year: 1952,
    rating: 8.3,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Ikiru_poster.jpg",
    synopsis: "A terminally ill Tokyo bureaucrat, driven by cancer and a sense of purposeless routine, sets out to find a meaning to his life before he dies.",
    cast: [
      { name: "Takashi Shimura", role: "Kanji Watanabe" }
    ]
  },
  {
    title: "Ran",
    genre: "Action, Drama, War",
    year: 1985,
    rating: 8.2,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/f/f2/Kuroran.jpg",
    synopsis: "In feudal Japan, an aging warlord retires, handing over his empire to his three sons, unaware of the chaos and betrayal his decision will unleash.",
    cast: [
      { name: "Tatsuya Nakadai", role: "Hidetora Ichimonji" }
    ]
  },
  {
    title: "La Haine",
    genre: "Crime, Drama",
    year: 1995,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/0/01/La_Haine_%281995_movie_poster%29.jpg",
    synopsis: "Three friends from the Paris projects spend twenty-four hours dealing with the aftermath of a riot sparked by police brutality against a friend.",
    cast: [
      { name: "Vincent Cassel", role: "Vinz" },
      { name: "Hubert Kounde", role: "Hubert" }
    ]
  },
  {
    title: "The Good, the Bad and the Ugly",
    genre: "Western, Adventure",
    year: 1966,
    rating: 8.8,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/4/45/Good_the_bad_and_the_ugly_poster.jpg",
    synopsis: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery, all during the Civil War.",
    cast: [
      { name: "Clint Eastwood", role: "Blondie" },
      { name: "Lee Van Cleef", role: "Angel Eyes" }
    ]
  },
  {
    title: "A Brighter Summer Day",
    genre: "Crime, Drama",
    year: 1991,
    rating: 8.5,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/1/1b/A_Brighter_Summer_Day_%28movie_poster%29.jpg",
    synopsis: "In 1960s Taiwan, a young boy gets involved with a street gang as tensions between his traditional family and a rapidly changing society intensify.",
    cast: [
      { name: "Chang Chen", role: "Xiao Si'r" }
    ]
  },
  {
    title: "Le Trou",
    genre: "Crime, Drama",
    year: 1960,
    rating: 8.3,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/0/06/Le_trou_becker_poster3.jpg",
    synopsis: "Four inmates sharing a Paris prison cell plan a meticulous escape through a hole in the floor, and must decide whether to trust a new cellmate with their secret.",
    cast: [
      { name: "Philippe Leroy", role: "Claude Gaspard" }
    ]
  },
  {
    title: "Cinema Paradiso",
    genre: "Drama, Romance",
    year: 1988,
    rating: 8.5,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/8/86/CinemaParadiso.jpg",
    synopsis: "A filmmaker recalls his childhood, when he fell in love with the movies at his village's theater and formed a deep friendship with its projectionist.",
    cast: [
      { name: "Salvatore Cascio", role: "Young Salvatore" },
      { name: "Philippe Noiret", role: "Alfredo" }
    ]
  },
  {
    title: "The Dark Knight",
    genre: "Action, Crime, Drama",
    year: 2008,
    rating: 9.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
    synopsis: "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests to fight injustice.",
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne" },
      { name: "Heath Ledger", role: "Joker" }
    ]
  },
  {
    title: "Autumn Sonata",
    genre: "Drama",
    year: 1978,
    rating: 8.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/3/34/Autumnsonataposter.jpg",
    synopsis: "A celebrated pianist visits her estranged daughter, and the reunion forces both women to confront years of buried resentment.",
    cast: [
      { name: "Ingrid Bergman", role: "Charlotte" },
      { name: "Liv Ullmann", role: "Eva" }
    ]
  },
  {
    title: "Grave of the Fireflies",
    genre: "Animation, War, Drama",
    year: 1988,
    rating: 8.5,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grave_of_the_Fireflies_Japanese_poster.jpg",
    synopsis: "A teenage boy and his little sister struggle to survive in Japan during the final months of World War II.",
    cast: [
      { name: "Tsutomu Tatsumi", role: "Seita" },
      { name: "Ayano Shiraishi", role: "Setsuko" }
    ]
  },
  {
    title: "Neon Genesis Evangelion: The End of Evangelion",
    genre: "Animation, Sci-Fi",
    year: 1997,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/9/9e/Eoeposter.JPG",
    synopsis: "As an apocalyptic invasion threatens humanity, Shinji Ikari must confront his own psyche in this conclusion to the Evangelion television series.",
    cast: [
      { name: "Megumi Ogata", role: "Shinji Ikari" }
    ]
  },
  {
    title: "Goodfellas",
    genre: "Crime, Drama, Biography",
    year: 1990,
    rating: 8.7,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg",
    synopsis: "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his mob partners.",
    cast: [
      { name: "Ray Liotta", role: "Henry Hill" },
      { name: "Robert De Niro", role: "Jimmy Conway" }
    ]
  },
  {
    title: "Woman in the Dunes",
    genre: "Drama",
    year: 1964,
    rating: 8.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/1/11/Woman_in_the_Dunes_poster.jpg",
    synopsis: "An entomologist is tricked into becoming trapped in a sand pit, forced to live with and help a widow endlessly dig sand for a nearby village.",
    cast: [
      { name: "Eiji Okada", role: "Niki Junpei" },
      { name: "Kyoko Kishida", role: "The Woman" }
    ]
  },
  {
    title: "There Will Be Blood",
    genre: "Drama",
    year: 2007,
    rating: 8.2,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/d/da/There_Will_Be_Blood_Poster.jpg",
    synopsis: "A ruthless silver miner turned oilman goes on a relentless quest for wealth in California, clashing with a young preacher along the way.",
    cast: [
      { name: "Daniel Day-Lewis", role: "Daniel Plainview" }
    ]
  },
  {
    title: "The Human Condition II: Road to Eternity",
    genre: "War, Drama",
    year: 1959,
    rating: 8.7,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/6/65/Road_to_Eternity_%28poster%29.jpg",
    synopsis: "Conscripted into the Japanese army, Kaji endures brutal military training and combat as he tries to hold onto his humanist ideals.",
    cast: [
      { name: "Tatsuya Nakadai", role: "Kaji" }
    ]
  },
  {
    title: "Paths of Glory",
    genre: "War, Drama",
    year: 1957,
    rating: 8.4,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Paths_of_Glory_%281957_poster%29.jpg",
    synopsis: "After a failed attack on a German-held position during World War I, a colonel defends three soldiers who are randomly chosen to be scapegoated for the failure.",
    cast: [
      { name: "Kirk Douglas", role: "Colonel Dax" }
    ]
  },
  {
    title: "Spirited Away",
    genre: "Animation, Fantasy, Adventure",
    year: 2001,
    rating: 8.6,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png",
    synopsis: "A young girl wanders into a world ruled by gods and witches, where humans are changed into beasts, and must find a way to free herself and her parents.",
    cast: [
      { name: "Rumi Hiiragi", role: "Chihiro" }
    ]
  },
  {
    title: "Andrei Rublev",
    genre: "Drama, History, Biography",
    year: 1966,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/ae/Andrei_Rublev_Russian_poster.jpg",
    synopsis: "The life, times, and afflictions of the great medieval Russian icon painter Andrei Rublev are chronicled across a turbulent era of history.",
    cast: [
      { name: "Anatoliy Solonitsyn", role: "Andrei Rublev" }
    ]
  },
  {
    title: "The Cranes Are Flying",
    genre: "War, Drama, Romance",
    year: 1957,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/4/4d/Letyat_Zhuravli.jpg",
    synopsis: "A young woman's fiance goes off to fight in World War II, leaving her to face immense hardship and loss on the home front.",
    cast: [
      { name: "Tatiana Samoilova", role: "Veronika" }
    ]
  },
  {
    title: "The Apartment",
    genre: "Comedy, Drama, Romance",
    year: 1960,
    rating: 8.3,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/8/8b/The_Apartment_%281960_poster%29.jpg",
    synopsis: "An insurance clerk lends his apartment to executives for their extramarital affairs, hoping to climb the corporate ladder, but complications arise when he falls for one of their mistresses.",
    cast: [
      { name: "Jack Lemmon", role: "C.C. Baxter" },
      { name: "Shirley MacLaine", role: "Fran Kubelik" }
    ]
  },
  {
    title: "Apocalypse Now",
    genre: "War, Drama",
    year: 1979,
    rating: 8.4,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/c/c2/Apocalypse_Now_poster.jpg",
    synopsis: "A U.S. Army officer is sent on a dangerous mission into Cambodia to assassinate a renegade colonel who has set himself up as a god among a local tribe.",
    cast: [
      { name: "Martin Sheen", role: "Captain Willard" },
      { name: "Marlon Brando", role: "Colonel Kurtz" }
    ]
  },
  {
    title: "Tokyo Story",
    genre: "Drama",
    year: 1953,
    rating: 8.2,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/8/86/Tokyo_monogatari_poster.jpg",
    synopsis: "An aging couple travels to Tokyo to visit their grown children, only to find that the children are too busy with their own lives to spend much time with them.",
    cast: [
      { name: "Chishu Ryu", role: "Shukichi Hirayama" }
    ]
  },
  {
    title: "Sunset Boulevard",
    genre: "Drama, Film-Noir",
    year: 1950,
    rating: 8.4,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/1/14/Sunset_Boulevard_%281950_poster%29.jpg",
    synopsis: "A struggling screenwriter is hired to work on a faded silent film star's ill-fated comeback script, and finds himself drawn into her delusional world.",
    cast: [
      { name: "William Holden", role: "Joe Gillis" },
      { name: "Gloria Swanson", role: "Norma Desmond" }
    ]
  },
  {
    title: "Incendies",
    genre: "Mystery, Drama, War",
    year: 2010,
    rating: 8.2,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/a0/Incendies.jpg",
    synopsis: "Twins journey to the Middle East to uncover their mother's harrowing past after her death reveals secrets about their family's origins.",
    cast: [
      { name: "Lubna Azabal", role: "Nawal Marwan" }
    ]
  },
  {
    title: "The Passion of Joan of Arc",
    genre: "Drama, History, Biography",
    year: 1928,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/d/d8/The_Passion_of_Joan_of_Arc_%281928%29_English_Poster.png",
    synopsis: "A dramatization of the trial of Joan of Arc, focused on her deep faith and suffering as she is questioned and condemned by an ecclesiastical court.",
    cast: [
      { name: "Renee Jeanne Falconetti", role: "Joan of Arc" }
    ]
  },
  {
    title: "Interstellar",
    genre: "Sci-Fi, Drama, Adventure",
    year: 2014,
    rating: 8.7,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth becomes uninhabitable.",
    cast: [
      { name: "Matthew McConaughey", role: "Cooper" },
      { name: "Anne Hathaway", role: "Brand" }
    ]
  },
  {
    title: "Whiplash",
    genre: "Drama, Music",
    year: 2014,
    rating: 8.5,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
    synopsis: "An ambitious young jazz drummer is pushed to his limits by a ruthless music conservatory instructor determined to unlock his potential.",
    cast: [
      { name: "Miles Teller", role: "Andrew Neiman" },
      { name: "J.K. Simmons", role: "Terence Fletcher" }
    ]
  },
  {
    title: "Portrait of a Lady on Fire",
    genre: "Drama, Romance",
    year: 2019,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/c/cb/Portrait_of_a_Lady_on_Fire.jpg",
    synopsis: "On an isolated island in 18th century France, a painter is commissioned to secretly paint a wedding portrait of a young woman resistant to marriage.",
    cast: [
      { name: "Noemie Merlant", role: "Marianne" },
      { name: "Adele Haenel", role: "Heloise" }
    ]
  },
  {
    title: "The Battle of Algiers",
    genre: "War, Drama, History",
    year: 1966,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/aa/The_Battle_of_Algiers_poster.jpg",
    synopsis: "A chronicle of the urban guerrilla warfare between Algerian rebels and French colonial forces during the fight for Algerian independence.",
    cast: [
      { name: "Brahim Hadjadj", role: "Ali La Pointe" }
    ]
  },
  {
    title: "Fanny and Alexander",
    genre: "Drama, Family",
    year: 1982,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/5/56/Fanny%26Alexander.jpg",
    synopsis: "Two siblings in early 20th century Sweden experience family joy and tragedy after their mother remarries a stern bishop following their father's death.",
    cast: [
      { name: "Bertil Guve", role: "Alexander" },
      { name: "Pernilla Allwin", role: "Fanny" }
    ]
  },
  {
    title: "Mishima: A Life in Four Chapters",
    genre: "Drama, Biography",
    year: 1985,
    rating: 8.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/ad/Mishima.jpg",
    synopsis: "A stylized biography of Japanese author Yukio Mishima, interweaving scenes of his life with dramatizations of his novels and his final day.",
    cast: [
      { name: "Ken Ogata", role: "Yukio Mishima" }
    ]
  },
  {
    title: "I Am Cuba",
    genre: "Drama",
    year: 1964,
    rating: 8.0,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/Soy_Cuba_film_poster.png",
    synopsis: "An anthology of four stories about the Cuban people shortly before the revolution, capturing the inequality that fueled the uprising.",
    cast: [
      { name: "Sergio Corrieri", role: "Enrique" }
    ]
  },
  {
    title: "The Ascent",
    genre: "War, Drama",
    year: 1977,
    rating: 8.2,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/a4/Ascent_poster.jpg",
    synopsis: "Two Soviet partisans on a mission for food in Nazi-occupied territory are captured, and each must confront who they truly are under pressure.",
    cast: [
      { name: "Boris Plotnikov", role: "Sotnikov" }
    ]
  },
  {
    title: "Close-Up",
    genre: "Drama",
    year: 1990,
    rating: 8.2,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/b/be/%DA%A9%D9%84%D9%88%D8%B2_%D8%A2%D9%BE_%D8%A7%D9%86%DA%AF%D9%84%DB%8C%D8%B3%DB%8C_%28%D9%BE%D9%88%D8%B3%D8%AA%D8%B1%29.jpg",
    synopsis: "A docufiction retelling of the true story of a man who impersonated a famous filmmaker and conned a family into believing they would star in his next movie.",
    cast: [
      { name: "Hossain Sabzian", role: "Himself" }
    ]
  },
  {
    title: "The Lord of the Rings: The Two Towers",
    genre: "Fantasy, Adventure, Drama",
    year: 2002,
    rating: 8.9,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/a1/Lord_Rings_Two_Towers.jpg",
    synopsis: "While Frodo and Sam edge closer to Mordor, the remaining members of the Fellowship confront the threat of Saruman's growing army.",
    cast: [
      { name: "Elijah Wood", role: "Frodo Baggins" },
      { name: "Viggo Mortensen", role: "Aragorn" }
    ]
  },
  {
    title: "Memories of Murder",
    genre: "Crime, Drama, Mystery",
    year: 2003,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/0/01/Salinui-chueok-south-korean-movie-poster-md.jpg",
    synopsis: "Two detectives investigate a series of brutal murders in a small South Korean town, growing increasingly desperate as the case eludes them.",
    cast: [
      { name: "Song Kang-ho", role: "Detective Park Doo-man" }
    ]
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Animation, Action, Adventure",
    year: 2023,
    rating: 8.6,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg",
    synopsis: "Miles Morales travels across the multiverse, encountering a team of Spider-People tasked with protecting its very existence, only to clash with them over how to handle a new threat.",
    cast: [
      { name: "Shameik Moore", role: "Miles Morales" }
    ]
  },
  {
    title: "Sansho the Bailiff",
    genre: "Drama",
    year: 1954,
    rating: 8.2,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Sansho_Dayu_poster.jpg",
    synopsis: "Two aristocratic children are sold into slavery after their family is torn apart, and must find their way back to their mother years later.",
    cast: [
      { name: "Kinuyo Tanaka", role: "Tamaki" }
    ]
  },
  {
    title: "It's a Wonderful Life",
    genre: "Drama, Fantasy, Family",
    year: 1946,
    rating: 8.6,
    poster_url: "https://upload.wikimedia.org/wikipedia/commons/2/25/It%27s_a_Wonderful_Life_%281946_poster%29.jpeg",
    synopsis: "An angel is sent to save a despairing businessman by showing him what life would have been like for everyone he knows had he never been born.",
    cast: [
      { name: "James Stewart", role: "George Bailey" },
      { name: "Donna Reed", role: "Mary Hatch" }
    ]
  },
  {
    title: "Stalker",
    genre: "Sci-Fi, Drama, Mystery",
    year: 1979,
    rating: 8.1,
    poster_url: "https://upload.wikimedia.org/wikipedia/en/d/d4/Stalker_poster.jpg",
    synopsis: "A guide leads two men through a mysterious restricted area known as the Zone, said to grant the deepest wishes of anyone who reaches its heart.",
    cast: [
      { name: "Aleksandr Kaidanovsky", role: "Stalker" }
    ]
  }
];

export default SAMPLE_MOVIES;
