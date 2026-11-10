# Photo prompts

Prompts for every photo the site still lacks (2026-11-10). The user generates the images with
an AI image model; then they go to the path in each row (create the folder if needed) and we
switch `image: null` to the file in `src/content/*`.

**Portfolio photos are demo material** (like `src/content/demo-portfolio.ts`): generated
pictures are not the workshop's real work, so they are replaced with real photos before
launch. Product, service and workshop photos may stay only if they do not pretend to show a
specific real order.

## How to use

- Prompts are in English: image models follow English better.
- Add the **style suffix** to the end of every prompt.
- Format: JPG, at least 1600 px on the long side (2400 px for the wide ones), aspect ratio as
  given. Name files exactly as in the path column.
- Reject images with text, logos, watermarks, distorted hardware, warped glass edges or
  extra fingers. No visible faces (people only from behind or hands).

**Style suffix:**

> photorealistic architectural interior photography, natural soft daylight, clean modern
> interior, neutral white and light grey tones with graphite accents, crisp clear glass with
> subtle cyan edge tint, realistic reflections, shot on full-frame camera 24–35mm lens, high
> detail, no text, no logos, no watermark, no visible faces

---

## 1. Homepage, About, 404, link preview

| #   | Path                                                                 | Ratio    | Prompt                                                                                                                                                                                                                                     |
| --- | -------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.1 | `public/images/home/process.jpg`                                     | 4:5      | A glass installer's hands in work gloves fitting a stainless steel hinge to a frameless tempered glass shower door in a modern bathroom, a level and suction lifter on the floor nearby, focus on the hands and the hardware               |
| 1.2 | `public/images/about/hero.jpg`                                       | 21:9     | Wide view of a clean small glass processing workshop: large glass sheets standing on an A-frame rack, a horizontal cutting table with a sheet on it, edge grinding machine in the background, bright industrial daylight from high windows |
| 1.3 | `public/images/og.jpg`                                               | 1200×630 | Frameless glass shower enclosure and a large backlit mirror in a bright modern bathroom, calm composition with empty light wall space on the left third for a future caption                                                               |
| 1.4 | `public/images/hero-glass.jpg` (optional, replaces the current hero) | 16:9     | Modern apartment interior in Almaty with a floor-to-ceiling glass partition separating the living room and a study, mountains faintly visible through the window, the glass catching soft light, darker right side for white headline text |

## 2. About page: workshop

| #   | Path                                        | Ratio | Prompt                                                                                                                                                                      |
| --- | ------------------------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1 | `public/images/about/workshop-cutting.jpg`  | 4:3   | Large sheet of clear glass on a felt-covered cutting table, a worker's hands guiding a glass cutter along a straight edge, scored line visible, workshop background blurred |
| 2.2 | `public/images/about/workshop-edge.jpg`     | 4:3   | Close-up of a glass edge grinding machine polishing the edge of a thick glass panel, water spray, glossy polished edge in the foreground                                    |
| 2.3 | `public/images/about/workshop-drilling.jpg` | 4:3   | Glass drilling machine making a round hole in a mirror panel, diamond drill bit with water cooling, a finished bevelled mirror leaning nearby                               |
| 2.4 | `public/images/about/workshop-storage.jpg`  | 4:3   | Rows of glass and mirror sheets stored vertically on steel A-frame racks in a tidy warehouse, edges with a green tint, soft daylight                                        |

## 3. Services page

| #   | Path                                          | Ratio | Prompt                                                                                                                                                       |
| --- | --------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 3.1 | `public/images/services/obrabotka-kromki.jpg` | 4:3   | Stack of glass panels with perfectly polished transparent edges, macro view of the edge profile, one panel with matte ground edge for contrast               |
| 3.2 | `public/images/services/sverlenie.jpg`        | 4:3   | Tempered glass panel with neatly drilled round holes and a rectangular cut-out for a door handle, lying on a workbench                                       |
| 3.3 | `public/images/services/zakalka.jpg`          | 4:3   | Glass panels on rollers coming out of an industrial glass tempering furnace, warm glow inside the furnace opening, factory setting                           |
| 3.4 | `public/images/services/montazh.jpg`          | 4:3   | Two installers seen from behind mounting a large frameless glass partition in a modern office, suction lifters on the glass, protective film on the floor    |
| 3.5 | `public/images/services/dostavka.jpg`         | 4:3   | Small white delivery truck with a steel A-frame rack on its side carrying large glass sheets secured with straps, city street with mountains in the distance |

## 4. Catalog products without a photo

| #   | Path                                                            | Ratio | Prompt                                                                                                                           |
| --- | --------------------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| 4.1 | `public/images/catalog/steklyannye-razdvizhnye-dveri/cover.jpg` | 1:1   | Frameless sliding glass door on a top-mounted stainless steel track between a living room and a kitchen, door half open          |
| 4.2 | `public/images/catalog/mayatnikovye-dveri/cover.jpg`            | 1:1   | Pair of frameless tempered glass pendulum (double-acting) doors on floor pivots at an office entrance, long vertical bar handles |
| 4.3 | `public/images/catalog/steklyannye-pavilony/cover.jpg`          | 1:1   | Small all-glass garden pavilion with thin black frame on a stone terrace of a private house, trees and mountains behind          |

## 5. Portfolio (demo, replace with real photos before launch)

Each project: **01 = cover (4:3)**, then 02–04 for the gallery. The featured project
("Проект месяца") needs 6 photos. Put the place of the project in the scene where it matters
(a mountain view for Almaty, a modern residential complex interior).

### 5.1 `public/images/portfolio/steklyannaya-peregovornaya-v-ofise/` (featured, 6 photos)

