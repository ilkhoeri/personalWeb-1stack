function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * **`capitalizeFirst`** : mengkapitalisasi huruf pertama dari string dan mengubah huruf sisanya menjadi huruf kecil.
 *
 *  Fungsi `capitalizeFirst`:
 *
 * membagi string menjadi kata-kata, kemudian mengkapitalisasi setiap kata menggunakan fungsi capitalizeString, dan menggabungkan kembali kata-kata yang telah dikapitalisasi.
 *
 * `syntax:`
 * ```js
 * const parameter = 'part-time-job-description'
 * const name = typeof parameter === 'string' ? capitalizeFirst(parameter) : parameter
 * ```
 * `result:`
 * ```js
 * Part time job description
 * ```
 */
export function capitalizeFirst(str: string): string {
  const words = str.split(" ");
  const capitalizedWords = words.map((word) => capitalizeString(word.replace(/-/g, " ")));
  return capitalizedWords.join(" ");
}

/**
 * **`capitalizeWords`** : mengkapitalisasi huruf pertama dari string dan mengubah huruf sisanya menjadi huruf kecil.
 *
 *  Fungsi `capitalizeWords`:
 *
 * membagi string menjadi kata-kata, kemudian mengkapitalisasi setiap kata menggunakan fungsi capitalizeString, dan menggabungkan kembali kata-kata yang telah dikapitalisasi.
 *
 * `syntax:`
 * ```js
 * const parameter = 'part-time-job-description'
 * const name = typeof parameter === 'string' ? capitalizeWords(parameter) : parameter
 * ```
 * `result:`
 * ```js
 * Part Time Job Description
 * ```
 */
export function capitalizeWords(str: string): string {
  const words = str.split("-");
  const capitalizedWords = words.map((word) => capitalizeString(word));
  return capitalizedWords.join(" ");
}

// #

function lowerCaseString(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1).toLowerCase();
}
/**
 * **`lowerCaseWords`** : mengkapitalisasi huruf pertama dari string dan mengubah huruf sisanya menjadi huruf kecil.
 *
 *  Fungsi `lowerCaseWords`:
 *
 * lowerCaseWords menerima satu parameter str, dan membagi string menjadi kata-kata dengan menggunakan metode split(' '). Kemudian, setiap kata diubah menjadi huruf kecil menggunakan fungsi lowerCaseString yang didefinisikan sebelumnya, dengan menggunakan metode map. Akhirnya, kata-kata yang sudah diubah menjadi huruf kecil digabungkan kembali dengan spasi menggunakan metode join(' ').
 *
 * `syntax:`
 *
 * const `name` = typeof `parameter` === 'string' ? lowerCaseWords(`parameter`.replace(/-/g, ' ')) : `parameter`
 */
export function lowerCaseWords(str: string): string {
  const words = str.split(" ");
  const lowerCaseWords = words.map((word) => lowerCaseString(word));
  return lowerCaseWords.join(" ");
}

/**
 * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
 * @param uriComponent A value representing an unencoded URI component.
 */
/**
 * `const hrefAccount =
     typeof account === 'string' ? account.replace(/ /g, '-').toLowerCase() : account;`

  const hrefAccount =
     `/${encodeURIComponent(name?.toLowerCase()?.replace(/ /g, '-') ?? '')}`;
 */

/**
 * function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
 * export function capitalizeWords(str: string) {
  const words = str.split(' ');
  const capitalizedWords = words.map((word) => capitalizeString(word));
  return capitalizedWords.join(' ');
}
*/

function removePunctuation(str: string): string {
  return str.replace(/[.,'"+[\]{}]/g, "").replace(/[^-=!?\w\s]/g, "");
}

function combineConsecutiveHyphens(str: string): string {
  return str.replace(/-+/g, "-");
}
/**
 * ```js
 * const inputString = 'Saat Pertama Kali KU DengaR! suARAmu, kURASakaN } {} adA seSUaTu yANg aNU ANu dan ANU [ExaMPle]';
 * const stringWithoutPunctuation = removePunctuation(inputString);
 * console.log(stringWithoutPunctuation);
 * // output : "saat-pertama-kali-ku-dengar!-suaramu-kurasakan-ada-sesuatu-yang-anu-anu-dan-anu-example"
 * ```
 * @param str
 * @returns `combineConsecutiveHyphens(punctuationLess)`
 */
export function lowerCasePunctuation(str: string): string {
  const words = str.split(" ");
  const lowerCase = words.map((word) => lowerCaseString(word));
  const withoutPunctuation = lowerCase.map((lower) => removePunctuation(lower));
  const punctuationLess = withoutPunctuation.join("-");
  return combineConsecutiveHyphens(punctuationLess);
}

/**
 * ```js
 * 'Sanitized <'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+= Word'
 *
 * to 'Sanitized-Word'
 * ```
 */
export function sanitizedWord(str: string): string {
  const w = str.replace(/\s/g, "-");
  const sntz = w.replace(/[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+=]/g, "");
  const final = sntz.replace(/-{2,}/g, "-");
  return sanitizedWord(final);
}
