-- LISTS TOP 100 MOST ACTIVE ARTISTS
SELECT artists.name, count(*) FROM artist_at_festivals INNER JOIN festivals ON (artist_at_festivals.festival_id = festivals.id) INNER JOIN artists ON (artist_at_festivals.artist_id = artists.id) GROUP BY artists.name ORDER by count(*) DESC LIMIT 25;


-- LISTS FIRST 100 FESTIVALS ARTISTS ARE AT
SELECT artists.name, artist_at_festivals.id, festivals.name
FROM artist_at_festivals
INNER JOIN festivals ON (artist_at_festivals.festival_id = festivals.id)
INNER JOIN artists ON (artist_at_festivals.artist_id = artists.id)
WHERE festivals.name = 'bonnaroo'
ORDER BY artist_at_festivals.id
LIMIT 25;


-- LIST ARTIST AT BONNROO
SELECT artists.name, artist_at_festivals.id, festivals.name
FROM artist_at_festivals
INNER JOIN festivals ON (artist_at_festivals.festival_id = festivals.id)
INNER JOIN artists ON (artist_at_festivals.artist_id = artists.id)
WHERE festivals.name = 'bonnaroo'
ORDER BY artist_at_festivals.id;
-- SELECT ALL FROM BONNAROO

-- CHANCE THE RAPPER, THE KILLERS, MUSE, ARCADE FIRE, THE XX, LORDE, BLINK-182, DJ SNAKE, JUSTICE, ALT-J, RUN THE JEWELS, CAGE THE ELEPHANT, WIZ KHALIFA, BIG SEAN, THE HEAD AND THE HEART, FOSTER THE PEOPLE, THE SHINS, RYAN ADAMS, KASKADE, PORTER ROBINSON, ZEDS DEAD, LIAM GALLAGHER, RAE SREMMURD, GLASS ANIMALS, GRAMATIK, MIGOS, PHANTOGRAM, TOVE LO, SPOON, MILKY CHANCE, LIL UZI VERT, VANCE JOY, TEGAN AND SARA, GROUPLOVE, CRYSTAL CASTLES, JON BELLION, KALEO, LITTLE DRAGON, DVBBS, MAC DEMARCO, RUSS, 21 SAVAGE, BANKS, 3LAU, GEORGE EZRA, BORGORE, SYLVAN ESSO, ALISON WONDERLAND, LĪVE, LIL YACHTY, WHITNEY, CAPITAL CITIES, ROYAL BLOOD, LONDON GRAMMAR, RAG’N’BONE MAN, ANDREW MCMAHON IN THE WILDERNESS, NONAME, MAJID JORDAN, JOEY BADA$$, KAYTRANADA, CHARLI XCX, CAR SEAT HEADREST, SLANDER, GETTER, NGHTMRE, MACHINE GUN KELLY, THE PRETTY RECKLESS, WARPAINT, BAAUER, HIGHLY SUSPECT, ZARA LARSSON, SLUSHII, THE DRUMS, A-TRAK, 6LACK, CLOUD NOTHINGS, TRITONAL, SAMPHA, JAI WOLF, EPHWURD, ALVVAYS, MAGGIE ROGERS, JIDENNA, MURA MASA, NF, GRYFFIN, JOYRYDE, CRX, TEMPLES, G JONES, $UICIDEBOY$, BISHOP BRIGGS, AMINÉ, OOKAY, THE DISTRICTS, SAN FERMIN, JOSEPH, PUP, MOOSE BLOOD, THE JAPANESE HOUSE, LÉON, HIPPO CAMPUS, HONNE, CHEAT CODES, KEVIN DEVINE, PAPER DIAMOND, SKOTT, THE LEMON TWIGS, THE SHELTERS, BLOSSOMS, JACOB BANKS, BARNS COURTNEY, VANT, MIDDLE KIDS, THE HUNNA, OLIVER TREE, JAIN, GRACE MITCHELL, MONDO COZMO, SAN HOLO, BLAENAVON, MICHAEL CHRISTMAS, LO MOON, THE O’MY’S, FLINT EASTWOOD, DECLAN MCKENNA, THE FRIGHTS, SAINT JHN, DIRTY AUDIO, UNLIKE PLUTO, WHETHAN, RON GALLO, MADEINTYO, BIBI BOURELLY, ATLAS GENIUS, SOFI TUKKER, XAVIER OMÄR, YOUNG BOMBS, MISSIO, THE LONDON SOULS, COBI, A R I Z O N A, MOKSI, GIBBZ, BOOGIE, 888, WINGTIP, WAX MOTIF, PHAM, MICHAEL BLUME, SLOTHRUST, ELOHIM, COLONY HOUSE, STANAJ, THE WALTERS, ALLAN RAYMAN, DUCKWRTH, FRENSHIP, SPENCER LUDWIG, FLOR, KWEKU COLLINS, HARRIET BROWN, BRAYTON BOWMAN, GOODY GRACE, JESSE MALIN, MAX, TUCKER BEATHARD, LADY PILLS, TIM KUBART AND THE SPACE CADETS, LUCKY DIAZ AND THE FAMILY JAM BAND, Q BROTHERS, SLEEPY MAN, JOJO & THE PINECONES, LARD DOG & THE BAND OF SHY, LITTLE MISS ANN BAND, SCHOOL OF ROCK ALLSTARS