- 01 (4:3): Glass meeting room inside an open-plan law office: clear 12 mm frameless glass wall in slim anodised aluminium U-channels, glass door with a 30 cm bar handle, frosted band at eye level, table and chairs inside
- 02 (4:3): The same glass wall seen from inside the meeting room looking out into the bright office
- 03 (3:4): Close-up of the glass door's top pivot hinge and the aluminium channel
- 04 (3:4): Close-up of the frosted privacy band and the bar handle
- 05 (4:3): Corner joint of two glass panels, clean silicone-free butt joint
- 06 (4:3): Evening view, office lights on, reflections in the glass wall

### 5.2 `public/images/portfolio/dushevaya-na-tri-metra/`

- 01 (4:3): Very wide frameless glass shower enclosure about 3 metres long across a bathroom wall, thin chrome header bar on top, large-format light grey tiles
- 02 (3:4): Close-up of the chrome header bar fixed to the wall and to the glass
- 03 (4:3): The shower from the bathroom door, showing the whole length
- 04 (3:4): Glass-to-wall chrome hinge with water droplets

### 5.3 `public/images/portfolio/dushevaya-s-bronzovoj-furnituroj/`

- 01 (4:3): Frameless glass shower with a fixed panel and a swing door, brushed bronze hinges and handle matching bronze taps, warm beige bathroom
- 02 (3:4): Close-up of the bronze hinge and handle on clear glass
- 03 (4:3): Shower interior with bronze rain shower head, glass reflecting warm light

### 5.4 `public/images/portfolio/dushevaya-dver-iz-riflenogo-stekla/`

- 01 (4:3): Shower niche in a guest bathroom of a private house closed by a swing door of textured "rain" pattern glass, chrome hinges, white tiles
- 02 (3:4): Macro of the rain-textured glass surface with soft backlight
- 03 (4:3): The door half open, showing the niche inside

### 5.5 `public/images/portfolio/matovaya-peregorodka-v-vannoj/`

- 01 (4:3): Large bathroom with a fixed frosted glass partition separating the toilet area, glass set in a floor channel, polished edge, window light
- 02 (3:4): Close-up of the polished frosted glass edge and wall fixing
- 03 (4:3): The partition seen from the vanity side

### 5.6 `public/images/portfolio/zerkalnaya-stena-v-fitnes-klube/`

- 01 (4:3): Free weights area of a modern gym with a full-wall mirror, two wall-mounted TVs set into neat cut-outs in the mirror, rubber floor, dumbbell rack
- 02 (3:4): Close-up of a TV cut-out edge in the mirror
- 03 (4:3): Long view along the mirror wall reflecting the gym

### 5.7 `public/images/portfolio/zerkalo-s-podsvetkoj-3-metra/`

- 01 (4:3): Bathroom with a single seamless mirror about 3 m wide and 1.2 m high above a double vanity, warm LED backlight glowing around the mirror on a floating wall
- 02 (3:4): Close-up of the mirror edge with the warm backlight halo
- 03 (4:3): Evening view with only the backlight on

### 5.8 `public/images/portfolio/ograzhdenie-lestnicy-na-spigotah/`

- 01 (4:3): Interior staircase in a two-storey house with frameless 12 mm glass balustrade panels on matte black spigots, open living room around it
- 02 (3:4): Close-up of a black spigot holding the glass panel on a stair step
- 03 (4:3): View from the top of the stairs down through the glass

### 5.9 `public/images/portfolio/ograzhdenie-terrasy-iz-tripleksa/`

- 01 (4:3): Second-floor terrace of a house in the foothills with a frameless laminated glass railing, glass-to-glass clamps, snowy Tian Shan mountains in the background
- 02 (3:4): Close-up of a stainless glass-to-glass clamp joining two polished panels
- 03 (4:3): Evening view across the terrace through the glass railing toward the city lights below the mountains
- 04 (4:3): Terrace furniture with the glass railing behind it, sunny day

### 5.10 `public/images/portfolio/ograzhdenie-vtorogo-sveta/`

- 01 (4:3): Gallery on the second floor overlooking a double-height living room, glass balustrade in a floor channel clad in brushed stainless steel, low square stainless handrail
- 02 (3:4): Close-up of the brushed steel channel cladding and the glass
- 03 (4:3): View from the living room up to the gallery

### 5.11 `public/images/portfolio/razdvizhnaya-dver-iz-matovogo-stekla/`

- 01 (4:3): Loft-style sliding frosted glass door on an exposed black top track between a kitchen and a living room, door half open
- 02 (3:4): Close-up of the black rollers and track with soft-close damper
- 03 (4:3): The door closed, kitchen visible as soft silhouettes through frosted glass

### 5.12 `public/images/portfolio/vinnaya-komnata-so-steklyannymi-dveryami/`

- 01 (4:3): Wine room behind a clear 12 mm glass wall in a private house, double glass doors in the centre with long vertical bar handles, wooden wine racks with bottles inside, warm lighting
- 02 (3:4): Close-up of the long bar handles on the double doors
- 03 (4:3): View from inside the wine room toward the living room

### 5.13 `public/images/portfolio/domashnij-bar-polki-i-zerkalo/`

- 01 (4:3): Living room niche turned into a home bar: low-iron glass shelves on hidden brackets holding glasses and bottles, bevelled mirror on the back wall, warm LED strip
- 02 (3:4): Close-up of a glass shelf edge and a hidden bracket
- 03 (4:3): Wider view of the living room with the bar niche

### 5.14 `public/images/portfolio/testimonial.jpg`

- (1:1): Terrace of a house with a frameless glass railing at sunset, two cups of tea on a small table, mountains behind, no people
