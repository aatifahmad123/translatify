import { useState, useEffect } from "react";
import axios from "axios";

const names = {
  af: "Afrikaans",
  ak: "Akan",
  am: "Amharic",
  ar: "Arabic",
  as: "Assamese",
  ay: "Aymara",
  az: "Azerbaijani",
  be: "Belarusian",
  bg: "Bulgarian",
  bho: "Bhojpuri",
  bm: "Bambara",
  bn: "Bengali",
  bs: "Bosnian",
  ca: "Catalan",
  ceb: "Cebuano",
  ckb: "Central Kurdish",
  co: "Corsican",
  cs: "Czech",
  cy: "Welsh",
  da: "Danish",
  de: "German",
  doi: "Dogri",
  dv: "Divehi",
  ee: "Ewe",
  el: "Greek",
  en: "English",
  eo: "Esperanto",
  es: "Spanish",
  et: "Estonian",
  eu: "Basque",
  fa: "Persian",
  fi: "Finnish",
  fr: "French",
  fy: "Western Frisian",
  ga: "Irish",
  gd: "Scottish Gaelic",
  gl: "Galician",
  gn: "Guarani",
  gom: "Goan Konkani",
  gu: "Gujarati",
  ha: "Hausa",
  haw: "Hawaiian",
  he: "Hebrew",
  hi: "Hindi",
  hmn: "Hmong",
  hr: "Croatian",
  ht: "Haitian Creole",
  hu: "Hungarian",
  hy: "Armenian",
  id: "Indonesian",
  ig: "Igbo",
  ilo: "Iloko",
  is: "Icelandic",
  it: "Italian",
  iw: "Hebrew (old)",
  ja: "Japanese",
  jv: "Javanese",
  jw: "Javanese (old)",
  ka: "Georgian",
  kk: "Kazakh",
  km: "Khmer",
  kn: "Kannada",
  ko: "Korean",
  kri: "Krio",
  ku: "Kurdish",
  ky: "Kyrgyz",
  la: "Latin",
  lb: "Luxembourgish",
  lg: "Ganda",
  ln: "Lingala",
  lo: "Lao",
  lt: "Lithuanian",
  lus: "Mizo",
  lv: "Latvian",
  mai: "Maithili",
  mg: "Malagasy",
  mi: "Maori",
  mk: "Macedonian",
  ml: "Malayalam",
  mn: "Mongolian",
  "mni-Mtei": "Manipuri (Meitei)",
  mr: "Marathi",
  ms: "Malay",
  mt: "Maltese",
  my: "Burmese",
  ne: "Nepali",
  nl: "Dutch",
  no: "Norwegian",
  nso: "Northern Sotho",
  ny: "Chichewa",
  om: "Oromo",
  or: "Odia (Oriya)",
  pa: "Punjabi",
  pl: "Polish",
  ps: "Pashto",
  pt: "Portuguese",
  qu: "Quechua",
  ro: "Romanian",
  ru: "Russian",
  rw: "Kinyarwanda",
  sa: "Sanskrit",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  sm: "Samoan",
  sn: "Shona",
  so: "Somali",
  sq: "Albanian",
  sr: "Serbian",
  st: "Southern Sotho",
  su: "Sundanese",
  sv: "Swedish",
  sw: "Swahili",
  ta: "Tamil",
  te: "Telugu",
  tg: "Tajik",
  th: "Thai",
  ti: "Tigrinya",
  tk: "Turkmen",
  tl: "Tagalog (Filipino)",
  tr: "Turkish",
  ts: "Tsonga",
  tt: "Tatar",
  ug: "Uighur",
  uk: "Ukrainian",
  ur: "Urdu",
  uz: "Uzbek",
  vi: "Vietnamese",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zh: "Chinese",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  zu: "Zulu",
};


