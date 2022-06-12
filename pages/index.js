import Head from "next/head";
import { useState } from "react";

const Home = () => {
  const [shortCode, setShortCode] = useState(
    `[F]To say it was a different [E]walk in
[C]You could see it when she [E]walked inside[D]`
  );
  const handleChange = (e) => {
    const { value } = e.target;
    setShortCode(value);

    //const regex = /\[\w*\/*\w*\][\w\s]*/g;
    //const str = "[F/G]To say it was a different [EM]walk in";
    //const str2 = "You could see it when she [EM]walked inside[DM]";
    //const str3 = "descrizione[F/G] \na[Em] capo\n[Cm]terzalinea";

    // const regex2 = /[\w\s]*/;
    // const arr2 = str2.match(regex2);
    // console.log(arr2);

    // const regex3 = /[a-zA-Z]*[^\n]+/g;
    // const arr3 = str3.match(regex3);
    // console.log(arr3);
    // const arr4 = arr3[2].match(regex);
    // console.log(arr4);
  };
  const parse = (str) => {
    const regex1 = /[a-zA-Z]*[^\n]+/g;
    const newLineArray = str.match(regex1);
    const regex2 = /\[\w*\/*\w*\][\w\s]*/g;
    const lineArrayTransformed = [];
    for (let j = 0; j < newLineArray.length; j++) {
      const subLineArray = newLineArray[j].match(regex2);

      const subLineArrayTransformed = [];
      for (let i = 0; i < subLineArray.length; i++) {
        const regex3 = /\[[a-zA-Z]\]*/;
        const chordBraket = subLineArray[i].match(regex3);

        const lyric = subLineArray[i].replace(chordBraket[0], "");

        const regex4 = /\w+/;
        const chord = chordBraket[0].match(regex4);

        const element = { chord: chord ? chord[0] : "", lyric };
        subLineArrayTransformed.push(element);
        console.log("subLineArrayTransformed", subLineArrayTransformed);
      }
      lineArrayTransformed.push(subLineArrayTransformed);
      console.log("lineArrayTransformed", lineArrayTransformed);
    }
    return lineArrayTransformed;
  };

  const parsedArray = parse(shortCode);

  return (
    <div>
      <Head>
        <title>Myguitarsongs</title>
        <meta name="description" content="MYGUITARSONGS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div className="input">
          <textarea
            id="shortcode"
            name="shortcode"
            value={shortCode}
            onChange={(e) => handleChange(e)}
            placeholder="Type your text here"
          />
        </div>
        <div className="output">
          <div>
            {parsedArray &&
              parsedArray.map((line, index) => {
                return (
                  <div key={index} className="line">
                    {line.map((item, i) => {
                      return (
                        <div className="cnl" key={i}>
                          <div className="chord">{item.chord}</div>
                          <div className="lyric">{item.lyric}</div>
                        </div>
                      );
                    })}
                  </div>
                );
                // return <p key={index}>{line}</p>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