export default function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [historyinputs, setHistoryInputs] = useState([]);
  const [historyoutputs, setHistoryOutputs] = useState([]);

  const translate = async () => {
    if (from != to) {
      const encodedParams = new URLSearchParams();
      encodedParams.set("q", input);
      encodedParams.set("target", to);
      encodedParams.set("source", from);

      const options = {
        method: "POST",
        url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "bd0ce42617msh4da50c06d7b51fdp10dc5cjsnefe0d435a40d",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        },
        data: encodedParams,
      };

      try {
        const response = await axios.request(options);
        setOutput(response.data.data.translations[0].translatedText);
        if(input != ""){
          setHistoryInputs([...historyinputs, input]);
          setHistoryOutputs([...historyoutputs, response.data.data.translations[0].translatedText]);
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    else{
      setOutput(input);
      if(input != ""){
        setHistoryInputs([...historyinputs, input]);
        setHistoryOutputs([...historyoutputs, input]);
      }
    }
  };

  useEffect(() => {
    const fetchLanguageOptions = async () => {
      const options = {
        method: "GET",
        url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
        headers: {
          "X-RapidAPI-Key":
            "bd0ce42617msh4da50c06d7b51fdp10dc5cjsnefe0d435a40d",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        // console.log(response.data.data.languages[0]);
        const opt = [];
        opt.push(response.data.data.languages[25]);
        for (let i = 0; i < 136; i++) {
          opt.push(response.data.data.languages[i]);
          // console.log(names[response.data.data.languages[i].language]);
        }
        setOptions(opt);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLanguageOptions(); // Call the function to fetch language options
  }, []);

  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex flex-col items-center justify-around"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/indian-tricolor-theme-watercolor-texture-patriotic-background-vector_1055-11952.jpg?t=st=1714070572~exp=1714074172~hmac=622174a8cce282956ace96b2585d28105ff353601c176dc4cc7465c6d60d2467&w=740')",
        }}
      >
        <h1>TRANSLATIFY 🤗</h1>
        <div className="border-2 border-red-400 w-4/5 h-4/5 rounded-lg md:w-3/5">
          <div className="m-1 md:m-2 flex justify-center items-center">
            <select
              onChange={(e) => setFrom(e.target.value)}
              className="mx-1 px-2 py-1 rounded-sm md:mx-2 md:px-5 md:py-2 md:rounded-lg bg-white border-2 border-red-400 md:w-1/5 w-3/5"
            >
              {options.map((opt, index) => (
                <option key={index} value={opt.language}>
                  {names[opt.language]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <textarea
              style={{ resize: "none" }}
              className="w-4/5 border-2 border-red-400 m-1 md:m-2"
              onInput={(e) => setInput(e.target.value)}
              placeholder="Enter input text here..."
            ></textarea>
          </div>
          <div className="m-1 md:m-2 flex justify-center items-center">
            <select
              onChange={(e) => setTo(e.target.value)}
              className="mx-1 px-2 py-1 rounded-sm md:mx-2 md:px-5 md:py-2 md:rounded-lg bg-white border-2 border-red-400 md:w-1/5 w-3/5"
            >
              {options.map((opt, index) => (
                <option key={index} value={opt.language}>
                  {names[opt.language]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <textarea
              style={{ resize: "none" }}
              className="w-4/5 border-2 border-red-400 m-1 md:m-2"
              value={output}
              readOnly
              placeholder="The translated text displays here..."
            ></textarea>
          </div>

          <div className="flex justify-center m-1 md:m-2 items-center">
            <button
              className="mx-1 px-2 py-1 rounded-lg md:mx-2 md:px-5 md:py-2 text-white bg-red-600 text-bold"
              onClick={(e) => translate()}
            >
              Translate
            </button>
          </div>
          <div className="w-4/5 border-2 border-red-400 mx-auto md:mt-5 mt-3 h-1/3 overflow-auto flex flex-col">
            {historyinputs.map((input, index) => (
              <div key={index}>
                <div className="bg-orange-600 p-2 my-0.5 rounded-md inline-block text-white">{input}</div>
                <br></br>
                <div className="bg-green-600 p-2 my-0.5 rounded-md inline-block text-white">
                  {historyoutputs[index]}
              </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="hover:text-gray-600">
          &copy;
          <a href="https://github.com/aatifahmad123" target="_blank">
            Aatif Ahmad
          </a>
        </h2>
      </div>
    </>
  );
}
